import { Suspense } from "react"
import { getPreviewPosts } from "@/lib/content"

import { PostList } from "./article-list"
import { PostListLoading } from "./blog-list"

export async function TopPosts({ count }: { count: number }) {
  let articles = await getPreviewPosts()
  articles.sort((a, b) => b.views - a.views)
  articles = articles.slice(0, count)

  return (
    <>
      <h2 className="pb-4 font-heading text-xl font-bold uppercase tracking-widest text-secondary">
        Popular posts
      </h2>
      <section className="w-full space-y-3">
        <Suspense fallback={<PostListLoading articles={articles} />}>
          <PostList articles={articles} />
        </Suspense>
      </section>
    </>
  )
}
