"use client"

import { ChangeEvent, useState } from "react"
import { NoteList } from "@/components/notes-list"
import { SearchInput } from "@/components/search"
import { NoteWithMetadata } from "@/types"

export const NotesList = ({
  notes,
  noSearchBox = false,
}: {
  notes: NoteWithMetadata[]
  noSearchBox?: boolean
}) => {
  const [search, setSearch] = useState("")

  const [results, setResults] = useState(notes)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)

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

  return (
    <div className="flex flex-col space-y-2">
      {!noSearchBox ? (
        <div className="flex flex-col pb-4">
          <SearchInput search={search} onChange={onChange} />
        </div>
      ) : null}
      <section className="w-full space-y-4">
        <NoteList notes={results} />
      </section>
    </div>
  )
}
