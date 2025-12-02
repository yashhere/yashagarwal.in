import { FeaturedNotesLink } from "@/components/content/featured-notes-link"
import { NoteList } from "@/components/content/notes-list"
import { getPreviewNotes } from "@/lib/content"

export function FeaturedNotes({ count }: { count: number }) {
  const notes = getPreviewNotes()
  // Sort all notes by creation date (newest first)
  const sortedNotes = [...notes].sort(
    (a, b) =>
      new Date(b.note.createdOn as string).getTime() -
      new Date(a.note.createdOn as string).getTime()
  )
  // Get the most recent notes
  const notesFiltered = sortedNotes.slice(0, count)

  return (
    <div className="flex flex-col justify-start gap-5">
      <div className="w-full">
        <NoteList homePage={true} notes={notesFiltered} baseDelay={0.6} />
      </div>
      <FeaturedNotesLink />
    </div>
  )
}
