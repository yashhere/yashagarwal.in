import { getPosts } from "@/lib/content";
import { PostPreview } from "@/ui/post/preview";

export const PostList = ({
  posts,
}: {
  posts?: ReturnType<typeof getPosts>;
}) => {
  return (
    <>
      {posts?.map((article) => {
        return <PostPreview key={article.slug} post={article} />;
      })}
    </>
  );
};
