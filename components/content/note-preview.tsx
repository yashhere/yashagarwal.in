import Link from "@/components/ui/link"
import { cn } from "@/lib/utils"
import { NoteWithMetadata } from "@/types"
import moment from "moment"

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
        className="flex flex-col md:flex-row items-start md:items-center rounded-md px-4 gap-0 md:gap-2 py-1 transition-colors select-none hover:bg-muted w-full"
        variant="nav"
      >
        <div className="flex flex-col">
          <span className="mb-1 font-sans text-base text-foreground">
            {note.note.title}
          </span>
          {homePage && note.note.description && (
            <span className="mb-1 text-sm text-foreground/70">
              {note.note.description}
            </span>
          )}
        </div>
        {!homePage && (
          <>
            <span
              className="mx-2 h-px flex-1 bg-transparent border-t border-dotted border-foreground/30"
              aria-hidden
            />
            <span className="text-sm text-foreground/70 font-mono">
              {moment(note.note.createdOn).format("MM/YY")}
            </span>
          </>
        )}
      </Link>
    </div>
  )
}
