import { NotePreview } from "@/components/note-preview"
import { getPreviewNotes } from "@/lib/content"
import { FiArrowRight } from "react-icons/fi"

import Link from "../link"

export default async function Writing() {
  const notes = await getPreviewNotes()
  return (
    <>
      <div className="mb-5 mt-16 flex flex-row justify-between sm:mb-6">
        <h1>Writings</h1>
        <Link
          href="/notes"
          className="flex items-center space-x-2 align-middle"
        >
          <span className="font-normal">all</span>
          <FiArrowRight className="size-4" />
        </Link>
      </div>
      <div className="text-base text-gray-1100">
        <div className="flex flex-col gap-5 sm:gap-0">
          {notes.slice(0, 5).map((note) => {
            return (
              <NotePreview
                key={note.note.slug}
                showDescription={false}
                note={note}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
