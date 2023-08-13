import { siteConfig } from "@/config/site"
import { allNotes } from "contentlayer/generated"

export default async function sitemap() {
  const siteUrl: string = siteConfig.url
  const noteUrls = allNotes.map((note) => ({
    url: `${siteUrl}/notes/${note.slug}`,
    lastModified: note.createdOn,
  }))

  const routeUrls = ["", "/about", "/stats", "/notes"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routeUrls, ...noteUrls]
}
