import { siteConfig } from "@/config/site"
import { sortPosts } from "@/lib/server-utils"
import { encodeParameter } from "@/lib/utils"
import { allPosts } from "contentlayer/generated"
import { Feed } from "feed"
import moment from "moment"

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
    image: `${siteConfig.url}/og?title=${encodeParameter(
      siteConfig.title
    )}&meta=${encodeParameter(siteConfig.description)}`,
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
    let ogImage = post.image
      ? `${post.image}`
      : `/og?title=${encodeParameter(post.title)}&meta=${encodeParameter(
          moment(post.published).format("MMMM DD, YYYY")
        )}`
    if (post.tags && post.tags?.length > 0) {
      ogImage += `&tags=${post.tags.join("|")}`
    }
    feed.addItem({
      id: siteConfig.url + "/blog/" + post.slug,
      title: post.title,
      link: siteConfig.url + "/blog/" + post.slug,
      description: post.description,
      image: ogImage,
      author: [author],
      contributor: [author],
      date: new Date(post.published),
    })
  })

  return feed
}
