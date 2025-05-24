import { Metadata, ResolvingMetadata } from "next"
import { NotesList } from "@/components/content/all-notes"
import Section from "@/components/ui/section"
import { generateTaxonomyMetadata, getNotesWithTaxonomy } from "@/lib/taxonomy"

type Props = {
  params: Promise<{ category: string }>
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params
  return generateTaxonomyMetadata("categories", params.category)
}

export default async function Page(props: Props) {
  const params = await props.params
  const { notes: notesWithCategory, displayName } = await getNotesWithTaxonomy(
    "categories",
    params.category
  )

  return (
    <>
      <Section data={notesWithCategory} title={displayName}>
        {notesWithCategory.length !== 0 ? (
          <NotesList notes={notesWithCategory} noSearchBox />
        ) : (
          <p>No notes found for category {displayName}</p>
        )}
      </Section>
    </>
  )
}
