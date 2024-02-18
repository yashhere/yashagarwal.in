import { getPreviewNotes } from "@/lib/content"

import { NoteList } from "./notes-list"

export async function RecentNotes({ count }: { count: number }) {
  let notes = await getPreviewNotes()
  notes.sort((a, b) => b.note.updatedOn - a.note.updatedOn)
  let notesFiltered = notes.slice(0, count)
  return (
    <>
      <h2 className="pb-4 font-heading text-xl font-bold uppercase tracking-widest text-secondary">
        Just Penned
      </h2>
      <section className="mb-8 w-full space-y-3">
        <NoteList notes={notesFiltered} />
      </section>
    </>
  )
}
