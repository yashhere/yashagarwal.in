"use client"

import { memo } from "react"
import { motion } from "motion/react"

import { NotePreview } from "@/components/content/note-preview"
import { fadeInUpVariants } from "@/lib/animations"
import { NoteWithMetadata } from "@/types"

const NoteListComponent = ({
  notes,
  homePage = false,
  baseDelay = 0,
}: {
  notes: NoteWithMetadata[]
  homePage?: boolean
  baseDelay?: number
}) => {
  return (
    <motion.ul className="-mx-4">
      {notes?.map((note, idx) => {
        return (
          <motion.li
            key={note.note.slug}
            variants={fadeInUpVariants}
            custom={{ index: idx, baseDelay }}
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

export const NoteList = memo(NoteListComponent)
