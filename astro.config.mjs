// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';
import mdx from '@astrojs/mdx';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeCodeBlocks, { parseCodeTitle } from './src/lib/rehype-code-blocks.mjs';

// Shiki replaces the whole <pre> during highlighting, dropping the fence
// meta string. This transformer forwards a parsed title="..." from the
// fence meta onto the <pre> as data-title, where rehypeCodeBlocks picks it up.
const codeBlockTitleTransformer = {
  name: 'code-block-title',
  pre(node) {
    const title = parseCodeTitle(this.options?.meta?.__raw);
    if (title) node.properties.dataTitle = title;
  }
};

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    shikiConfig: {
      // dual themes: tokens emit CSS vars, switched in global.css
      themes: {
        light: 'github-light',
        dark: 'houston'
      },
      transformers: [codeBlockTitleTransformer]
    },
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeCodeBlocks]
  },

  integrations: [svelte(), mdx()]
});
