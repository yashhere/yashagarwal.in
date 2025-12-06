import { format } from "date-fns"

import Link from "@/components/ui/link"
import { NoteWithMetadata } from "@/types"

export const NotePreview = ({
  note,
  homePage,
}: {
  note: NoteWithMetadata
  homePage: boolean
}) => {
  if (homePage) {
    return (
      <div className="flex flex-col py-1">
        <Link
          href={`/notes/${note.note.slug}`}
          className="group hover:bg-accent flex w-full flex-col items-start gap-1 rounded-lg p-3 text-left transition-colors"
          variant="nav"
        >
          <div className="flex w-full items-baseline justify-between gap-3">
            <span className="text-foreground group-hover:text-primary font-sans text-base font-medium transition-colors">
              {note.note.title}
            </span>
            <span className="text-foreground/70 shrink-0 font-mono text-sm">
              {format(new Date(note.note.createdOn), "MM/yy")}
            </span>
          </div>
          {note.note.description && (
            <p className="text-muted-foreground line-clamp-2 max-w-[85%] text-sm leading-relaxed">
              {note.note.description}
            </p>
          )}
        </Link>
      </div>
    )
  }

  return (
    <div className="flex">
      <Link
        href={`/notes/${note.note.slug}`}
        className="hover:bg-accent flex w-full flex-col items-start gap-0 rounded-lg px-4 py-2 transition-all duration-200 select-none md:flex-row md:items-center md:gap-2"
        variant="nav"
      >
        <div className="flex flex-col">
          <span className="text-foreground hover:text-primary font-sans text-base transition-colors">
            {note.note.title}
          </span>
        </div>
        <>
          <span
            className="border-foreground/30 mx-2 h-px flex-1 border-t border-dotted bg-transparent"
            aria-hidden
          />
          <span className="text-foreground/70 font-mono text-sm">
            {format(new Date(note.note.createdOn), "MM/yy")}
          </span>
        </>
      </Link>
    </div>
  )
}
