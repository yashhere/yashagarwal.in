// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';

import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://yashagarwal.in',
  integrations: [alpinejs(), react(), mdx(), sitemap()],
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
});
