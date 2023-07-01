"use client"
import { Suspense, useEffect } from "react"

import { Stats } from "@/lib/db"
import { fetcher } from "@/lib/fetcher"
import { LoadingDots } from "./loading"
import { Metric } from "./metrics/metric"
import useSWR from "swr"
import { usePostViews } from "@/lib/useViews"

export function Metrics({ slug, track }: { slug?: string; track: boolean }) {
  const interval = 5000
  const {
    views,
    isLoading: viewsIsLoading,
    isError: viewsIsError,
    increment: incrementViews,
  } = usePostViews(slug as string, {
    // Avoid fetching view count we *know* is stale since increment() mutation
    // returns view count
    revalidateOnMount: false,
    // Only poll when in view
    refreshInterval: false ? interval : 0,
    // Override `usePostViews` default dedupingInterval for the polling usecase
    // (refresh interval can never be faster than deduping interval)
    dedupingInterval: interval,
  })

  useEffect(() => {
    if (track) {
      incrementViews()
    }
  }, [])

  console.log("YASH: inside metrics component, increment: ", track)
  return (
    <div className="flex space-x-1">
      <Suspense fallback={<LoadingDots />}>
        <Metric key={"views"} stat={views || 0} />
      </Suspense>
    </div>
  )
}
