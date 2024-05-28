import { NotePreview } from "@/components/note-preview"
import { NoteWithMetadata } from "@/types"

export const NoteList = ({
  notes,
  homePage = false,
}: {
  notes: NoteWithMetadata[]
  homePage?: boolean
}) => {
  return (
    <div className="flex flex-col gap-5 sm:gap-0">
      {notes?.map((note) => {
        return (
          <NotePreview homePage={homePage} key={note.note.slug} note={note} />
        )
      })}
    </div>
  )
}
