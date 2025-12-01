"use client"

import { motion } from "motion/react"

import { NotePreview } from "@/components/content/note-preview"
import { NoteWithMetadata } from "@/types"

export const NoteList = ({
  notes,
  homePage = false,
  baseDelay = 0,
}: {
  notes: NoteWithMetadata[]
  homePage?: boolean
  baseDelay?: number
}) => {
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: (i: number) => {
      const transition = {
        delay: baseDelay + Math.min(i * 0.05, 0.3),
        type: "spring",
        stiffness: 150,
        damping: 15,
      } as any
      return { opacity: 1, y: 0, transition }
    },
  } as any

  return (
    <motion.ul className="-mx-4">
      {notes?.map((note, idx) => {
        return (
          <motion.li
            key={note.note.slug}
            variants={item}
            custom={idx}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <NotePreview homePage={homePage} key={note.note.slug} note={note} />
          </motion.li>
        )
      })}
    </motion.ul>
  )
}
