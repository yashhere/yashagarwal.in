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
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              variant="nav"
            >
              {entry.name}
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                {entry.count}
              </span>
            </Link>
          )
        })}
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {taxonomyCounts.length}{" "}
          {taxonomyCounts.length === 1 ? singular : plural} across {totalPosts}{" "}
          posts
        </p>
      </div>
    </div>
  )
}
