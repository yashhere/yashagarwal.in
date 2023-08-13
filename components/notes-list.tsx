import { NotePreview } from "@/components/note-preview"
import { NoteWithMetrics } from "@/types"

export const NoteList = ({ notes }: { notes: NoteWithMetrics[] }) => {
  return (
    <>
      {notes?.map((note) => {
        return <NotePreview key={note.note.slug} note={note} />
      })}
    </>
  )
}
