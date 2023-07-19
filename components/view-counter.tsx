"use client"

import { useEffect } from "react"
import { Metric } from "@/components/metrics/metric"
import { incrementSlugMetrics } from "@/lib/actions"

export function ViewCounter({
  slug,
  metrics,
  track,
}: {
  slug: string
  metrics: {
    slug: string
    views: number
    likes: number
  }
  track?: boolean
}) {
  const views = new Number(metrics?.views || 0)

  useEffect(() => {
    if (track) {
      incrementSlugMetrics(slug)
    }
  }, [slug, track])

  return <Metric stat={views.toString()} type={"views"} />
}
