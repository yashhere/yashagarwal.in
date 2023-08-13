import { Suspense } from "react"
import { getPreviewNotes } from "@/lib/content"
import moment from "moment"

import { NoteListLoading } from "./all-notes"
import { NoteList } from "./notes-list"

export async function RecentNotes({ count }: { count: number }) {
  let notes = await getPreviewNotes()
  notes.sort((a, b) => b.note.updatedOn - a.note.updatedOn)
  // filter out notes older than 6 months
  let notesFiltered = notes
    .filter((article) => {
      const date = article.note.updatedOn || article.note.createdOn
      return moment().diff(date, "months") < 6
    })
    .slice(0, count)

  if (notesFiltered.length === 0) {
    return
  }

  return (
    <>
      <h2 className="pb-4 font-heading text-xl font-bold uppercase tracking-widest text-secondary">
        Just Penned
      </h2>
      <section className="mb-8 w-full space-y-3">
        <Suspense fallback={<NoteListLoading notes={notesFiltered} />}>
          <NoteList notes={notesFiltered} />
        </Suspense>
      </section>
    </>
  )
}
