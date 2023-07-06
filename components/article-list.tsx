import { PostPreview } from "@/components/post-preview"
import { getPosts } from "@/lib/content"

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
