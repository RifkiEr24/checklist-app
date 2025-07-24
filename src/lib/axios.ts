import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';


const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://94.74.86.174:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});



apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {

    if (error.response?.status === 401) {
      console.error('Unauthorized! Token may be expired or invalid. Logging out.');

      localStorage.removeItem('accessToken');

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
