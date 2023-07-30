import { PostWithMetrics } from "@/types"
import { pick } from "contentlayer/client"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { getAllMetrics } from "./actions"

export function getPosts() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.published), new Date(b.published))
  })

  if (process.env.NODE_ENV === "development") {
    return posts
  } else {
    return posts.filter((p) => {
      const currentTime = new Date()
      const publishedDate = new Date(p.published)
      return p.status === "published" && currentTime >= publishedDate
    })
  }
}

export async function getPreviewPosts() {
  const posts = getPosts()
  const allMetrics = await getAllMetrics()

  const articles: PostWithMetrics[] = []
  posts?.forEach(async (post) => {
    const metrics = allMetrics.find((item) => item.slug === post.slug)
    articles.push({
      post: pick(post, ["title", "description", "published", "slug", "tags"]),
      views: metrics?.views || 0,
      likes: metrics?.likes || 0,
    })
  })

  return articles
}

export async function getPartialPost(slug: string) {
  const allMetrics = await getAllMetrics()
  const post = getPosts().find((item) => item.slug === slug)
  if (!post) {
    return null
  }

  const metrics = allMetrics.find((item) => item.slug === slug)
  const trimmedPost: Partial<Post> = {
    title: post.title,
    published: post.published,
    slug: post.slug,
    description: post.description,
    body: {
      code: post.body.code,
      raw: "", // use empty string to reduce payload size
    },
    tags: post.tags,
    status: post.status,
    headings:
      (post.headings as { heading: number; text: string; slug: string }[]) ??
      null,
    readingTime: post.readingTime,
  }

  const article: PostWithMetrics = {
    post: trimmedPost,
    views: metrics?.views || 0,
    likes: metrics?.likes || 0,
    series:
      (post.series && getSeries(post.series?.title as string, post.slug)) ||
      undefined,
  }

  return article
}

export function getPost(slug: string) {
  const post = allPosts.find((post) => post.slug === slug)
  if (post != null) {
    return post
  } else {
    throw Error("Unable to Retrieve Post")
  }
}

export function getSeries(title: string, current: string) {
  return {
    seriesTitle: title,
    posts: allPosts
      .filter((p) => p.series?.title === title)
      .sort(
        (a, b) =>
          Number(new Date(a.series!.order)) - Number(new Date(b.series!.order))
      )
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug,
          status: p.status,
          isCurrent: p.slug === current,
        }
      }),
  }
}
