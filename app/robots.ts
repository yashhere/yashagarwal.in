import { env } from "@/env.mjs"

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    host: `${env.NEXT_PUBLIC_APP_URL}`,
  }
}
