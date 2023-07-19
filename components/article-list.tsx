import { PostPreview } from "@/components/post-preview"
import { PostWithMetrics } from "@/types"

export const PostList = ({ articles }: { articles: PostWithMetrics[] }) => {
  return (
    <>
      {articles?.map((article) => {
        return <PostPreview key={article.post.slug} article={article} />
      })}
    </>
  )
}
