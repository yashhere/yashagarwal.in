import {
  ArrowTrendingUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid"
import { allPosts } from "contentlayer/generated"
import { headers } from "next/headers"
import { Suspense } from "react"
import { LoadingMetric } from "./loading"
import { getTotalViews } from "@/lib/db"
import { Metric } from "./metric"

export const SiteMetrics = async (): Promise<JSX.Element> => {
  const data = Number((await getTotalViews()).total_views || 0)
  const count = allPosts.length

  return (
    <>
      <div className="flex gap-2 font-medium font-[Open Sans] text-black/60">
        <ArrowTrendingUpIcon className="w-5" />
        <div className="flex space-x-1">
          <Suspense fallback={<LoadingMetric />}>
            <Metric stat={data} />
          </Suspense>
          <p>views</p>
        </div>
      </div>

      <div className="flex gap-2 font-medium font-[Open Sans] text-black/60">
        <PencilSquareIcon className="w-5" />
        <div className="flex space-x-1">
          <Suspense fallback={<LoadingMetric />}>
            <Metric stat={count} />
          </Suspense>
          <p>articles</p>
        </div>
      </div>
    </>
  )
}
