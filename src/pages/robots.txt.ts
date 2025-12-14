import type { APIRoute } from "astro"

import { siteConfig } from "../config/site"

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${siteConfig.url}/sitemap-index.xml
`.trim()

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
