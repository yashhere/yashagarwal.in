import GithubSlugger from "github-slugger"

import { NotesList } from "@/components/content/all-notes"
import { BreadcrumbItem, Breadcrumbs } from "@/components/content/breadcrumbs"
import Section from "@/components/ui/section"
import { generateTagMetadata } from "@/lib/seo/metadata"
import { getNotesWithTaxonomy, getTaxonomyCounts } from "@/lib/taxonomy"

type Props = {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getTaxonomyCounts("tags")
  const slugger = new GithubSlugger()

  return tags.map((tag) => ({
    tag: slugger.slug(tag.name),
  }))
}

export async function generateMetadata(props: Props) {
  const params = await props.params
  const { notes: notesWithTag, displayName } = getNotesWithTaxonomy(
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
  const { notes: notesWithTag, displayName } = getNotesWithTaxonomy(
    "tags",
    params.tag
  )

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Tags", href: "/tags" },
    { label: displayName },
  ]

  return (
    <>
      <Section data={notesWithTag} title={displayName}>
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
        {notesWithTag.length !== 0 ? (
          <NotesList notes={notesWithTag} noSearchBox />
        ) : (
          <p>No notes found for tag {displayName}</p>
        )}
      </Section>
    </>
  )
}
