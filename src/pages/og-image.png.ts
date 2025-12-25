import { generateOGImage } from "../lib/og-image"

export const prerender = true

export async function GET() {
  const image = await generateOGImage({
    title: "/dev/yash/notes",
    description: "Personal blog and portfolio of Yash Agarwal",
  })

  return new Response(image, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
