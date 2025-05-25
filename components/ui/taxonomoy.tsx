"use client"

import GithubSlugger from "github-slugger"

import Link from "../ui/link"

interface TaxonomyEntry {
  name: string
  count: number
}

interface TaxonomyBrowserProps {
  taxonomyCounts: TaxonomyEntry[]
  totalPosts: number
  type: "tags" | "categories"
  singular: string
  plural: string
}

export default function TaxonomyBrowser({
  taxonomyCounts,
  totalPosts,
  type,
  singular,
  plural,
}: TaxonomyBrowserProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {taxonomyCounts.map((entry) => {
          const slugger = new GithubSlugger()
          const slug = slugger.slug(entry.name)

          return (
            <Link
              key={slug}
              href={`/${type}/${slug}`}
              className="border-border bg-background text-muted-foreground hover:border-primary hover:text-primary inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors"
              variant="nav"
            >
              {entry.name}
              <span className="text-muted-foreground bg-muted rounded-full px-1.5 py-0.5 text-xs">
                {entry.count}
              </span>
            </Link>
          )
        })}
      </div>

      <div className="border-border border-t pt-4">
        <p className="text-muted-foreground text-center text-xs">
          {taxonomyCounts.length}{" "}
          {taxonomyCounts.length === 1 ? singular : plural} across {totalPosts}{" "}
          posts
        </p>
      </div>
    </div>
  )
}
