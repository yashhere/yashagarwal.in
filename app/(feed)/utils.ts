import { allNotes } from "content-collections"
import { Feed } from "feed"

import { siteConfig } from "@/config/site"
import { sortNotes } from "@/lib/server-utils"

export async function getFeed() {
  const author = {
    name: siteConfig.name,
    email: siteConfig.email,
    link: siteConfig.url,
  }

  const baseUrl = siteConfig.url.replace(/\/$/, "") // Remove trailing slash
  const latestNote = sortNotes(allNotes)[0]

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: baseUrl,
    link: baseUrl,
    language: "en",
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `Copyright © 2016 - ${new Date().getFullYear()} ${siteConfig.name}`,
    updated: latestNote ? new Date(latestNote.createdOn) : new Date(),
    generator: "Next.js Feed Library",
    feedLinks: {
      atom: `${baseUrl}/atom.xml`,
      rss: `${baseUrl}/rss.xml`,
    },
    author: author,
  })

  sortNotes(allNotes).forEach((note) => {
    if (!note.slug || !note.title || !note.createdOn) {
      console.warn(`Skipping invalid note: ${note.slug || "unknown"}`)
      return
    }

    const noteUrl = `${baseUrl}/notes/${note.slug}`

    const itemData: any = {
      id: noteUrl,
      title: note.title,
      link: noteUrl,
      description: note.description || note.title,
      content: note.content || note.description || "",
      author: [author],
      contributor: [author],
      date: new Date(note.createdOn),
    }

    if (note.category) {
      itemData.category = [{ name: note.category }]
    }

    if (note.image) {
      itemData.image = `${baseUrl}${note.image}`
    }

    feed.addItem(itemData)
  })

  return feed
}
