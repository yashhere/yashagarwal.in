import TaxonomyBrowser from "../ui/taxonomoy"

interface CategoryEntry {
  category: string
  count: number
}

interface CategoryBrowserProps {
  categoryCounts: CategoryEntry[]
  totalCategorizedPosts: number
}

export default function CategoryBrowser({
  categoryCounts,
  totalCategorizedPosts,
}: CategoryBrowserProps) {
  // Transform to match TaxonomyBrowser interface
  const taxonomyCounts = categoryCounts.map((item) => ({
    name: item.category,
    count: item.count,
  }))

  return (
    <TaxonomyBrowser
      taxonomyCounts={taxonomyCounts}
      totalPosts={totalCategorizedPosts}
      type="categories"
      singular="category"
      plural="categories"
    />
  )
}
