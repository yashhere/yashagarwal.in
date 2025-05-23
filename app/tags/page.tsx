import { Metadata } from "next"
import TagCloud from "@/components/content/tag-browser"
import Section from "@/components/ui/section"
import { siteConfig } from "@/config/site"
import { allNotes } from "content-collections"

export const metadata: Metadata = {
  title: "Tags | Yash Agarwal",
  description: "Tag Browser for /dev/yash/notes.",
  alternates: {
    canonical: `${siteConfig.url}/tags`,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
    },
  },
}

export default function Page() {
  const allTags: string[] = []
  allNotes.map((note) => note.tags && allTags.push(...note.tags))

  const tagCounts = Array.from(new Set(allTags))
    .map((tagName) => ({
      tag: tagName,
      count: allTags.filter((f) => f === tagName).length,
    }))
    .sort((a, b) => {
      // Sort by count (descending), then alphabetically
      if (a.count !== b.count) {
        return b.count - a.count
      }
      return a.tag.localeCompare(b.tag)
    })

  // Calculate the number of unique posts that have tags (not total tag instances)
  const totalTaggedPosts = allNotes.filter(
    (note) => note.tags && note.tags.length > 0
  ).length

  return (
    <>
      <Section data={tagCounts} title="tags">
        <TagCloud tagCounts={tagCounts} totalTaggedPosts={totalTaggedPosts} />
      </Section>
    </>
  )
}
