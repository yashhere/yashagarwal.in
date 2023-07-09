import { siteConfig } from "@/config/site"
import { createOgImage } from "@/lib/createOgImage"
import { sortPosts } from "@/lib/server-utils"
import { allPosts } from "contentlayer/generated"
import { Feed } from "feed"
import moment from "moment"

export async function GET() {
  const author = {
    name: siteConfig.name,
    email: siteConfig.email,
    link: siteConfig.url,
  }

  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    // image: siteConfig.logoUrl,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `Copyright © 2016 - ${new Date().getFullYear()} ${
      siteConfig.name
    }`,
    feedLinks: {
      rss2: `${siteConfig.url}/feed.xml`,
      json: `${siteConfig.url}/feed.json`,
      atom: `${siteConfig.url}/atom.xml`,
    },
    author: author,
  })

  sortPosts(allPosts).forEach((post) => {
    const ogImage = createOgImage({
      title: post.title,
      meta: [
        siteConfig.url,
        moment(post.published).format("MMM DD, YYYY"),
      ].join(" · "),
    })
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

  return new Response(feed.atom1(), {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  })
}
