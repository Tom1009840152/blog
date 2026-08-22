import { defineConfig } from 'astro/config';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: 'https://tom1009840152.github.io',
  base: isGitHubPages ? '/blog' : '/',
  output: 'static',
  build: {
    format: 'directory'
  }
});
