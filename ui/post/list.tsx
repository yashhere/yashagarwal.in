import { PostPreview } from "@/ui/post/preview"

import { getPosts } from "@/lib/content"

export const PostList = ({
  posts,
  allLikes,
  allViews,
}: {
  posts?: ReturnType<typeof getPosts>
  allLikes: {
    slug: string
    likes: number
  }[]
  allViews: {
    slug: string
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
            allViews={allViews}
            allLikes={allLikes}
          />
        )
      })}
    </>
  )
}
