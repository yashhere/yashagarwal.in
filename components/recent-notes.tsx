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
      <div className="group mb-8 flex flex-row justify-between">
        <h2 className="text-xl font-semibold">Recent Notes</h2>
        <Link
          href="/notes"
          className="flex items-center space-x-2 align-middle text-xl font-bold hover:text-primary"
        >
          <span className="font-normal">all</span>
          <FiArrowRight className="size-4" />
        </Link>
      </div>
      <section className="w-full space-y-3">
        <NoteList notes={notesFiltered} />
      </section>
    </>
  )
}
