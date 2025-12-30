import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Articles API
export const articleAPI = {
  // Get all articles
  getAllArticles: async (params = {}) => {
    try {
      const response = await api.get('/articles', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single article by ID
  getArticleById: async (id) => {
    try {
      const response = await api.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new article
  createArticle: async (articleData) => {
    try {
      const response = await api.post('/articles', articleData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update article
  updateArticle: async (id, articleData) => {
    try {
      const response = await api.put(`/articles/${id}`, articleData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete article
  deleteArticle: async (id) => {
    try {
      const response = await api.delete(`/articles/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get article pairs (original + optimized)
  getArticlePairs: async () => {
    try {
      const response = await api.get('/articles/pairs');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;