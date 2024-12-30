import axios from 'axios';
import { refreshAccessToken } from './index';

// Cấu hình axios interceptor
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Thêm token vào header nếu có
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 403) {
      const response = await refreshAccessToken();
      console.log('Response from refreshAccessToken:', response);

      if (response?.data?.accessToken) {
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      }
    }
    return Promise.reject(error);
  }
);
