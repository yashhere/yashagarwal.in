import TaxonomyBrowser from "../ui/taxonomoy"

interface TagEntry {
  tag: string
  count: number
}

interface TagBrowserProps {
  tagCounts: TagEntry[]
  totalTaggedPosts: number
}

export default function TagBrowser({
  tagCounts,
  totalTaggedPosts,
}: TagBrowserProps) {
  // Transform to match TaxonomyBrowser interface
  const taxonomyCounts = tagCounts.map((item) => ({
    name: item.tag,
    count: item.count,
  }))

  return (
    <TaxonomyBrowser
      taxonomyCounts={taxonomyCounts}
      totalPosts={totalTaggedPosts}
      type="tags"
      singular="tag"
      plural="tags"
    />
  )
}
