import { getFeed } from "../utils"

export const dynamic = "force-static"

export async function GET() {
  try {
    const feed = await getFeed()

    return new Response(feed.rss2(), {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    })
  } catch (error) {
    console.error("Error generating RSS feed:", error)
    return new Response("Error generating RSS feed", { status: 500 })
  }
}
