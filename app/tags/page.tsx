import TagBrowser from "@/components/content/tag-browser"
import Section from "@/components/ui/section"
import {
  generateTaxonomyListMetadata,
  getTaxonomyCounts,
  getTotalItemizedPosts,
} from "@/lib/taxonomy"

export const metadata = generateTaxonomyListMetadata("tags")

export default async function Page() {
  const tagCounts = await getTaxonomyCounts("tags")
  const totalTaggedPosts = getTotalItemizedPosts("tags")

  // Transform to match TagBrowser interface
  const formattedTagCounts = tagCounts.map((item) => ({
    tag: item.name,
    count: item.count,
  }))

  return (
    <>
      <Section data={formattedTagCounts} title="Tags">
        <TagBrowser
          tagCounts={formattedTagCounts}
          totalTaggedPosts={totalTaggedPosts}
        />
      </Section>
    </>
  )
}
