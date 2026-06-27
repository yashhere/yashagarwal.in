import { getCollection, type CollectionEntry } from "astro:content"
import { compareDesc } from "date-fns"

export type RawNoteEntry = CollectionEntry<"scratch_notes">

export async function getRawNotes(): Promise<RawNoteEntry[]> {
  const notes = await getCollection("scratch_notes")
  return notes.sort((a, b) => compareDesc(a.data.createdOn, b.data.createdOn))
}

export async function getPublishedRawNotes(): Promise<RawNoteEntry[]> {
  const notes = await getRawNotes()
  if (import.meta.env.DEV) {
    return notes
  }
  return notes.filter((n) => n.data.status === "published")
}

export async function getRawNoteBySlug(
  slug: string,
): Promise<RawNoteEntry | undefined> {
  const notes = await getCollection("scratch_notes")
  return notes.find((n) => n.slug === slug)
}
