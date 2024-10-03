import lit from '@astrojs/lit';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';
import {defineConfig} from 'astro/config';
import {readFileSync} from 'fs';

// https://astro.build/config
export default defineConfig({
  site: 'https://asandei.com',
  integrations: [
    sitemap(),
    AstroPWA(),
    lit(),
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: JSON.parse(
          readFileSync('./public/themes/catppuccin-macho.json', 'utf-8')),
      langs: [],
      wrap: true
    }
  }
});

// good themes: "rose-pine-moon", "material-palenight", "poimandres"