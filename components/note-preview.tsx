import Link from "@/components/ui/link"
import { NoteWithMetadata } from "@/types"
import moment from "moment"

export const NotePreview = ({ note }: { note: NoteWithMetadata }) => {
  return (
    <>
      <Link
        href={`/notes/${note.note.slug}`}
        className="-mx-3 flex flex-col rounded-md px-3 py-2 hover:bg-[#F5F4F4] dark:hover:bg-gray-200 sm:py-3"
        noUnderline
      >
        <div className="flex flex-col">
          <span className="font-sans font-medium">{note.note.title}</span>
          <span className="text-gray-1100">{note.note.description}</span>
        </div>
      </Link>
    </>
  )
}
