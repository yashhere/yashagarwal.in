import { Suspense } from "react"
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
          <div className="group flex flex-col sm:flex-row sm:justify-between">
            <span className="font-heading text-lg font-medium">
              {article.post.title}
            </span>
            <span className="text-sm  transition duration-200 sm:group-hover:-translate-x-1">
              {moment(article.post.published).fromNow()}
            </span>
          </div>
        </Link>
      </Suspense>
    </>
  )
}
