"use client"

import Script from "next/script"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { Lit } from "litlyx-js"

import { siteConfig } from "@/config/site"

export function Analytics() {
  const siteUrl = siteConfig.url
  if (
    process.env.NODE_ENV !== "production" ||
    !siteUrl.startsWith("https://yashagarwal.in")
  ) {
    return null
  }

  Lit.init("68146204322ceedd6819fede")

  return (
    <>
      <VercelAnalytics />
      <Script
        async
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "e14f712dcb3f4bb7aab3a2f606159e03"}'
      />
      <Script
        async
        defer
        data-website-id="f66afc4e-6226-4ce0-ae83-0bd13afa4d8f"
        src="/stats/script.js"
      />
    </>
  )
}
