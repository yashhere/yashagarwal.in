"use client"

import { NoteList as ClientNoteList } from "@/components/content/notes-list"
import { NoteWithMetadata } from "@/types"

export const AnimatedNoteList = ({
  notes,
  homePage,
  baseDelay,
}: {
  notes: NoteWithMetadata[]
  homePage?: boolean
  baseDelay?: number
}) => {
  return (
    <ClientNoteList notes={notes} homePage={homePage} baseDelay={baseDelay} />
  )
}
