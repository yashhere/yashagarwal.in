import { getCachedFeed } from "../utils"

export async function GET() {
  try {
    const feed = await getCachedFeed()

    return new Response(feed.atom1(), {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
        "Cache-Control": "public, max-age=900, stale-while-revalidate=3600", // 15min cache
        ETag: `"${Date.now()}"`,
      },
    })
  } catch (error) {
    console.error("Error generating Atom feed:", error)
    return new Response("Error generating Atom feed", { status: 500 })
  }
}
