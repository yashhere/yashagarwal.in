import { db } from "@/lib/db";
import { allPosts } from "contentlayer/generated";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await db
      .selectFrom("stats")
      .select(["slug", "views"])
      .orderBy("views", "desc")
      .executeTakeFirstOrThrow();

    const post = allPosts
      .filter((p) => p.status != "draft")
      .find((p) => p.slug === data.slug);

    return NextResponse.json(post, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
