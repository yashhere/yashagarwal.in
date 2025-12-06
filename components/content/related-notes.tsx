import Link from "next/link"

import { getPartialNote } from "@/lib/content"
import { DecorativeHr } from "../ui/decorative-hr"
import { Heading } from "../ui/heading"

export async function RelatedNotes({
  relatedSlugs,
}: {
  relatedSlugs?: string[]
}) {
  if (!relatedSlugs || relatedSlugs.length === 0) {
    return null
  }

  // Fetch only the partial notes for the given slugs
  const relatedNotes = await Promise.all(
    relatedSlugs.map((slug) => getPartialNote(slug))
  )

  const validNotes = relatedNotes
    .filter((n) => n !== undefined)
    .map((n) => n!.note)

  if (validNotes.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <Heading level="h3" className="mb-4">
        Related Notes
      </Heading>
      <ul className="list-inside list-disc space-y-2">
        {validNotes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/notes/${note.slug}`}
              className="text-primary hover:text-primary/80 transition-colors hover:underline"
            >
              {note.title}
            </Link>
          </li>
        ))}
      </ul>
      <DecorativeHr className="mt-8" />
    </div>
  )
}
