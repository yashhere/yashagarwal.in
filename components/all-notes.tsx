"use client"

import { ChangeEvent, Suspense, useState } from "react"
import { NoteList } from "@/components/notes-list"
import { SearchInput } from "@/components/search"
import { NotePreviewLoading } from "@/components/ui/note-preview-loading"
import { NoteWithMetrics } from "@/types"

export const NoteListLoading = ({
  articles,
}: {
  articles: NoteWithMetrics[]
}) => {
  return (
    <>
      {articles.map((article) => (
        <NotePreviewLoading key={article.note.slug} />
      ))}
    </>
  )
}

export const NotesList = ({
  articles,
  noSearchBox = false,
}: {
  articles: NoteWithMetrics[]
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
            return article.note.title
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
      <section className="w-full space-y-4">
        <Suspense fallback={<NoteListLoading articles={articles} />}>
          <NoteList articles={articles} />
        </Suspense>
      </section>
    </div>
  )
}
