"use client"

import { ChangeEvent, useMemo, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { NoteList } from "@/components/content/notes-list"
import { SearchInput } from "@/components/interactive/search"
import { NoteWithMetadata } from "@/types"

export const NotesList = ({
  notes,
  noSearchBox = false,
}: {
  notes: NoteWithMetadata[]
  noSearchBox?: boolean
}) => {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [results, setResults] = useState(notes)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
    setCurrentPage(1)

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

  const { totalPages, itemsPerPage } = useMemo(() => {
    if (results.length === 0) return { totalPages: 0, itemsPerPage: 0 }

    const sqrtLength = Math.sqrt(results.length)
    const pages = Math.ceil(sqrtLength)
    const items = Math.ceil(results.length / pages)
    return { totalPages: pages, itemsPerPage: items }
  }, [results.length])

  const paginatedNotes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return results.slice(startIndex, endIndex)
  }, [results, currentPage, itemsPerPage])

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col space-y-2">
      {!noSearchBox ? (
        <div className="flex flex-col pb-4">
          <SearchInput search={search} onChange={onChange} />
        </div>
      ) : null}
      <section>
        <NoteList notes={paginatedNotes} />
      </section>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-input hover:enabled:bg-accent hover:enabled:text-accent-foreground focus-visible:ring-ring rounded-md border bg-transparent px-4 py-2 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Previous page"
          >
            <ArrowLeftIcon size={16} />
          </button>

          <span className="text-muted-foreground text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border-input hover:enabled:bg-accent hover:enabled:text-accent-foreground focus-visible:ring-ring rounded-md border bg-transparent px-4 py-2 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Next page"
          >
            <ArrowRightIcon size={16} />
          </button>
        </div>
      )}
      {results.length > 0 && (
        <div className="text-muted-foreground pt-2 text-center text-sm">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, results.length)} of{" "}
          {results.length} notes
        </div>
      )}
    </div>
  )
}
