import { siteConfig } from "@/config/site"
import { sortNotes } from "@/lib/server-utils";
import { allNotes } from "contentlayer/generated";
import { Feed } from "feed";





export async function getFeed() {
  const author = {
    name: siteConfig.name,
    email: siteConfig.email,
    link: siteConfig.url,
  }

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `Copyright © 2016 - ${new Date().getFullYear()} ${
      siteConfig.name
    }`,
    feedLinks: {
      atom: `${siteConfig.url}/atom.xml`,
      rss: `${siteConfig.url}/rss.xml`,
    },
    author: author,
  })

  sortNotes(allNotes).forEach((note) => {
    feed.addItem({
      id: siteConfig.url + "/notes/" + note.slug,
      title: note.title,
      link: siteConfig.url + "/notes/" + note.slug,
      description: note.description,
      author: [author],
      contributor: [author],
      date: new Date(note.createdOn),
    })
  })

  return feed
}
