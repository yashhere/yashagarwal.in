import { Metadata } from "next"
import { allNotes } from "content-collections"
import GithubSlugger from "github-slugger"

import { getPreviewNotes } from "./content"
import { generatePageMetadata } from "./seo/metadata"

export type TaxonomyType = "tags" | "categories"

export interface TaxonomyCount {
  name: string
  count: number
}

export function generateTaxonomyListMetadata(
  type: "tags" | "categories"
): Metadata {
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1)

  return generatePageMetadata({
    title: `${typeLabel}`,
    description: `${typeLabel} Browser for /dev/yash/notes.`,
    canonicalUrl: `${type}`,
  })
}

export async function getTaxonomyCounts(
  type: TaxonomyType
): Promise<TaxonomyCount[]> {
  const allItems: string[] = []

  if (type === "tags") {
    allNotes.map((note) => note.tags && allItems.push(...note.tags))
  } else {
    allNotes.map((note) => note.category && allItems.push(note.category))
  }

  return Array.from(new Set(allItems))
    .map((itemName) => ({
      name: itemName,
      count: allItems.filter((f) => f === itemName).length,
    }))
    .sort((a, b) => {
      if (a.count !== b.count) {
        return b.count - a.count
      }
      return a.name.localeCompare(b.name)
    })
}

export function getTotalItemizedPosts(type: TaxonomyType): number {
  if (type === "tags") {
    return allNotes.filter((note) => note.tags && note.tags.length > 0).length
  } else {
    return allNotes.filter((note) => note.category).length
  }
}

export async function getNotesWithTaxonomy(type: TaxonomyType, slug: string) {
  const slugger = new GithubSlugger()
  const previewNotes = await getPreviewNotes()

  const filteredNotes = previewNotes.filter((item) => {
    if (type === "tags") {
      const tags = item.note.tags
      if (!tags || tags.length === 0) return false

      slugger.reset()
      return tags.map((tag) => slugger.slug(tag)).includes(slug)
    } else {
      const category = item.note.category
      if (!category) return false

      slugger.reset()
      return slugger.slug(category) === slug
    }
  })

  // Find display name
  const displayNames = new Set<string>()
  filteredNotes.forEach((item) => {
    if (type === "tags") {
      const tags = item.note.tags
      if (!tags || tags.length === 0) return

      tags.forEach((tag) => {
        slugger.reset()
        if (slugger.slug(tag) === slug) {
          displayNames.add(tag)
        }
      })
    } else {
      const category = item.note.category
      if (!category) return

      slugger.reset()
      if (slugger.slug(category) === slug) {
        displayNames.add(category)
      }
    }
  })

  const displayName =
    displayNames.size === 0 ? slug : Array.from(displayNames)[0]

  return { notes: filteredNotes, displayName }
}
