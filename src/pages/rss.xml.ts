import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { siteConfig } from "../config/site"

export const GET: APIRoute = async (context) => {
  const notes = await getCollection("notes")
  notes.sort((a, b) => b.data.createdOn.valueOf() - a.data.createdOn.valueOf())

  const items = notes.map((post) => ({
    title: post.data.title,
    pubDate: post.data.createdOn,
    description: post.data.description || "",
    link: `/notes/${post.slug}/`,
    content: post.body
      ? stripMdxImports(post.body)
      : "",
  }))

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site!,
    items,
    customData: `<language>en-us</language>`,
    xmlns: {
      content: "http://purl.org/rss/1.0/modules/content/",
    },
  })
}

function stripMdxImports(body: string): string {
  return body
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("import "))
    .join("\n")
}
