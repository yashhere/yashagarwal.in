/* eslint-disable no-unused-vars */
export type SiteConfig = {
  title: string
  name: string
  email: string
  description: string
  url: string
  links: {
    twitter: string
    github: string
  }
  popularNotes: number
  featuredNotes: number
}

// Interface for TOC headings
export interface Heading {
  slug: string
  text: string
  heading: number
}

// Explicit type for note preview in lists
export type NotePreview = {
  title: string
  description?: string
  createdOn: string
  category?: string
  slug?: string
  tags?: string[]
  image?: string
}

// Full note with additional metadata
export type NoteWithFullMetadata = {
  note: Partial<Note>
  backlinks?: {
    title: string
    url: string
    type: string
  }[]
  series?: {
    seriesTitle: string
    notes: {
      title: string
      slug: string
      status: "draft" | "published"
      isCurrent: boolean
    }[]
  }
}

// Note with metadata for preview lists (combines preview + metadata)
export type NoteWithMetadata = {
  note: NotePreview
  backlinks?: {
    title: string
    url: string
    type: string
  }[]
  series?: {
    seriesTitle: string
    notes: {
      title: string
      slug: string
      status: "draft" | "published"
      isCurrent: boolean
    }[]
  }
}
