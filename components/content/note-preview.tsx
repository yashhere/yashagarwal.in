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
        className="hover:bg-muted/80 flex w-full flex-col items-start gap-0 rounded-lg px-4 py-2 transition-all duration-200 select-none md:flex-row md:items-center md:gap-2"
        variant="nav"
      >
        <div className="flex flex-col">
          <span className="text-foreground hover:text-primary font-sans text-base transition-colors">
            {note.note.title}
          </span>
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
