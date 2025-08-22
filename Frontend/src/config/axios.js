import axios from 'axios';
import { baseURL } from './constant.js';

const apiClient = axios.create({ baseURL });

// Agregar token a todas las peticiones
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
