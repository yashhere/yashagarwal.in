import { PostPreview } from "@/ui/post/preview"

import { getPosts } from "@/lib/content"

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
