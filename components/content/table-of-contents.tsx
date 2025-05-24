"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react/dist/ssr"

import Link from "../ui/link"

export const TableOfContents = ({ headings, interactive }) => {
  const [isOpen, setIsOpen] = useState(!interactive)

  return (
    <div className="rounded-md border border-border bg-background p-2.5 text-sm">
      {interactive ? (
        <button
          className="group flex w-full items-center justify-between text-left"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="toc-content"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Contents
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-colors group-hover:text-foreground">
            {isOpen ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
          </span>
        </button>
      ) : (
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Contents
        </div>
      )}

      {isOpen && (
        <div
          id="toc-content"
          className="mt-2 space-y-0.5 pt-2 border-t border-border"
        >
          {headings.map((heading) => (
            <div
              key={heading.slug}
              style={{
                paddingLeft: `${(heading.heading - 1) * 0.5}rem`,
              }}
              className="line-clamp-1 text-sm"
            >
              <Link
                href={`#${heading.slug}`}
                className="block py-0.5 text-muted-foreground hover:text-primary transition-colors"
                variant="nav"
              >
                {heading.text}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
