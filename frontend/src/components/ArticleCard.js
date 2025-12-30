import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content, maxLength = 200) => {
    if (!content) return 'No content available';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="article-card">
      <div className="article-card-header">
        <h3 className="article-title">{article.title}</h3>
        <div className="article-badges">
          {article.isOriginal ? (
            <span className="badge badge-original">Original</span>
          ) : (
            <span className="badge badge-optimized">Optimized</span>
          )}
        </div>
      </div>

      <div className="article-meta">
        <span className="meta-item">
          <span className="meta-icon">✍️</span>
          {article.author || 'Unknown'}
        </span>
        <span className="meta-item">
          <span className="meta-icon">📅</span>
          {formatDate(article.publishedDate || article.createdAt)}
        </span>
        {article.metadata?.readingTime && (
          <span className="meta-item">
            <span className="meta-icon">⏱️</span>
            {article.metadata.readingTime} min read
          </span>
        )}
      </div>

      <p className="article-excerpt">{truncateContent(article.content)}</p>

      {article.metadata && (
        <div className="article-stats">
          {article.metadata.wordCount && (
            <span className="stat-item">
              📝 {article.metadata.wordCount.toLocaleString()} words
            </span>
          )}
          {article.metadata.category && (
            <span className="stat-item badge badge-info">
              {article.metadata.category}
            </span>
          )}
        </div>
      )}

      {article.references && article.references.length > 0 && (
        <div className="article-references">
          <span className="references-label">📚 References:</span>
          <span className="references-count">{article.references.length}</span>
        </div>
      )}

      <div className="article-actions">
        <Link to={`/article/${article._id}`} className="btn btn-primary">
          Read More
        </Link>
        {article.sourceUrl && (
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View Source
          </a>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;