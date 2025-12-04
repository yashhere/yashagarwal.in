import { Metadata } from "next"

import { NotesList } from "@/components/content/all-notes"
import { BreadcrumbItem, Breadcrumbs } from "@/components/content/breadcrumbs"
import Section from "@/components/ui/section"
import { getPreviewNotes } from "@/lib/content"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { BreadcrumbStructuredData } from "@/lib/seo/structured-data"

export const metadata: Metadata = generatePageMetadata({
  title: "Notes Archive",
  description:
    "Browse through my collected thoughts and insights on various topics.",
  canonicalUrl: "/notes",
})

export default function Page() {
  const notes = getPreviewNotes()

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Notes" },
  ]

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Notes", url: "/notes" },
        ]}
      />
      <Section data={notes} title="Notes">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        <NotesList notes={notes} />
      </Section>
    </>
  )
}
