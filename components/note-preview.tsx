import { Suspense } from "react"
import Link from "@/components/ui/link"
import { NotePreviewLoading } from "@/components/ui/note-preview-loading"
import { NoteWithMetrics } from "@/types"
import moment from "moment"

export const NotePreview = ({ article }: { article: NoteWithMetrics }) => {
  const dateFormat =
    moment(article.note.createdOn).year() === moment().year()
      ? "DD/MM"
      : "DD/MM/YYYY"
  return (
    <>
      <Suspense fallback={<NotePreviewLoading />}>
        <Link
          href={`/notes/${article.note.slug}`}
          className="flex w-full flex-col transition-all hover:text-primary"
          noUnderline
        >
          <div className="group flex flex-col sm:flex-row sm:justify-between">
            <span className="font-heading text-lg font-medium">
              {article.note.title}
            </span>
            <span className="text-sm tracking-widest text-text/60 transition duration-200 sm:group-hover:-translate-x-1">
              {moment(article.note.createdOn).format("DD/MM/YY")}
            </span>
          </div>
        </Link>
      </Suspense>
    </>
  )
}
