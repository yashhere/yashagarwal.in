import { getPost } from "@/lib/content"
import moment from "moment"
import { Suspense } from "react"
import Link from "../link/link"
import { Metric } from "../metrics/metric"
import { PostPreviewLoading } from "./loading"

export const PostPreview = ({
  post,
  allMetrics,
}: {
  post: NonNullable<ReturnType<typeof getPost>>
  allMetrics: {
    slug: string
    likes: number
    views: number
  }[]
}) => {
  const metrics =
    allMetrics && allMetrics.find((item) => item.slug === post.slug)
  const likes = new Number(metrics?.likes || 0)
  const views = new Number(metrics?.views || 0)
  return (
    <>
      <Suspense fallback={<PostPreviewLoading />}>
        <Link
          href={`/blog/${post.slug}`}
          className="flex w-full flex-col transition-all [&_h4]:hover:text-primary-300"
        >
          <div className="flex flex-col">
            <h4 className="w-full font-heading text-lg font-bold">
              {post.title}
            </h4>
            <div className="flex space-x-2 text-sm font-medium text-black/60 dark:text-white/60">
              <p>{moment(post.published).fromNow()}</p>
              <p>&middot;</p>
              <Metric stat={views} type="views" />
              <p>&middot;</p>
              <Metric stat={likes} type="likes" />
            </div>
          </div>
        </Link>
      </Suspense>
    </>
  )
}
