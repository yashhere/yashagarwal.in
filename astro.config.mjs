// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';

import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkWikiLink from 'remark-wiki-link';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://yashagarwal.in',
  integrations: [
    alpinejs(),
    react(),
    mdx({
        remarkPlugins: [
          remarkGfm,
          remarkMath,
          [remarkWikiLink, { hrefTemplate: (permalink) => `/notes/${permalink}` }]
        ],
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
            rehypeKatex,
            // rehypeMermaid
        ]
    }),
    sitemap()
  ],
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
        enabled: false,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
