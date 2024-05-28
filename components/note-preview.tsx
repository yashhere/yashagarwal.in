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
        className="-mx-3 flex flex-col justify-between rounded-md px-3 leading-6 hover:bg-gray-500/10 sm:py-2 md:flex-row md:items-center"
        noUnderline
      >
        <div className="flex flex-col">
          <span className="mb-[2px] font-heading text-lg font-medium">
            {note.note.title}
          </span>
          {note.note.description && (
            <span className="mb-[2px] hidden text-base text-gray-700 sm:block">
              {note.note.description}
            </span>
          )}
        </div>
        <span
          className={cn(homePage ? "sm:hidden" : "", "text-base text-gray-700")}
        >
          {moment(note.note.createdOn).format("DD MMM, YYYY")}
        </span>
      </Link>
    </>
  )
}
