import { db } from "@/lib/db"
import { Post, allPosts } from "contentlayer/generated"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const data = await db
      .selectFrom("stats")
      .select(["slug", "views"])
      .orderBy("views", "desc")
      .limit(3)
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

    return NextResponse.json(articles, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}
