import { getPosts } from "@/lib/content"
import { PostPreview } from "@/ui/post/preview"

export const PostList = ({
  posts,
  allViews,
}: {
  posts?: ReturnType<typeof getPosts>
  allViews: {
    slug: string
    views: number
  }[]
}) => {
  return (
    <>
      {posts?.map((article) => {
        return (
          <PostPreview key={article.slug} post={article} allViews={allViews} />
        )
      })}
    </>
  )
}
