

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleAPI } from '../services/Api';
import './ComparisonPage.css';

const ComparisonPage = () => {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticlePairs();
  }, []);

  const fetchArticlePairs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await articleAPI.getArticlePairs();
      setPairs(response.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch article pairs');
    } finally {
      setLoading(false);
    }
  };

  const truncateContent = (content, maxLength = 300) => {
    if (!content) return 'No content available';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
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
          <button className="btn btn-primary" onClick={fetchArticlePairs}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="comparison-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Article Comparisons</h1>
          <p className="page-subtitle">
            Compare original articles with their AI-optimized versions
          </p>
        </div>

        {pairs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔄</div>
            <h2>No Comparisons Available</h2>
            <p>No optimized articles have been generated yet.</p>
            <p className="empty-hint">
              Run the optimizer script to create optimized versions of your articles.
            </p>
          </div>
        ) : (
          <div className="pairs-container">
            {pairs.map((pair, index) => (
              <div key={pair.original._id} className="comparison-pair">
                <div className="pair-header">
                  <h2 className="pair-title">Comparison #{index + 1}</h2>
                  <span className="pair-status">
                    {pair.optimized ? (
                      <span className="status-complete">✅ Optimized</span>
                    ) : (
                      <span className="status-pending">⏳ Pending</span>
                    )}
                  </span>
                </div>

                <div className="comparison-grid">
                  {/* Original Article */}
                  <div className="comparison-card original">
                    <div className="card-header">
                      <span className="badge badge-original">Original</span>
                    </div>
                    <h3 className="comparison-title">{pair.original.title}</h3>
                    <div className="comparison-meta">
                      <span>✍️ {pair.original.author || 'Unknown'}</span>
                      {pair.original.metadata?.wordCount && (
                        <span>📝 {pair.original.metadata.wordCount} words</span>
                      )}
                      {pair.original.metadata?.readingTime && (
                        <span>⏱️ {pair.original.metadata.readingTime} min</span>
                      )}
                    </div>
                    <p className="comparison-excerpt">
                      {truncateContent(pair.original.content)}
                    </p>
                    <Link
                      to={`/article/${pair.original._id}`}
                      className="btn btn-outline"
                    >
                      Read Original
                    </Link>
                  </div>

                  {/* Optimized Article or Placeholder */}
                  {pair.optimized ? (
                    <div className="comparison-card optimized">
                      <div className="card-header">
                        <span className="badge badge-optimized">Optimized</span>
                      </div>
                      <h3 className="comparison-title">{pair.optimized.title}</h3>
                      <div className="comparison-meta">
                        <span>✍️ {pair.optimized.author || 'AI Optimized'}</span>
                        {pair.optimized.metadata?.wordCount && (
                          <span>📝 {pair.optimized.metadata.wordCount} words</span>
                        )}
                        {pair.optimized.metadata?.readingTime && (
                          <span>⏱️ {pair.optimized.metadata.readingTime} min</span>
                        )}
                      </div>
                      <p className="comparison-excerpt">
                        {truncateContent(pair.optimized.content)}
                      </p>
                      {pair.optimized.references &&
                        pair.optimized.references.length > 0 && (
                          <div className="references-badge">
                            📚 {pair.optimized.references.length} References
                          </div>
                        )}
                      <Link
                        to={`/article/${pair.optimized._id}`}
                        className="btn btn-primary"
                      >
                        Read Optimized
                      </Link>
                    </div>
                  ) : (
                    <div className="comparison-card placeholder">
                      <div className="placeholder-content">
                        <div className="placeholder-icon">🤖</div>
                        <h3>Optimization Pending</h3>
                        <p>
                          This article hasn't been optimized yet. Run the optimizer
                          script to generate an AI-enhanced version.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Improvement Stats */}
                {pair.optimized &&
                  pair.original.metadata?.wordCount &&
                  pair.optimized.metadata?.wordCount && (
                    <div className="improvement-stats">
                      <div className="stat-item">
                        <span className="stat-label">Word Count Change:</span>
                        <span
                          className={`stat-value ${
                            pair.optimized.metadata.wordCount >
                            pair.original.metadata.wordCount
                              ? 'positive'
                              : 'negative'
                          }`}
                        >
                          {pair.optimized.metadata.wordCount >
                          pair.original.metadata.wordCount
                            ? '+'
                            : ''}
                          {pair.optimized.metadata.wordCount -
                            pair.original.metadata.wordCount}{' '}
                          words
                        </span>
                      </div>
                    </div>
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;