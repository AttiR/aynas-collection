import axios from 'axios';

// Use environment variable for API URL, with fallbacks for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL ||
                     (process.env.NODE_ENV === 'production'
                       ? 'https://brave-moss-071279d03.azurestaticapps.net/api'
                       : 'http://localhost:5136/api');

// Force localhost for development
const FINAL_API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5136/api'
  : API_BASE_URL;

console.log('🔍 API Configuration Debug:');
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('REACT_APP_API_URL type:', typeof process.env.REACT_APP_API_URL);
console.log('REACT_APP_API_URL length:', process.env.REACT_APP_API_URL?.length);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('API_BASE_URL:', API_BASE_URL);
console.log('FINAL_API_BASE_URL:', FINAL_API_BASE_URL);

const api = axios.create({
  baseURL: FINAL_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Making API request to:', (config.baseURL || '') + (config.url || ''));
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API response received:', response.config?.url || 'unknown', response.status);
    return response;
  },
  (error) => {
    console.error('❌ API request failed:', error.config?.url || 'unknown', error.message);
    console.error('Full error:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
