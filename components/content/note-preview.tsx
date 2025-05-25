import moment from "moment"

import Link from "@/components/ui/link"
import { NoteWithMetadata } from "@/types"

export const NotePreview = ({
  note,
  homePage,
}: {
  note: NoteWithMetadata
  homePage: boolean
}) => {
  return (
    <div className="flex">
      <Link
        href={`/notes/${note.note.slug}`}
        className="hover:bg-muted flex w-full flex-col items-start gap-0 rounded-md px-4 py-1 transition-colors select-none md:flex-row md:items-center md:gap-2"
        variant="nav"
      >
        <div className="flex flex-col">
          <span className="text-foreground mb-1 font-sans text-base">
            {note.note.title}
          </span>
          {homePage && note.note.description && (
            <span className="text-foreground/70 mb-1 text-sm">
              {note.note.description}
            </span>
          )}
        </div>
        {!homePage && (
          <>
            <span
              className="border-foreground/30 mx-2 h-px flex-1 border-t border-dotted bg-transparent"
              aria-hidden
            />
            <span className="text-foreground/70 font-mono text-sm">
              {moment(note.note.createdOn).format("MM/YY")}
            </span>
          </>
        )}
      </Link>
    </div>
  )
}
