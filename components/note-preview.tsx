import Link from "@/components/ui/link"
import { NoteWithMetadata } from "@/types"
import moment from "moment"

export const NotePreview = ({
  note,
  showDescription = false,
}: {
  note: NoteWithMetadata
  showDescription: boolean
}) => {
  return (
    <>
      <Link
        href={`/notes/${note.note.slug}`}
        className="flex w-full flex-col hover:text-primary"
        noUnderline
      >
        <div className="group flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0 md:items-center">
          <div className="flex flex-1 flex-col space-y-2">
            <span className="font-heading text-lg font-medium">
              {note.note.title}
            </span>
            {showDescription && note.note?.description && (
              <span className="text-base text-gray-600">
                {note.note?.description}
              </span>
            )}
          </div>
          <div className="text-sm tracking-wide text-gray-600">
            {moment(note.note.createdOn).format("DD MMM, YYYY")}
          </div>
        </div>
      </Link>
    </>
  )
}
