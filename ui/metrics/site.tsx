import { Metric } from "@/ui/metrics/metric"
import {
  ArrowTrendingUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid"
import { allPosts } from "contentlayer/generated"
import { headers } from "next/headers"
import { Suspense } from "react"
import { LoadingMetric } from "./loading"

async function getTotalViews() {
  const data = headers()
  const protocol = data.get("x-forwarded-proto")
  const host = data.get("host")

  const res = await fetch(`${protocol}://${host}/views`)
  return res.json()
}

export const SiteMetrics = async (): Promise<JSX.Element> => {
  const data = await getTotalViews()
  const count = allPosts.length

  return (
    <>
      <div className="flex gap-2 font-medium font-[Open Sans] text-black/60">
        <ArrowTrendingUpIcon className="w-5" />
        <div className="flex space-x-1">
          <Suspense fallback={<LoadingMetric />}>
            <Metric stat={data as number} />
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
