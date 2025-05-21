import { Metadata } from "next"
import { NotesList } from "@/components/content/all-notes"
import Section from "@/components/ui/section"
import { siteConfig } from "@/config/site"
import { getPreviewNotes } from "@/lib/content"

export const metadata: Metadata = {
  title: "Notes | Yash Agarwal",
  description:
    "Search through the thoughts I have dumped in this vast ocean of knowledge.",
  alternates: {
    canonical: `${siteConfig.url}/notes`,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
    },
  },
}

export default async function Page() {
  const notes = await getPreviewNotes()

  return (
    <Section data={notes} title="notes">
      <NotesList notes={notes} />
    </Section>
  )
}
