import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/elsewhere-films/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
});
