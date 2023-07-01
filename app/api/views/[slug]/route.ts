import { db } from "@/lib/db"
import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const path = req.nextUrl.pathname
  const slug = path.replace("/api/views/", "")

  if (!slug) {
    return NextResponse.json({ message: "Slug is required." }, { status: 500 })
  }

  try {
    const data = await db
      .selectFrom("Stats")
      .where("slug", "=", slug)
      .select(["views", "likes"])
      .executeTakeFirst()

    const views = !data ? 0 : Number(data.views)
    const likes = !data ? 0 : Number(data.likes)

    const result = await db
      .insertInto("Stats")
      .values({
        slug,
        views: views,
        likes: likes,
      })
      .onDuplicateKeyUpdate({ views: views + 1 })
      .execute()

    return NextResponse.json(result, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ message: e }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname
  const slug = path.replace("/api/views/", "")

  try {
    const data = await db
      .selectFrom("Stats")
      .select(["views"])
      .where("slug", "=", slug)
      .executeTakeFirstOrThrow()
    return NextResponse.json(data, { status: 200 })
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e }, { status: 500 })
  }
}
