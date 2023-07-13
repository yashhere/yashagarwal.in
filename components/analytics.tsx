"use client"

import Script from "next/script"
import { siteConfig } from "@/config/site"

export function Analytics() {
  const siteUrl = siteConfig.url
  if (
    process.env.NODE_ENV !== "production" ||
    !siteUrl.startsWith("https://yashagarwal.in")
  ) {
    return null
  }

  return (
    <>
      <Script
        async
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "2a7ef969c27242e684ce70372f081ad8"}'
      />
      <Script
        async
        defer
        data-website-id="528ca5db-941c-4b23-982f-da0696d768d0"
        src="https://umami.yashagarwal.in/umami.js"
      />
    </>
  )
}
