import { Suspense } from "react"
import { Metric } from "@/components/metrics/metric"
import Link from "@/components/ui/link"
import { PostPreviewLoading } from "@/components/ui/post-preview-loading"
import { getTopPosts } from "@/lib/actions"
import moment from "moment"

export async function TopPosts() {
  const articles = await getTopPosts(3)

  return (
    <>
      {articles?.map((item) => {
        return (
          <Suspense key={item.post.slug} fallback={<PostPreviewLoading />}>
            <Link
              href={`/blog/${item.post.slug}`}
              className="transition-all [&_h4]:hover:text-primary"
            >
              <div className="flex h-full flex-col justify-between rounded-lg">
                <div className="mb-6">
                  <h4 className="w-full font-heading text-lg font-bold">
                    {item.post.title}
                  </h4>
                  <div className="flex space-x-2 text-sm font-medium text-gray-600">
                    <p>{moment(item.post.published).fromNow()}</p>
                    <p>&middot;</p>
                    <Metric stat={item.views.toString()} type="views" />
                    <p>&middot;</p>
                    <Metric stat={item.likes.toString()} type="likes" />
                  </div>
                </div>
              </div>
            </Link>
          </Suspense>
        )
      })}
    </>
  )
}
