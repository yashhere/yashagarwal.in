import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { getCollection } from "astro:content"
import { loadRenderers } from "astro:container"
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx"

import { siteConfig } from "../config/site"
import { sanitizeRSSHTML } from "../lib/rss-content"

export const GET: APIRoute = async (context) => {
  const notes = await getCollection("notes")
  notes.sort((a, b) => b.data.createdOn.valueOf() - a.data.createdOn.valueOf())

  const container = await AstroContainer.create({
    renderers: await loadRenderers([getMDXRenderer()]),
  })

  const items = await Promise.all(
    notes.map(async (post) => {
      const { Content } = await post.render()
      const rawHTML = await container.renderToString(Content)
      const html = sanitizeRSSHTML(rawHTML)

      return {
        title: post.data.title,
        pubDate: post.data.createdOn,
        description: post.data.description || "",
        link: `/notes/${post.slug}/`,
        content: html,
      }
    })
  )

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site!,
    items,
    customData: `<language>en-us</language>`,
  })
}
