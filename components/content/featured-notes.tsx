import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { getPreviewNotes } from "@/lib/content"
import Link from "../ui/link"
import { NoteList } from "./notes-list"

export function FeaturedNotes({ count }: { count: number }) {
  const notes = getPreviewNotes()
  // Get the most recent notes
  const notesFiltered = notes.slice(0, count)
  return (
    <div className="flex flex-col justify-start gap-5">
      <div className="w-full">
        <NoteList homePage={true} notes={notesFiltered} />
      </div>
      <Link
        href="/notes"
        className="group text-foreground/80 hover:text-primary text-md mt-3 inline-flex items-center gap-1 font-medium transition-colors"
        variant="nav"
      >
        <span>View all notes</span>
        <ArrowRightIcon className="relative top-px h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
