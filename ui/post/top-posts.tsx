import { getTopPosts } from "@/lib/actions"
import moment from "moment"
import { Suspense } from "react"
import Link from "../link/link"
import { Metric } from "../metrics/metric"
import { PostPreviewLoading } from "./loading"

export async function TopPosts() {
  const articles = await getTopPosts(3)

  return (
    <>
      {articles?.map((item) => {
        return (
          <Suspense key={item.post.slug} fallback={<PostPreviewLoading />}>
            <Link
              href={`/blog/${item.post.slug}`}
              className="transition-all [&_h4]:hover:text-primary-300"
            >
              <div className="flex h-full flex-col justify-between rounded-lg">
                <div className="mb-6">
                  <h4 className="w-full font-heading text-lg font-bold">
                    {item.post.title}
                  </h4>
                  <div className="text-md flex space-x-2 font-medium text-black/60 dark:text-white/60">
                    <p>{moment(item.post.published).fromNow()}</p>
                    <p>&middot;</p>
                    <Metric stat={item.views} type="views" />
                    <p>&middot;</p>
                    <Metric stat={item.likes} type="likes" />
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
