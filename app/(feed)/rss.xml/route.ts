import { getFeed } from "../utils"

export async function GET() {
  const feed = await getFeed()
  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "text/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  })
}
