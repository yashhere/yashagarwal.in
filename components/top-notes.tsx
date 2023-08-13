import { Suspense } from "react"
import { getPreviewNotes } from "@/lib/content"

import { NoteListLoading } from "./all-notes"
import { NoteList } from "./notes-list"

export async function TopNotes({ count }: { count: number }) {
  let notes = await getPreviewNotes()
  notes.sort((a, b) => b.views - a.views)
  notes = notes.slice(0, count)

  return (
    <>
      <h2 className="pb-4 font-heading text-xl font-bold uppercase tracking-widest text-secondary">
        Popular notes
      </h2>
      <section className="w-full space-y-3">
        <Suspense fallback={<NoteListLoading notes={notes} />}>
          <NoteList notes={notes} />
        </Suspense>
      </section>
    </>
  )
}
