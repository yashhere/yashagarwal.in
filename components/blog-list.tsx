"use client"

import { ChangeEvent, Suspense, useState } from "react"
import { PostList } from "@/components/article-list"
import { SearchInput } from "@/components/search"
import { PostPreviewLoading } from "@/components/ui/post-preview-loading"
import { PostWithMetrics } from "@/types"
import { Post } from "contentlayer/generated"

export const PostListLoading = ({
  articles,
}: {
  articles: PostWithMetrics[]
}) => {
  return (
    <>
      {articles.map((article) => (
        <PostPreviewLoading key={article.post.slug} />
      ))}
    </>
  )
}

export const BlogPostList = ({ articles }: { articles: PostWithMetrics[] }) => {
  const [search, setSearch] = useState("")

  const [results, setResults] = useState(articles)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)

    setResults(
      e.target.value != ""
        ? articles?.filter((article) => {
            return article.post.title
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          })
        : articles
    )
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col pb-4">
        <SearchInput search={search} onChange={onChange} />
      </div>
      <section className="w-full space-y-5">
        <Suspense fallback={<PostListLoading articles={articles} />}>
          <PostList articles={articles} />
        </Suspense>
      </section>
    </div>
  )
}
