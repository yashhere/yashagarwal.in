import Link from "next/link"
import { getPreviewNotes } from "@/lib/content"
import { FiArrowRight } from "react-icons/fi"

import { NoteList } from "./notes-list"

export async function FeaturedNotes({ count }: { count: number }) {
  let notes = await getPreviewNotes()
  let notesFiltered = notes.filter((note) => note.note.featured === true)
  notesFiltered.sort((a, b) => b.note.updatedOn - a.note.updatedOn)
  return (
    <>
      <div className="group mb-8 flex flex-row justify-between">
        <h2 className="text-xl font-semibold">Popular Notes</h2>
        <Link
          href="/notes"
          className="flex items-center space-x-2 align-middle text-xl font-bold hover:text-primary"
        >
          <span className="font-normal">all</span>
          <FiArrowRight className="size-4" />
        </Link>
      </div>
      <section className="w-full">
        <NoteList homePage={true} notes={notesFiltered.slice(0, count)} />
      </section>
    </>
  )
}
