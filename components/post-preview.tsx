import { Suspense } from "react"
import { Metric } from "@/components/metrics/metric"
import Link from "@/components/ui/link"
import { PostPreviewLoading } from "@/components/ui/post-preview-loading"
import { PostWithMetrics } from "@/types"
import moment from "moment"

export const PostPreview = ({ article }: { article: PostWithMetrics }) => {
  return (
    <>
      <Suspense fallback={<PostPreviewLoading />}>
        <Link
          href={`/blog/${article.post.slug}`}
          className="flex w-full flex-col transition-all hover:text-primary"
          noUnderline
        >
          <div className="flex flex-col">
            <span className="w-full font-heading text-lg font-bold">
              {article.post.title}
            </span>
            <div className="flex space-x-2 text-sm font-medium text-gray-700">
              <p>{moment(article.post.published).fromNow()}</p>
              <p>&middot;</p>
              <Metric stat={article.views.toString()} type="views" />
              <p>&middot;</p>
              <Metric stat={article.likes.toString()} type="likes" />
            </div>
          </div>
        </Link>
      </Suspense>
    </>
  )
}
