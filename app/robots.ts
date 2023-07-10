import { env } from "@/env.mjs"

export default function robots() {
  const siteUrl: string = env.NEXT_PUBLIC_APP_URL
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
