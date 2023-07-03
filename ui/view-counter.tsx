"use client"

import { Suspense, useEffect } from "react"

import { incrementSlugViews } from "@/lib/db"

import { LoadingDots } from "./loading"
import { Metric } from "./metrics/metric"

// import { LoadingDots } from "./loading-dots"

export function ViewCounter({
  slug,
  allViews,
  track,
}: {
  slug: string
  allViews: {
    slug: string
    views: number
  }[]
  track?: boolean
}) {
  const viewsForSlug = allViews && allViews.find((view) => view.slug === slug)
  const views = new Number(viewsForSlug?.views || 0)

  useEffect(() => {
    if (track) {
      incrementSlugViews(slug)
    }
  }, [])

  return (
    <div className="flex space-x-1">
      <Suspense fallback={<LoadingDots />}>
        <Metric stat={views} />
      </Suspense>
    </div>
  )
}
