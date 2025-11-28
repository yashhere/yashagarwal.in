"use client"

import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"

import { NoteList } from "@/components/content/notes-list"
import { SearchInput } from "@/components/interactive/search"
import { NoteSkeleton } from "@/components/ui/note-skeleton"
import { NoteWithMetadata } from "@/types"

const INITIAL_NOTES = 15
const LOAD_MORE = 10

export const NotesList = ({
  notes,
  noSearchBox = false,
}: {
  notes: NoteWithMetadata[]
  noSearchBox?: boolean
}) => {
  const [search, setSearch] = useState("")
  const [visibleCount, setVisibleCount] = useState(INITIAL_NOTES)
  const [results, setResults] = useState(notes)
  const { ref, inView } = useInView({
    threshold: 0,
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
    setVisibleCount(INITIAL_NOTES)

    setResults(
      e.target.value != ""
        ? notes?.filter((article) => {
            return article.note.title
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          })
        : notes
    )
  }

  useEffect(() => {
    if (inView && visibleCount < results.length) {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE, results.length))
    }
  }, [inView, visibleCount, results.length])

  const visibleNotes = useMemo(() => {
    return results.slice(0, visibleCount)
  }, [results, visibleCount])

  const hasMore = visibleCount < results.length

  return (
    <div className="flex flex-col space-y-2">
      {!noSearchBox ? (
        <div className="flex flex-col pb-4">
          <SearchInput search={search} onChange={onChange} />
        </div>
      ) : null}
      <section>
        <NoteList notes={visibleNotes} />
      </section>
      {hasMore && (
        <div ref={ref} className="flex flex-col gap-2 pt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <NoteSkeleton key={i} />
          ))}
        </div>
      )}
      {results.length > 0 && (
        <div className="text-muted-foreground pt-2 text-center text-sm">
          Showing {visibleCount} of {results.length} notes
        </div>
      )}
    </div>
  )
}
