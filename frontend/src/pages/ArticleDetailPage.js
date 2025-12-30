
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { articleAPI } from '../services/Api';
import './ArticleDetailPage.css';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await articleAPI.getArticleById(id);
      setArticle(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch article');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-container">
          <p>⚠️ {error}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container">
        <div className="error-container">
          <p>Article not found</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <div className="container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <article className="article-detail">
          <header className="article-header">
            <div className="article-type-badge">
              {article.isOriginal ? (
                <span className="badge badge-original">Original Article</span>
              ) : (
                <span className="badge badge-optimized">Optimized Article</span>
              )}
            </div>

            <h1 className="article-detail-title">{article.title}</h1>

            <div className="article-detail-meta">
              <span className="meta-item">
                <span className="meta-icon">✍️</span>
                <strong>Author:</strong> {article.author || 'Unknown'}
              </span>
              <span className="meta-item">
                <span className="meta-icon">📅</span>
                <strong>Published:</strong>{' '}
                {formatDate(article.publishedDate || article.createdAt)}
              </span>
              {article.metadata?.readingTime && (
                <span className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  <strong>Reading Time:</strong> {article.metadata.readingTime} min
                </span>
              )}
            </div>

            {article.metadata && (
              <div className="article-stats-detail">
                {article.metadata.wordCount && (
                  <div className="stat-box">
                    <div className="stat-value">
                      {article.metadata.wordCount.toLocaleString()}
                    </div>
                    <div className="stat-label">Words</div>
                  </div>
                )}
                {article.metadata.category && (
                  <div className="stat-box">
                    <div className="stat-value">{article.metadata.category}</div>
                    <div className="stat-label">Category</div>
                  </div>
                )}
                {article.references && article.references.length > 0 && (
                  <div className="stat-box">
                    <div className="stat-value">{article.references.length}</div>
                    <div className="stat-label">References</div>
                  </div>
                )}
              </div>
            )}
          </header>

          <div className="article-content">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* References Section */}
          {article.references && article.references.length > 0 && (
            <div className="article-references-section">
              <h2 className="references-title">📚 References</h2>
              <ul className="references-list">
                {article.references.map((ref, index) => (
                  <li key={index} className="reference-item">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="reference-link"
                    >
                      {ref.title || ref.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Articles */}
          <div className="related-section">
            {article.optimizedVersion && (
              <div className="related-card">
                <h3>🚀 Optimized Version Available</h3>
                <Link
                  to={`/article/${article.optimizedVersion._id || article.optimizedVersion}`}
                  className="btn btn-secondary"
                >
                  View Optimized Version
                </Link>
              </div>
            )}

            {article.originalArticle && (
              <div className="related-card">
                <h3>📄 Original Version</h3>
                <Link
                  to={`/article/${article.originalArticle._id || article.originalArticle}`}
                  className="btn btn-outline"
                >
                  View Original Version
                </Link>
              </div>
            )}
          </div>

          {/* Source Link */}
          {article.sourceUrl && (
            <div className="source-section">
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Original Source →
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
