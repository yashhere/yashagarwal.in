import { getFeed } from "../utils"

export async function GET() {
  const feed = await getFeed()
  return new Response(feed.json1(), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  })
}
