;

// @ts-check
import alpinejs from '@astrojs/alpinejs';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeKatex from 'rehype-katex';
import rehypeMermaid from 'rehype-mermaid';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkWikiLink from 'remark-wiki-link';





;























;





















// https://astro.build/config
export default defineConfig({
  site: "https://yashagarwal.in",
  integrations: [
    alpinejs(),
    react(),
    mdx({
      syntaxHighlight: false,
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        [
          remarkWikiLink,
          {
            hrefTemplate: (/** @type {string} */ permalink) =>
              `/notes/${permalink}`,
          },
        ],
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
        rehypeKatex,
        [
          rehypePrettyCode,
          {
            theme: {
              dark: "github-dark-dimmed",
              light: "github-light",
            },
            defaultLang: {
              block: "plaintext",
              inline: "plaintext",
            },
            onVisitLine(node) {
              if (node.children.length === 0) {
                node.children = [{ type: "text", value: " " }]
              }
              node.properties.className = [""]
            },
            onVisitHighlightedLine(node) {
              if (!node.properties.className) {
                node.properties.className = []
              }
              node.properties.className.push("line--highlighted")
            },
            onVisitHighlightedChars(node) {
              if (!node.properties.className) {
                node.properties.className = []
              }
              node.properties.className.push("word--highlighted")
            },
          },
        ],
        // rehypeMermaid
      ],
    }),
    sitemap(),
  ],
  adapter: cloudflare({
    imageService: "compile",
    platformProxy: {
      enabled: false,
    },
  }),
  vite: {
    plugins: [tailwindcss()],
  },
})
