import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Common': path.resolve(__dirname, '/src/modules/common'),
      '@Trading': path.resolve(__dirname, '/src/modules/trading'),
      '@Home': path.resolve(__dirname, '/src/modules/home'),
      '@GlobalStyles': path.resolve(__dirname, '/src/modules/globalStyles'),
      '@Images': path.resolve(__dirname, '/src/modules/img'),
      '@Dashboard': path.resolve(__dirname, '/src/modules/dashboard'),
      '@Hooks': path.resolve(__dirname, '/src/modules/hooks'),
    },
  },
  server: {
    port: 5004,
    proxy: {
      '/api/': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: false,
  },
  envDir: '..',
});
