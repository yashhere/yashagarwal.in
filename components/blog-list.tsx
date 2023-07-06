"use client"

import { PostList } from "@/components/article-list"
import { SearchInput } from "@/components/search"
import { PostPreviewLoading } from "@/components/ui/post-preview-loading"
import { Post } from "contentlayer/generated"
import { ChangeEvent, Suspense, useState } from "react"

export const PostListLoading = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts.map((p) => (
        <PostPreviewLoading key={p.slug} />
      ))}
    </>
  )
}
export const BlogPostList = ({
  posts,
  allMetrics,
}: {
  posts: Post[]
  allMetrics: {
    slug: string
    likes: number
    views: number
  }[]
}) => {
  const [search, setSearch] = useState("")

  const [results, setResults] = useState(posts)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)

    setResults(
      e.target.value != ""
        ? posts?.filter((p) => {
            return p.title.toLowerCase().includes(e.target.value.toLowerCase())
          })
        : posts,
    )
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col pb-4">
        <SearchInput search={search} onChange={onChange} />
      </div>
      <section className="w-full space-y-5">
        <Suspense fallback={<PostListLoading posts={posts} />}>
          <PostList allMetrics={allMetrics} posts={results} />
        </Suspense>
      </section>
    </div>
  )
}
