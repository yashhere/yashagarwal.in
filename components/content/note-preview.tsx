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
    <>
      <Link
        href={`/notes/${note.note.slug}`}
        className="flex flex-col justify-between rounded-md px-4 md:gap-2 py-1 transition-colors select-none hover:bg-muted md:flex-row md:items-center"
        noUnderline
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
        <span
          className={cn(
            homePage ? "hidden" : "",
            "h-px flex-1 bg-foreground/30"
          )}
          aria-hidden
        />
        <span
          className={cn(
            homePage ? "hidden" : "",
            "text-sm text-foreground/70 sm:text-base"
          )}
        >
          {moment(note.note.createdOn).format("MM.YY")}
        </span>
      </Link>
    </>
  )
}
