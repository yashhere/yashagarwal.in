import { Metadata } from "next"
import { NotesList } from "@/components/all-notes"
import SectionTitle from "@/components/ui/section-title"
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
    <>
      <section>
        <SectionTitle data={notes} title="Notes" />
      </section>
      <NotesList notes={notes} />
    </>
  )
}
