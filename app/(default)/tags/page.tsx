import { BreadcrumbItem, Breadcrumbs } from "@/components/content/breadcrumbs"
import Section from "@/components/ui/section"
import TaxonomyBrowser from "@/components/ui/taxonomoy"
import { BreadcrumbStructuredData } from "@/lib/seo/structured-data"
import {
  generateTaxonomyListMetadata,
  getTaxonomyCounts,
  getTotalItemizedPosts,
} from "@/lib/taxonomy"

export const metadata = generateTaxonomyListMetadata("tags")

export default function Page() {
  const tagCounts = getTaxonomyCounts("tags")
  const totalTaggedPosts = getTotalItemizedPosts("tags")

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Tags" },
  ]

  return (
    <>
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Tags", url: "/tags" },
        ]}
      />
      <Section data={tagCounts} title="Tags">
        <Breadcrumbs items={breadcrumbItems} className="mb-6" />
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
