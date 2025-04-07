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
        className="-mx-3 text-gray-700 flex flex-col justify-between rounded-md px-3 leading-6 hover:text-gray-900 sm:py-2 md:flex-row md:items-center"
        noUnderline
      >
        <div className="flex flex-col">
          <span className="mb-[2px] font-heading font-medium">
            {note.note.title}
          </span>
          {/* {homePage && note.note.description && (
            <span className="mb-[2px] text-gray-700">
              {note.note.description}
            </span>
          )} */}
        </div>
        <span className={cn(homePage ? "hidden" : "", "text-gray-700")}>
          {moment(note.note.createdOn).format("DD.MM.YY")}
        </span>
      </Link>
    </>
  )
}
