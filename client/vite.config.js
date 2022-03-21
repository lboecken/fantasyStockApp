import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@Common': path.resolve(__dirname, '/src/modules/common'),
      '@Home': path.resolve(__dirname, '/src/modules/home'),
      '@Theming': path.resolve(__dirname, '/src/theming'),
      '@Images': path.resolve(__dirname, '/src/img'),
    },
  },
});
