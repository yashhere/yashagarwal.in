"use client"

import { Suspense } from "react"
import Link from "@/components/ui/link"
import { useMediaQuery } from "@/hooks/use-media-query"
import { NoteWithMetadata } from "@/types"
import moment from "moment"

export const NotePreview = ({
  note,
  homePage,
}: {
  note: NoteWithMetadata
  homePage: boolean
}) => {
  const { isMobile } = useMediaQuery()
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
          {note.note.description && !isMobile && (
            <Suspense fallback={<p>Loading description...</p>}>
              <span className="mb-[2px] text-base text-gray-700">
                {note.note.description}
              </span>
            </Suspense>
          )}
        </div>
        {(!homePage || isMobile) && (
          <Suspense fallback={<p>Loading date...</p>}>
            <span className="text-base text-gray-700">
              {moment(note.note.createdOn).format("DD MMM, YYYY")}
            </span>
          </Suspense>
        )}
      </Link>
    </>
  )
}
