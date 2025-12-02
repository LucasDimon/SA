import axios from 'axios';
import { getToken, logout } from '../utils/auth';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001', timeout: 10000 });

api.interceptors.request.use(cfg => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(r => r, err => {
  if (err.response && err.response.status === 401) logout();
  return Promise.reject(err);
});

export default api;
