"use client"

import { useEffect, useState } from "react"
import GithubSlugger from "github-slugger"

import Link from "./ui/link"

export default function TagCloud({ tagCounts }) {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    // randomize the tags. Not needed for this component to work.
    for (let i = tagCounts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[tagCounts[i], tagCounts[j]] = [tagCounts[j], tagCounts[i]]
    }
    setHydrated(true)
  }, [tagCounts])

  return (
    <>
      {hydrated ? (
        <div className="text-md mt-2 flex flex-wrap justify-start font-body font-semibold text-gray-600 sm:text-lg">
          {tagCounts.map((tagEntry) => {
            const slugger = new GithubSlugger()
            const tag = tagEntry.tag
            const tag_slug = tag ? slugger.slug(tag) : undefined

            return (
              <div
                key={tag_slug}
                className="ml-4 mt-4 inline-flex items-center rounded-full border px-3 py-1 text-lg font-bold normal-case leading-7 text-text hover:bg-muted hover:text-primary"
              >
                <Link href={`/tags/${tag_slug}`}>
                  {tag} ({tagEntry.count})
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-lg font-semibold text-text">Loading ...</div>
      )}
    </>
  )
}
