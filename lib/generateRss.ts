import { writeFileSync } from "fs"
import { siteConfig } from "@/config/site"
import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { Feed } from "feed"
import moment from "moment"
import { createOgImage } from "./createOgImage"

const allPostsNewToOld =
  allPosts?.sort((a, b) => {
    return compareDesc(new Date(a.published), new Date(b.published))
  }) || []

export default async function generateRSS() {
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

  allPostsNewToOld.forEach((post) => {
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

  writeFileSync("./public/feed.xml", feed.rss2())
  writeFileSync("./public/atom.xml", feed.atom1())
  writeFileSync("./public/feed.json", feed.json1())
}
