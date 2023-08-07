import { Suspense } from "react"
import { Metric } from "@/components/metrics/metric"
import Link from "@/components/ui/link"
import { PostPreviewLoading } from "@/components/ui/post-preview-loading"
import { getPreviewPosts } from "@/lib/content"
import moment from "moment"

import { PostList } from "./article-list"
import { PostListLoading } from "./blog-list"
import { PostPreview } from "./post-preview"

export async function RecentPosts({ count }: { count: number }) {
  let articles = await getPreviewPosts()
  articles.sort((a, b) => b.post.updatedOn - a.post.updatedOn)
  articles = articles.slice(0, count)

  return (
    <>
      <h2 className="pb-4 font-heading text-xl font-bold uppercase tracking-widest text-secondary">
        Recently Added
      </h2>
      <section className="w-full space-y-3">
        <Suspense fallback={<PostListLoading articles={articles} />}>
          <PostList articles={articles} />
        </Suspense>
      </section>
    </>
  )
}
