import { NotePreview } from "@/components/note-preview"
import { getPreviewNotes } from "@/lib/content"
import { FiArrowRight } from "react-icons/fi"

import Link from "../link"

export default async function Writing({
  prioritySort = false,
}: {
  prioritySort?: boolean
}) {
  const notes = await getPreviewNotes()
  if (prioritySort) {
    notes.sort((a, b) => b.note.updatedOn - a.note.updatedOn)
  }
  return (
    <>
      <div className="mb-5 mt-16 flex flex-row justify-between font-semibold sm:mb-6">
        <h1>Selected Writings</h1>
        <Link
          href="/notes"
          className="hidden align-middle sm:flex sm:items-center sm:space-x-2"
        >
          <span>Read all</span>
          <FiArrowRight className="size-4" />
        </Link>
      </div>
      <div className="sm:-mt-3">
        <div className="flex flex-col gap-5 sm:gap-0">
          {notes.slice(0, 5).map((note) => {
            return <NotePreview key={note.note.slug} note={note} />
          })}
          <Link
            href="/notes"
            className="flex items-center space-x-2 align-middle sm:hidden"
          >
            <span className="font-semibold">Read all</span>
            <FiArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </>
  )
}
