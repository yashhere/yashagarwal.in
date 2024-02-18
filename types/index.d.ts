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
  comment: {
    repo: string
    repoId: string
    category: string
    categoryId: string
    lightTheme: string
    darkTheme: string
  }
  popularNotes: number
  recentNotes: number
}

export type NoteWithMetadata = {
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
