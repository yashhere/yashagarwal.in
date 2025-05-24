import { siteConfig } from "@/config/site"
import { allNotes } from "content-collections"

export default async function sitemap() {
  const siteUrl: string = siteConfig.url

  // Generate URLs for all notes with proper metadata
  const noteUrls = allNotes.map((note) => ({
    url: `${siteUrl}/notes/${note.slug}`,
    lastModified: new Date(note.createdOn).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Extract unique tags and categories from all notes
  const allTags = [...new Set(allNotes.flatMap((note) => note.tags || []))]
  const allCategories = [...new Set(allNotes.flatMap((note) => note.category))]

  // Generate URLs for tag pages
  const tagUrls = allTags.map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Generate URLs for category pages
  const categoryUrls = allCategories.map((category) => ({
    url: `${siteUrl}/categories/${category}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Main site routes with appropriate priorities and change frequencies
  const routeUrls = [
    {
      url: siteUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${siteUrl}/colophon`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${siteUrl}/notes`,
      lastModified:
        allNotes.length > 0
          ? new Date(
              Math.max(
                ...allNotes.map((note) => new Date(note.createdOn).getTime())
              )
            ).toISOString()
          : new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tags`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/categories`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]

  return [...routeUrls, ...noteUrls, ...tagUrls, ...categoryUrls]
}
