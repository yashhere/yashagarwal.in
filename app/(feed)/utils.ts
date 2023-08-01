import { siteConfig } from "@/config/site"
import { sortPosts } from "@/lib/server-utils"
import { allPosts } from "contentlayer/generated"
import { Feed } from "feed"

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

  sortPosts(allPosts).forEach((post) => {
    feed.addItem({
      id: siteConfig.url + "/blog/" + post.slug,
      title: post.title,
      link: siteConfig.url + "/blog/" + post.slug,
      description: post.description,
      author: [author],
      contributor: [author],
      date: new Date(post.published),
    })
  })

  return feed
}
