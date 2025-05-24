import { NotesList } from "@/components/content/all-notes"
import Section from "@/components/ui/section"
import { generateTagMetadata } from "@/lib/seo/metadata"
import { getNotesWithTaxonomy } from "@/lib/taxonomy"

type Props = {
  params: Promise<{ tag: string }>
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const { notes: notesWithTag, displayName } = await getNotesWithTaxonomy(
    "tags",
    params.tag
  )
  return generateTagMetadata({
    name: displayName,
    slug: `/tags/${params.tag}`,
    postCount: notesWithTag.length,
  })
}

export default async function Page(props: Props) {
  const params = await props.params
  const { notes: notesWithTag, displayName } = await getNotesWithTaxonomy(
    "tags",
    params.tag
  )

  return (
    <>
      <Section data={notesWithTag} title={displayName}>
        {notesWithTag.length !== 0 ? (
          <NotesList notes={notesWithTag} noSearchBox />
        ) : (
          <p>No notes found for tag {displayName}</p>
        )}
      </Section>
    </>
  )
}
