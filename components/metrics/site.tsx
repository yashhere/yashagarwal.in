import { LoadingMetric } from "@/components/metrics/loading"
import { Metric } from "@/components/metrics/metric"
import { getTotalViews } from "@/lib/actions"
import {
  ArrowTrendingUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid"
import { allPosts } from "contentlayer/generated"
import { Suspense } from "react"

export const SiteMetrics = async (): Promise<JSX.Element> => {
  const data = Number((await getTotalViews()).total_views || 0)
  const count = allPosts.length

  return (
    <>
      <div className="flex gap-2 font-medium font-[Open Sans] text-black/60">
        <ArrowTrendingUpIcon className="w-5" />
        <div className="flex space-x-1">
          <Suspense fallback={<LoadingMetric />}>
            <Metric stat={data.toString()} type={"views"} />
          </Suspense>
          <p>views</p>
        </div>
      </div>

      <div className="flex gap-2 font-medium font-[Open Sans] text-black/60">
        <PencilSquareIcon className="w-5" />
        <div className="flex space-x-1">
          <Suspense fallback={<LoadingMetric />}>
            <Metric stat={count.toString()} type={"posts"} />
          </Suspense>
          <p>articles</p>
        </div>
      </div>
    </>
  )
}
