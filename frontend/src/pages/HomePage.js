import React, { useState, useEffect } from 'react';
import { articleAPI } from '../services/Api';
import ArticleCard from '../components/ArticleCard';
import './HomePage.css';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, original, optimized
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, [filter, currentPage]);

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        limit: 9,
      };

      if (filter === 'original') {
        params.isOriginal = true;
      } else if (filter === 'optimized') {
        params.isOriginal = false;
      }

      const response = await articleAPI.getAllArticles(params);
      setArticles(response.data);
      setTotalPages(response.pages || 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Content Optimizer AI</h1>
          <p className="page-subtitle">
            Transform your content with AI-powered optimization
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Articles
          </button>
          <button
            className={`filter-btn ${filter === 'original' ? 'active' : ''}`}
            onClick={() => handleFilterChange('original')}
          >
            Original Only
          </button>
          <button
            className={`filter-btn ${filter === 'optimized' ? 'active' : ''}`}
            onClick={() => handleFilterChange('optimized')}
          >
            Optimized Only
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <p>⚠️ {error}</p>
            <button className="btn btn-primary" onClick={fetchArticles}>
              Try Again
            </button>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <>
            {articles.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h2>No Articles Found</h2>
                <p>There are no articles to display yet.</p>
                <p className="empty-hint">
                  Run the scraper to fetch articles from BeyondChats.
                </p>
              </div>
            ) : (
              <>
                <div className="articles-grid">
                  {articles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      « Previous
                    </button>
                    <span className="pagination-info">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next »
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;