import { NotePreview } from "@/components/note-preview"
import { NoteWithMetadata } from "@/types"

export const NoteList = ({ notes }: { notes: NoteWithMetadata[] }) => {
  return (
    <>
      {notes?.map((note) => {
        return <NotePreview key={note.note.slug} note={note} />
      })}
    </>
  )
}
