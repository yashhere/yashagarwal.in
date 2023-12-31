import { Suspense } from "react"
import Link from "@/components/ui/link"
import { NotePreviewLoading } from "@/components/ui/note-preview-loading"
import { NoteWithMetrics } from "@/types"
import moment from "moment"

export const NotePreview = ({ note }: { note: NoteWithMetrics }) => {
  const dateFormat =
    moment(note.note.createdOn).year() === moment().year()
      ? "DD/MM"
      : "DD/MM/YYYY"
  return (
    <>
      <Suspense fallback={<NotePreviewLoading />}>
        <Link
          href={`/notes/${note.note.slug}`}
          className="flex w-full flex-col transition-all hover:text-primary"
          noUnderline
        >
          <div className="group flex flex-col sm:flex-row sm:justify-between">
            <span className="font-heading text-lg font-medium">
              {note.note.title}
            </span>
            <span className="text-sm tracking-widest text-text/60 transition duration-200 sm:group-hover:-translate-x-1">
              {moment(note.note.createdOn).format("DD/MM/YY")}
            </span>
          </div>
        </Link>
      </Suspense>
    </>
  )
}
