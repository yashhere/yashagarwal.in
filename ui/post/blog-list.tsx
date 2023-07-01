"use client"

import { Post } from "contentlayer/generated"
import { ChangeEvent, Suspense, useState } from "react"
import { SearchInput } from "../search"
import { PostList } from "./list"
import { PostPreviewLoading } from "./loading"

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
  allViews,
}: {
  posts: Post[]
  allViews: {
    slug: string
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
          <PostList allViews={allViews} posts={results} />
        </Suspense>
      </section>
    </div>
  )
}
