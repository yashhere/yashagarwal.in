import Section from "@/components/ui/section"
import TaxonomyBrowser from "@/components/ui/taxonomoy"
import {
  generateTaxonomyListMetadata,
  getTaxonomyCounts,
  getTotalItemizedPosts,
} from "@/lib/taxonomy"

export const metadata = generateTaxonomyListMetadata("categories")

export default function Page() {
  const categoryCounts = getTaxonomyCounts("categories")
  const totalCategorizedPosts = getTotalItemizedPosts("categories")

  return (
    <>
      <Section data={categoryCounts} title="Categories">
        <TaxonomyBrowser
          taxonomyCounts={categoryCounts}
          totalPosts={totalCategorizedPosts}
          type="categories"
          singular="category"
          plural="categories"
        />
      </Section>
    </>
  )
}
