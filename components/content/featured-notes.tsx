"use client"

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"
import { motion } from "motion/react"

import { getPreviewNotes } from "@/lib/content"
import Link from "../ui/link"
import { NoteList } from "./notes-list"

export function FeaturedNotes({ count }: { count: number }) {
  const notes = getPreviewNotes()
  // Sort all notes by creation date (newest first)
  const sortedNotes = [...notes].sort(
    (a, b) =>
      new Date(b.note.createdOn as string).getTime() -
      new Date(a.note.createdOn as string).getTime()
  )
  // Get the most recent notes
  const notesFiltered = sortedNotes.slice(0, count)

  const linkVariant = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.9,
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  } as any

  return (
    <div className="flex flex-col justify-start gap-5">
      <div className="w-full">
        <NoteList homePage={true} notes={notesFiltered} baseDelay={0.6} />
      </div>
      <motion.div
        variants={linkVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Link
          href="/notes"
          className="group text-foreground/80 hover:text-primary text-md mt-3 inline-flex items-center gap-1 font-medium transition-colors"
          variant="text"
        >
          <span>View all notes</span>
          <ArrowRightIcon className="relative top-[1px] h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  )
}
