// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // because you're using a username.github.io repo
  plugins: [react()]
});
