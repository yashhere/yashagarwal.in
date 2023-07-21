"use client"

import { ChangeEvent, Suspense, useState } from "react"
import { PostList } from "@/components/article-list"
import { SearchInput } from "@/components/search"
import { PostPreviewLoading } from "@/components/ui/post-preview-loading"
import { PostWithMetrics } from "@/types"

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

export const BlogPostList = ({
  articles,
  noSearchBox = false,
}: {
  articles: PostWithMetrics[]
  noSearchBox?: boolean
}) => {
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
      {!noSearchBox ? (
        <div className="flex flex-col pb-4">
          <SearchInput search={search} onChange={onChange} />
        </div>
      ) : null}
      <section className="w-full space-y-5">
        <Suspense fallback={<PostListLoading articles={articles} />}>
          <PostList articles={articles} />
        </Suspense>
      </section>
    </div>
  )
}
