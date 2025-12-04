import { BreadcrumbItem, Breadcrumbs } from "@/components/content/breadcrumbs"
import Section from "@/components/ui/section"
import TaxonomyBrowser from "@/components/ui/taxonomoy"
import { BreadcrumbStructuredData } from "@/lib/seo/structured-data"
import {
  generateTaxonomyListMetadata,
  getTaxonomyCounts,
  getTotalItemizedPosts,
} from "@/lib/taxonomy"

export const metadata = generateTaxonomyListMetadata("categories")

export default function Page() {
  const categoryCounts = getTaxonomyCounts("categories")
  const totalCategorizedPosts = getTotalItemizedPosts("categories")

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Categories" },
  ]

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
        ]}
      />
      <Section data={categoryCounts} title="Categories">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
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
