import Link from "next/link"
import { getPreviewNotes } from "@/lib/content"
import { FiArrowRight } from "react-icons/fi"

import { NoteList } from "./notes-list"

export async function RecentNotes({ count }: { count: number }) {
  let notes = await getPreviewNotes()
  notes.sort((a, b) => b.note.updatedOn - a.note.updatedOn)
  let notesFiltered = notes.slice(0, count)
  return (
    <>
      <div className="group flex flex-row justify-between pb-8">
        <h2 className="font-heading text-2xl font-bold text-secondary">
          recent notes
        </h2>
        <Link
          href="/notes"
          className="group flex items-center space-x-2 align-middle text-lg font-bold"
        >
          <span className="font-normal">all</span>
          <FiArrowRight className="size-4 transition duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
      <section className="mb-8 w-full space-y-3">
        <NoteList notes={notesFiltered} />
      </section>
    </>
  )
}
