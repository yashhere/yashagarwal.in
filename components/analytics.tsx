"use client"

import { siteConfig } from "@/config/site"
import Script from "next/script"

export function Analytics() {
  const siteUrl = siteConfig.url
  if (
    process.env.NODE_ENV !== "production" ||
    !siteConfig.url.startsWith(siteUrl)
  ) {
    return null
  }

  return (
    <>
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "e14f712dcb3f4bb7aab3a2f606159e03"}'
      />
      <Script
        data-goatcounter="https://yashhere.goatcounter.com/count"
        async
        src="//gc.zgo.at/count.js"
      />
    </>
  )
}
