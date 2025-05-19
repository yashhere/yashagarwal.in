import { Metadata } from "next"
import TagCloud from "@/components/tag-cloud"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"
import { allNotes } from "content-collections"

export const metadata: Metadata = {
  title: "Tags | Yash Agarwal",
  description: "Tag cloud for /dev/yash/notes.",
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

  var tagCounts = Array.from(new Set(allTags)).map((tagName) => ({
    tag: tagName,
    count: allTags.filter((f) => f === tagName).length,
  }))

  return (
    <>
      <SectionTitle data={tagCounts} title="Tags" />
      <TagCloud tagCounts={tagCounts} />
    </>
  )
}
