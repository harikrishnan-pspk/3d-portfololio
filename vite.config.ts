import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dynamically determine base path:
// - GitHub Pages (GitHub Actions): repository subpath (e.g. '/3d-portfololio/')
// - Vercel / Local / Custom domain: root '/'
const isGitHubPages =
  process.env.GITHUB_ACTIONS === 'true' ||
  process.env.DEPLOY_TARGET === 'gh-pages';

const repoName = process.env.GITHUB_REPOSITORY
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
  : '/3d-portfololio/';

export default defineConfig({
  plugins: [react()],
  base: isGitHubPages ? repoName : '/',
  server: {
    port: 3000,
    open: true
  }
});
