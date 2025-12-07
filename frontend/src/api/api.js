import axios from 'axios';
import { getToken, logout } from '../utils/auth';

// Agora usa SOMENTE variável de ambiente
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

// Intercepta requisições e adiciona o token JWT
api.interceptors.request.use(cfg => {
  const token = getToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Se o token for inválido (401), faz logout automático
api.interceptors.response.use(
  r => r,
  err => {
    if (err.response && err.response.status === 401) logout();
    return Promise.reject(err);
  }
);

export default api;
