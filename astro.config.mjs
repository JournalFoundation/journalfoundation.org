import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://journalfoundation.org',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});