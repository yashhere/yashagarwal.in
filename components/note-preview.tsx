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
        className="-mx-3 flex flex-col justify-between rounded-md px-3 leading-6 hover:bg-muted sm:py-2 md:flex-row md:items-center"
        noUnderline
      >
        <div className="flex flex-col">
          <span className="mb-[2px] font-heading text-lg font-medium text-foreground/90">
            {note.note.title}
          </span>
          {homePage && note.note.description && (
            <span className="mb-[2px] text-base text-muted-foreground">
              {note.note.description}
            </span>
          )}
        </div>
        <span
          className={cn(
            homePage ? "hidden" : "",
            "text-base text-muted-foreground"
          )}
        >
          {moment(note.note.createdOn).format("MMM DD, YYYY")}
        </span>
      </Link>
    </>
  )
}
