import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ComparisonPage from './pages/ComparisonPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              <span className="logo-icon">🚀</span>
              Content Optimizer AI
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/comparison" className="nav-link">
                  Comparisons
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticleDetailPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
        </Routes>

        <footer className="footer">
          <div className="footer-container">
            <p>&copy; 2024 Content Optimizer AI. All rights reserved.</p>
            <p className="footer-tech">Built with React + Express + MongoDB</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;