import { siteConfig } from "@/config/site"
import { allPosts } from "contentlayer/generated"

export default async function sitemap() {
  const siteUrl: string = siteConfig.url
  const postUrls = allPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.published,
  }))

  const routeUrls = ["", "/about", "/stats", "/blog"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routeUrls, ...postUrls]
}
