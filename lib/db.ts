// import 'server-only' not working with API routes yet
import { Kysely } from "kysely"
import { PlanetScaleDialect } from "kysely-planetscale"
import { DB } from "./db_types"
import { cache } from "react"
import { Post, allPosts } from "contentlayer/generated"

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
  }),
})

export const getBlogViews = cache(async () => {
  if (!process.env.DATABASE_URL) {
    return 0
  }

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

export async function incrementSlugViews(slug: string) {
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
    .onDuplicateKeyUpdate({ views: views + 1 })
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
