"use client"

import Script from "next/script"

export function Analytics() {
  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon='{"token": "e14f712dcb3f4bb7aab3a2f606159e03"}'
    />
  )
}
