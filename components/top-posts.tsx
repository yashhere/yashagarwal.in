import { Suspense } from "react"
import { Metric } from "@/components/metrics/metric"
import Link from "@/components/ui/link"
import { PostPreviewLoading } from "@/components/ui/post-preview-loading"
import { getAllMetrics } from "@/lib/actions"
import { PostWithMetrics } from "@/types"
import { allPosts } from "contentlayer/generated"
import moment from "moment"

export async function TopPosts({ count }: { count: number }) {
  const allMetrics = await getAllMetrics()
  const data = allMetrics.sort((a, b) => b.views - a.views)
  const articles: PostWithMetrics[] = []

  data?.forEach(async (item) => {
    if (articles.length == count) {
      return
    }
    const post = allPosts
      .filter((p) => p.status != "draft")
      .find((p) => p.slug === item.slug)
    if (post != null) {
      articles.push({ post: post, views: item.views, likes: item.likes })
    }
  })

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
                  <h3 className="w-full font-heading text-lg font-bold">
                    {item.post.title}
                  </h3>
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
