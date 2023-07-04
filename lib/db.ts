import { allPosts, Post } from "contentlayer/generated"
import { Kysely } from "kysely"
import { PlanetScaleDialect } from "kysely-planetscale"
import { cache } from "react"
import { DB } from "./db_types"

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    host: process.env.DB_HOSTNAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  }),
})

export const getBlogViews = cache(async () => {
  const data = await db.selectFrom("Stats").select(["views"]).execute()

  return data.reduce((acc, curr) => acc + Number(curr.views), 0)
})

export const getAllViewsCount = cache(async () => {
  return db.selectFrom("Stats").select(["slug", "views"]).execute()
})

export const getAllLikesCount = cache(async () => {
  return db.selectFrom("Stats").select(["slug", "likes"]).execute()
})

export const getTotalViews = cache(async () => {
  const { sum } = db.fn
  return db
    .selectFrom("Stats")
    .select(sum("views").as("total_views"))
    .executeTakeFirstOrThrow()
})

export async function getLikes(slug: string, sessionId: string) {
  const [post, user] = await Promise.all([
    db
      .selectFrom("Stats")
      .where("slug", "=", slug)
      .select(["slug", "likes"])
      .executeTakeFirst(),

    db
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
    db
      .selectFrom("Session")
      .where("id", "=", sessionId)
      .select(["id", "likes"])
      .executeTakeFirst()
      .then((data) => {
        const currentUserLikes = !data ? 0 : Number(data.likes)
        return db
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
  const data = await db
    .selectFrom("Stats")
    .where("slug", "=", slug)
    .select(["views", "likes"])
    .executeTakeFirst()

  const views = !data ? 1 : Number(data.views)
  const likes = !data ? 0 : Number(data.likes)

  return db
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
  const data = await db
    .selectFrom("Stats")
    .select(["slug", "views"])
    .orderBy("views", "desc")
    .limit(n)
    .execute()

  const articles: Partial<Post>[] = []

  data?.forEach(async (item) => {
    const post = allPosts
      .filter((p) => p.status != "draft")
      .find((p) => p.slug === item.slug)
    if (post != null) {
      articles.push(post)
    }
  })

  return articles
}
