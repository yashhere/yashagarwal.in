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
        data-cf-beacon='{"token": "e14f712dcb3f4bb7aab3a2f606159e03"}'
      />
    </>
  )
}
