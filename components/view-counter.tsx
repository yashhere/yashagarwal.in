"use client"

import { Metric } from "@/components/metrics/metric"
import { incrementSlugMetrics } from "@/lib/actions"
import { useEffect } from "react"

export function ViewCounter({
  slug,
  allMetrics,
  track,
}: {
  slug: string
  allMetrics: {
    slug: string
    views: number
    likes: number
  }[]
  track?: boolean
}) {
  const metrics = allMetrics && allMetrics.find((view) => view.slug === slug)
  const views = new Number(metrics?.views || 0)

  useEffect(() => {
    if (track) {
      incrementSlugMetrics(slug)
    }
  }, [])

  return <Metric stat={views.toString()} type={"views"} />
}
