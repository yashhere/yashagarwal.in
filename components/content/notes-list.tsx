import { NotePreview } from "@/components/content/note-preview"
import { NoteWithMetadata } from "@/types"

export const NoteList = ({
  notes,
  homePage = false,
}: {
  notes: NoteWithMetadata[]
  homePage?: boolean
}) => {
  return (
    <ul className="-mx-4">
      {notes?.map((note) => {
        return (
          <li key={note.note.slug}>
            <NotePreview homePage={homePage} key={note.note.slug} note={note} />
          </li>
        )
      })}
    </ul>
  )
}
