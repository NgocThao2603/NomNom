import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
    },
  },
  server: {
    proxy: {
      '/dish': {
        target: 'https://nomnom-jo8y.onrender.com', // Địa chỉ API của bạn
        changeOrigin: true, // Chuyển đổi origin của yêu cầu đến máy chủ API
        secure: false,
      },
    },
  },
  define: {},
});
