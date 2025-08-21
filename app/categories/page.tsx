import CategoryBrowser from "@/components/content/category-browser"
import Section from "@/components/ui/section"
import {
  generateTaxonomyListMetadata,
  getTaxonomyCounts,
  getTotalItemizedPosts,
} from "@/lib/taxonomy"

export const metadata = generateTaxonomyListMetadata("categories")

export default async function Page() {
  const categoryCounts = await getTaxonomyCounts("categories")
  const totalCategorizedPosts = getTotalItemizedPosts("categories")

  // Transform to match CategoryBrowser interface
  const formattedCategoryCounts = categoryCounts.map((item) => ({
    category: item.name,
    count: item.count,
  }))

  return (
    <>
      <Section data={formattedCategoryCounts} title="Categories">
        <CategoryBrowser
          categoryCounts={formattedCategoryCounts}
          totalCategorizedPosts={totalCategorizedPosts}
        />
      </Section>
    </>
  )
}
