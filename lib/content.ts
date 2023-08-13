import { NoteWithMetrics } from "@/types"
import { pick } from "contentlayer/client"
import { allNotes, DocumentTypes, Note } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { getAllMetrics } from "./actions"

const URL_SEGMENTS = {
  NOTES: "notes",
  LIFELOG: "lifelog",
}

export function getNotes() {
  const notes = allNotes.sort((a, b) => {
    return compareDesc(new Date(a.createdOn), new Date(b.createdOn))
  })

  if (process.env.NODE_ENV === "development") {
    return notes
  } else {
    return notes.filter((p) => {
      const currentTime = new Date()
      const publishedDate = new Date(p.createdOn)

      // in production, all notes with publish date less than current time
      // are included so that we can navigate to such notes from series menu.
      return currentTime >= publishedDate
    })
  }
}

export async function getPreviewNotes() {
  const notes = getNotes()

  const previewNotes: NoteWithMetrics[] = []
  notes?.forEach(async (note) => {
    // all notes with draft status are omitted from the blog list and popular
    // list. These are navigable only from the series menu.
    if (note.status === "published" || process.env.NODE_ENV === "development") {
      previewNotes.push({
        note: pick(note, [
          "title",
          "description",
          "createdOn",
          "updatedOn",
          "slug",
          "tags",
          "image",
        ]),
        views: 0,
        likes: 0,
      })
    }
  })

  return previewNotes
}

export async function getPartialNote(slug: string) {
  const allMetrics = await getAllMetrics()
  const note = getNotes().find((item) => item.slug === slug)
  if (!note) {
    return null
  }

  const metrics = allMetrics.find((item) => item.slug === slug)
  const trimmedNote: Partial<Note> = {
    title: note.title,
    createdOn: note.createdOn,
    updatedOn: note.updatedOn,
    slug: note.slug,
    description: note.description,
    growthStage: note.growthStage,
    body: {
      code: note.body.code,
      raw: "", // use empty string to reduce payload size
    },
    tags: note.tags,
    status: note.status,
    headings:
      (note.headings as { heading: number; text: string; slug: string }[]) ??
      null,
    readingTime: note.readingTime,
  }

  const article: NoteWithMetrics = {
    note: trimmedNote,
    views: metrics?.views || 0,
    likes: metrics?.likes || 0,
    backlinks: getBacklinks(note.slug as string, URL_SEGMENTS.NOTES),
    series:
      (note.series && getSeries(note.series?.title as string, note.slug)) ||
      undefined,
  }

  return article
}

export function getNote(slug: string) {
  const note = allNotes.find((note) => note.slug === slug)
  if (note != null) {
    return note
  } else {
    throw Error("Unable to Retrieve Note")
  }
}

export function getBacklinks(slug: string, urlSegment: string) {
  const backlinkingNotes = allNotes.filter((doc) => {
    const urlToSearch = `/${urlSegment}/${slug}`
    return doc.body.raw.includes(urlToSearch)
  }) as DocumentTypes[]

  return backlinkingNotes.map((doc) => ({
    title: doc.title,
    url: `/${urlSegment}/${doc.slug}`,
    type: "Note",
  }))
}

export function getSeries(title: string, current: string) {
  return {
    seriesTitle: title,
    notes: allNotes
      .filter((p) => p.series?.title === title)
      .sort(
        (a, b) =>
          Number(new Date(a.series!.order)) - Number(new Date(b.series!.order))
      )
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug,
          status: p.status,
          isCurrent: p.slug === current,
        }
      }),
  }
}
