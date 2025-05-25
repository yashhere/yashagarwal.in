import { getPreviewNotes } from "@/lib/content"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import Link from "../ui/link"
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
    <div className="flex flex-col justify-start gap-4 md:gap-12">
      <div className="w-full">
        <NoteList homePage={true} notes={notesFiltered.slice(0, count)} />
      </div>
      <Link
        href="/notes"
        className="group mt-2 inline-flex items-center gap-2 text-base font-medium text-foreground/80 transition-colors hover:text-primary"
        variant="nav"
      >
        <span>View all notes</span>
        <ArrowRightIcon className="relative top-[1px] h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
