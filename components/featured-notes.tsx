import Link from "next/link"
import { getPreviewNotes } from "@/lib/content"
import { FiArrowRight } from "react-icons/fi"

import { NoteList } from "./notes-list"

export async function FeaturedNotes({ count }: { count: number }) {
  {
    /* The eventual goal is to use cloudflare API to fetch the most
      popular notes from the previous month, and show them. In absence
      of the implemention right now, using a statically generated list
      of popular notes.
    */
  }
  let notes = await getPreviewNotes()
  let notesFiltered = notes.filter((note) => note.note.featured === true)
  notesFiltered.sort((a, b) => b.note.updatedOn - a.note.updatedOn)
  return (
    <>
      <div className="group flex flex-row justify-between">
        <h2 className="uppercase tracking-wider text-gray-500 mb-4">
          Writings
        </h2>
        {/* <Link
          href="/notes"
          className="flex items-center space-x-2 align-middle text-xl font-bold hover:text-primary"
        >
          <span className="font-normal">all</span>
          <FiArrowRight className="size-4" />
        </Link> */}
      </div>
      <section className="w-full">
        <NoteList homePage={true} notes={notesFiltered.slice(0, count)} />
      </section>
    </>
  )
}
