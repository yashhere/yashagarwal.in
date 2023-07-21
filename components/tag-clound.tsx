"use client"

import GithubSlugger from "github-slugger"

import Link from "./ui/link"

export default function TagCloud({ tagCounts }) {
  for (let i = tagCounts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tagCounts[i], tagCounts[j]] = [tagCounts[j], tagCounts[i]]
  }

  return (
    <div className="text-md mt-2 flex flex-wrap justify-start font-body font-semibold text-gray-600 sm:text-lg">
      {tagCounts.map((tagEntry) => {
        const slugger = new GithubSlugger()
        const tag = tagEntry.tag
        const tag_slug = tag ? slugger.slug(tag) : undefined

        return (
          <div
            key={tag_slug}
            className="ml-4 mt-4 inline-flex items-center rounded-full bg-muted px-3 py-1 text-lg font-bold normal-case leading-7"
          >
            <Link
              href={`/tags/${tag_slug}`}
              className="mr-2 text-text hover:text-primary"
            >
              {tag} ({tagEntry.count})
            </Link>
          </div>
        )
      })}
    </div>
  )
}
