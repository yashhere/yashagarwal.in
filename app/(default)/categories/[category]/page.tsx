import GithubSlugger from "github-slugger"

import { NotesList } from "@/components/content/all-notes"
import Section from "@/components/ui/section"
import { generateCategoryMetadata } from "@/lib/seo/metadata"
import { getNotesWithTaxonomy, getTaxonomyCounts } from "@/lib/taxonomy"

type Props = {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getTaxonomyCounts("categories")
  const slugger = new GithubSlugger()

  return categories.map((category) => ({
    category: slugger.slug(category.name),
  }))
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const { notes: notesWithCategory, displayName } = getNotesWithTaxonomy(
    "categories",
    params.category
  )

  return generateCategoryMetadata({
    name: displayName,
    slug: `/tags/${params.category}`,
    postCount: notesWithCategory.length,
  })
}

export default async function Page(props: Props) {
  const params = await props.params
  const { notes: notesWithCategory, displayName } = getNotesWithTaxonomy(
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
