import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config/site';

import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const notes = await getCollection('notes');
  // Sort posts by date
  notes.sort((a, b) => b.data.createdOn.valueOf() - a.data.createdOn.valueOf());

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site!,
    items: notes.map((post) => ({
      title: post.data.title,
      pubDate: post.data.createdOn,
      description: post.data.description,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/notes/[slug]` routes
      link: `/notes/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
