// vite.config.js
import { defineConfig } from 'vite';
import ghPages from 'vite-plugin-gh-pages';

export default defineConfig({
  base: '/your-repo-name/', // important: match GitHub repo name
  plugins: [ghPages()],
});
