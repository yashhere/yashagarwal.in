"use server"

import { PostWithMetrics } from "@/types"
import { allPosts } from "contentlayer/generated"
import { cache } from "react"
import { queryBuilder } from "./planetscale"

export const getAllMetrics = cache(async () => {
  return queryBuilder
    .selectFrom("Stats")
    .select(["slug", "views", "likes"])
    .execute()
})

export const getTotalViews = cache(async () => {
  const { sum } = queryBuilder.fn
  return queryBuilder
    .selectFrom("Stats")
    .select(sum("views").as("total_views"))
    .executeTakeFirstOrThrow()
})

export async function getLikes(slug: string, sessionId: string) {
  const [post, user] = await Promise.all([
    queryBuilder
      .selectFrom("Stats")
      .where("slug", "=", slug)
      .select(["slug", "likes"])
      .executeTakeFirst(),

    queryBuilder
      .selectFrom("Session")
      .where("id", "=", sessionId)
      .select(["id", "likes"])
      .executeTakeFirst(),
  ])

  return [post?.likes || 0, user?.likes || 0]
}

export async function incrementLikes(
  slug: string,
  sessionId: string,
  currentLikes: number,
) {
  return await Promise.all([
    incrementSlugMetrics(slug, 0, currentLikes),
    queryBuilder
      .selectFrom("Session")
      .where("id", "=", sessionId)
      .select(["id", "likes"])
      .executeTakeFirst()
      .then((data) => {
        const currentUserLikes = !data ? 0 : Number(data.likes)
        return queryBuilder
          .insertInto("Session")
          .values({
            id: sessionId,
            likes: currentLikes,
          })
          .onDuplicateKeyUpdate({ likes: currentUserLikes + currentLikes })
          .execute()
      }),
  ])
}

export async function incrementSlugMetrics(
  slug: string,
  currentViews: number = 1,
  currentLikes: number = 0,
) {
  const data = await queryBuilder
    .selectFrom("Stats")
    .where("slug", "=", slug)
    .select(["views", "likes"])
    .executeTakeFirst()

  const views = !data ? 1 : Number(data.views)
  const likes = !data ? 0 : Number(data.likes)

  return queryBuilder
    .insertInto("Stats")
    .values({
      slug,
      views: views,
      likes: likes,
    })
    .onDuplicateKeyUpdate({
      views: views + currentViews,
      likes: likes + currentLikes,
    })
    .execute()
}

export async function getTopPosts(n: number) {
  const data = await queryBuilder
    .selectFrom("Stats")
    .select(["slug", "views", "likes"])
    .orderBy("views", "desc")
    .limit(n)
    .execute()

  const articles: PostWithMetrics[] = []

  data?.forEach(async (item) => {
    const post = allPosts
      .filter((p) => p.status != "draft")
      .find((p) => p.slug === item.slug)
    if (post != null) {
      articles.push({ post: post, views: item.views, likes: item.likes })
    }
  })

  return articles
}
