import { getPosts } from "@/lib/content"
import { PostPreview } from "@/ui/post/preview"

export const PostList = ({
  posts,
  allMetrics,
}: {
  posts?: ReturnType<typeof getPosts>
  allMetrics: {
    slug: string
    likes: number
    views: number
  }[]
}) => {
  return (
    <>
      {posts?.map((article) => {
        return (
          <PostPreview
            key={article.slug}
            post={article}
            allMetrics={allMetrics}
          />
        )
      })}
    </>
  )
}
