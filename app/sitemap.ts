import { env } from "@/env.mjs"
import { allPosts } from "contentlayer/generated"

export default async function sitemap() {
  const siteUrl: string = `${env.NEXT_PUBLIC_APP_URL}`
  const postUrls = allPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.published,
  }))

  const routeUrls = ["", "/about", "/stats", "/blog"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))
  return [...routeUrls, ...postUrls]
}
