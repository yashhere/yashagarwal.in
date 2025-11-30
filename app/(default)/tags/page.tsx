import Section from "@/components/ui/section"
import TaxonomyBrowser from "@/components/ui/taxonomoy"
import {
  generateTaxonomyListMetadata,
  getTaxonomyCounts,
  getTotalItemizedPosts,
} from "@/lib/taxonomy"

export const metadata = generateTaxonomyListMetadata("tags")

export default function Page() {
  const tagCounts = getTaxonomyCounts("tags")
  const totalTaggedPosts = getTotalItemizedPosts("tags")

  return (
    <>
      <Section data={tagCounts} title="Tags">
        <TaxonomyBrowser
          taxonomyCounts={tagCounts}
          totalPosts={totalTaggedPosts}
          type="tags"
          singular="tag"
          plural="tags"
        />
      </Section>
    </>
  )
}
