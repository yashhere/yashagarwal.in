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
    <div className="flex flex-col gap-4 md:gap-0 mr-3">
      {notes?.map((note) => {
        return (
          <NotePreview homePage={homePage} key={note.note.slug} note={note} />
        )
      })}
    </div>
  )
}
