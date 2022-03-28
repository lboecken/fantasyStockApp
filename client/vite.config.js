import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Common': path.resolve(__dirname, '/src/modules/common'),
      '@Public': path.resolve(__dirname, '/src/modules/public'),
      '@Private': path.resolve(__dirname, '/src/modules/private'),
      '@Home': path.resolve(__dirname, '/src/modules/public/home'),
      '@GlobalStyles': path.resolve(__dirname, '/src/modules/globalStyles'),
      '@Images': path.resolve(__dirname, '/src/modules/img'),
      '@Dashboard': path.resolve(__dirname, '/src/modules/dashboard'),
      '@Hooks': path.resolve(__dirname, '/src/modules/hooks'),
    },
  },
});
