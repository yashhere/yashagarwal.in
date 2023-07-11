import { siteConfig } from "@/config/site"

export default function robots() {
  const siteUrl: string = siteConfig.url
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
