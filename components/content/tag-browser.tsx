"use client"

import { useEffect, useState } from "react"
import { TagSimpleIcon } from "@phosphor-icons/react/dist/ssr"
import GithubSlugger from "github-slugger"

import Link from "../ui/link"

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
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tagCounts.map((tagEntry) => {
          const slugger = new GithubSlugger()
          const tag = tagEntry.tag
          const tag_slug = tag ? slugger.slug(tag) : undefined

          return (
            <Link
              key={tag_slug}
              href={`/tags/${tag_slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              noUnderline
            >
              {tag}
              <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                {tagEntry.count}
              </span>
            </Link>
          )
        })}
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {tagCounts.length} tags across {totalTaggedPosts} posts
        </p>
      </div>
    </div>
  )
}
