import { NotePreview } from "@/components/note-preview"
import { NoteWithMetadata } from "@/types"

export const NoteList = ({
  notes,
  showDescription,
}: {
  notes: NoteWithMetadata[]
  showDescription: boolean
}) => {
  return (
    <>
      {notes?.map((note) => {
        return (
          <NotePreview
            key={note.note.slug}
            showDescription={showDescription}
            note={note}
          />
        )
      })}
    </>
  )
}
