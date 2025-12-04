import { getFeed } from "../utils"

export const dynamic = "force-static"

export async function GET() {
  try {
    const feed = await getFeed()

    return new Response(feed.atom1(), {
      headers: {
        "Content-Type": "application/atom+xml; charset=utf-8",
      },
    })
  } catch (error) {
    console.error("Error generating Atom feed:", error)
    return new Response("Error generating Atom feed", { status: 500 })
  }
}
