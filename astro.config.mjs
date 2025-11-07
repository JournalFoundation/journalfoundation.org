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
  redirects: {
    '/mozfest': 'https://calendly.com/john-benac/30min'
  },
  vite: {
    build: {
      cssCodeSplit: false
    },
    optimizeDeps: {
      include: ['force-graph']
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});