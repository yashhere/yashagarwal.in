import { allNotes, Note } from "content-collections"
import { compareDesc } from "date-fns"

import { NoteWithFullMetadata, NoteWithMetadata } from "@/types"

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

export function getPreviewNotes(): NoteWithMetadata[] {
  const notes = getNotes()

  const previewNotes: NoteWithMetadata[] = []
  notes?.forEach((note) => {
    // all notes with draft status are omitted from the blog list and popular
    // list. These are navigable only from the series menu.
    if (note.status === "published" || process.env.NODE_ENV === "development") {
      previewNotes.push({
        note: {
          title: note.title,
          description: note.description,
          createdOn: note.createdOn,
          updatedOn: note.updatedOn,
          category: note.category,
          slug: note.slug,
          tags: note.tags,
          image: note.image,
        },
      })
    }
  })

  return previewNotes
}

export async function getPartialNote(slug: string) {
  const note = getNotes().find((item: Note) => item._meta.path === slug)
  if (!note) {
    return null
  }

  const trimmedNote: Partial<Note> = {
    title: note.title,
    createdOn: note.createdOn,
    updatedOn: note.updatedOn,
    slug: note.slug,
    description: note.description,
    mdx: note.mdx,
    tags: note.tags,
    status: note.status,
    category: note.category,
    headings:
      (note.headings as { heading: number; text: string; slug: string }[]) ??
      null,
    readingTime: note.readingTime,
    related: note.related,
  }

  const article: NoteWithFullMetadata = {
    note: trimmedNote,
    // Array destructuring, in case I decide to include backlinks to other types as well
    backlinks: [...getNoteBacklinks(note.slug as string, URL_SEGMENTS.NOTES)],
    series:
      (note.series &&
        getSeries(note.series?.title as string, note.slug as string)) ||
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

export function getNoteBacklinks(slug: string, urlSegment: string) {
  const backlinksToNote = allNotes.filter((doc) => {
    if (doc._meta.path !== slug) {
      const urlToSearch = `/${urlSegment}/${slug}`
      return doc.content.includes(urlToSearch)
    }
    return false
  })

  return backlinksToNote.map((doc) => ({
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
        (a: Note, b: Note) =>
          (a.series!.order as number) - (b.series!.order as number)
      )
      .map((p) => {
        return {
          title: p.title,
          slug: p.slug as string,
          status: p.status,
          isCurrent: p.slug === current,
        }
      }),
  }
}
