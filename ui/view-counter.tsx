"use client"

import { incrementSlugMetrics } from "@/lib/actions"
import { Suspense, useEffect } from "react"
import { LoadingDots } from "./loading"
import { Metric } from "./metrics/metric"

// import { LoadingDots } from "./loading-dots"

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
