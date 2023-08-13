import { Suspense } from "react"
import { getPreviewNotes } from "@/lib/content"

import { NoteListLoading } from "./all-notes"
import { NoteList } from "./notes-list"

export async function TopNotes({ count }: { count: number }) {
  let articles = await getPreviewNotes()
  articles.sort((a, b) => b.views - a.views)
  articles = articles.slice(0, count)

  return (
    <>
      <h2 className="pb-4 font-heading text-xl font-bold uppercase tracking-widest text-secondary">
        Popular notes
      </h2>
      <section className="w-full space-y-3">
        <Suspense fallback={<NoteListLoading articles={articles} />}>
          <NoteList articles={articles} />
        </Suspense>
      </section>
    </>
  )
}
