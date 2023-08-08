import { Suspense } from "react"
import { getPreviewPosts } from "@/lib/content"
import moment from "moment"

import { PostList } from "./article-list"
import { PostListLoading } from "./blog-list"

export async function RecentPosts({ count }: { count: number }) {
  let articles = await getPreviewPosts()
  articles.sort((a, b) => b.post.updatedOn - a.post.updatedOn)
  // filter out posts older than 6 months
  let articlesFiltered = articles
    .filter((article) => {
      const date = article.post.updatedOn || article.post.published
      return moment().diff(date, "months") < 6
    })
    .slice(0, count)

  if (articlesFiltered.length === 0) {
    return
  }

  return (
    <>
      <h2 className="pb-4 font-heading text-xl font-bold uppercase tracking-widest text-secondary">
        Just Penned
      </h2>
      <section className="mb-8 w-full space-y-3">
        <Suspense fallback={<PostListLoading articles={articlesFiltered} />}>
          <PostList articles={articlesFiltered} />
        </Suspense>
      </section>
    </>
  )
}
