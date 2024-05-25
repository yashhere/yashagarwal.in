import Link from "@/components/ui/link"
import { NoteWithMetadata } from "@/types"
import moment from "moment"

export const NotePreview = ({ note }: { note: NoteWithMetadata }) => {
  return (
    <>
      <Link
        href={`/notes/${note.note.slug}`}
        className="flex w-full flex-col justify-between text-lg leading-6 hover:text-primary  md:flex-row md:items-center"
        noUnderline
      >
        <span className="mb-[2px] font-heading font-medium">
          {note.note.title}
        </span>
        <span className="text-base text-gray-700">
          {moment(note.note.createdOn).format("DD MMM, YYYY")}
        </span>
      </Link>
    </>
  )
}
