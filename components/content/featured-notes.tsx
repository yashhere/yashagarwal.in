import Link from "next/link"
import { getPreviewNotes } from "@/lib/content"
import { FiArrowRight } from "react-icons/fi"

import { NoteList } from "./notes-list"

export async function FeaturedNotes({ count }: { count: number }) {
  {
    /* The eventual goal is to use cloudflare API to fetch the most
      popular notes from the previous month, and show them. In absence
      of the implemention right now, using a statically generated list
      of popular notes.
    */
  }
  let notes = await getPreviewNotes()
  // Sort all notes by update date (newest first)
  const sortedNotes = [...notes].sort(
    (a, b) => b.note.updatedOn - a.note.updatedOn
  )
  // Get the latest note
  const latestNote = sortedNotes[0]
  // Get all featured notes
  const featuredNotes = notes.filter((note) => note.note.featured === true)
  // Combine latest note with featured notes, avoiding duplicates
  let notesFiltered = [
    latestNote,
    ...featuredNotes.filter((note) => note !== latestNote),
  ]
  // Sort them by update date
  notesFiltered.sort((a, b) => b.note.updatedOn - a.note.updatedOn)
  return (
    <>
      <div className="group mb-6 flex flex-row justify-between">
        <h2 className="text-base font-semibold">Popular Notes</h2>
        <Link
          href="/notes"
          className="flex items-center space-x-2 align-middle font-medium hover:text-primary"
        >
          <span>all</span>
          <FiArrowRight className="size-3.5" />
        </Link>
      </div>
      <section className="w-full">
        <NoteList homePage={true} notes={notesFiltered.slice(0, count)} />
      </section>
    </>
  )
}
