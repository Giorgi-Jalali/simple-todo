// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs(),
  ],
  optimizeDeps: {
    include: ['redux-thunk']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/]
    }
  }
});
