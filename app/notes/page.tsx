import { Metadata } from "next"

import { NotesList } from "@/components/content/all-notes"
import Section from "@/components/ui/section"
import { getPreviewNotes } from "@/lib/content"
import { generatePageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = generatePageMetadata({
  title: "Notes Archive",
  description:
    "Browse through my collected thoughts and insights on various topics.",
  canonicalUrl: "/notes",
})

export default async function Page() {
  const notes = await getPreviewNotes()

  return (
    <Section data={notes} title="notes">
      <NotesList notes={notes} />
    </Section>
  )
}
