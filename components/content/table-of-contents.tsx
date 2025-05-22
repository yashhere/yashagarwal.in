"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react/dist/ssr"

import Link from "../ui/link"

export const TableOfContents = ({ headings, interactive }) => {
  const [isOpen, setIsOpen] = useState(!interactive)

  return (
    <>
      {interactive ? (
        <button
          className="group flex w-full items-center text-left"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <div className="font-sans text-base font-medium">
            Table of Contents
          </div>

          <div className="ml-auto pl-4">
            <div className="rounded-full bg-muted p-2 text-foreground group-hover:bg-muted/70">
              {isOpen ? (
                <ArrowUpIcon className="w-4" />
              ) : (
                <ArrowDownIcon className="w-4" />
              )}
            </div>
          </div>
        </button>
      ) : (
        <div className="font-sans text-sm font-medium">Table of Contents</div>
      )}
      <hr className="border-t-1 my-4 border-border" />
      {isOpen && (
        <div>
          <div className="ml-2 space-y-1.5">
            {headings.map((heading) => (
              <div
                key={heading.slug}
                className={cn("line-clamp-1 sm:line-clamp-none", {
                  "ml-5": heading.heading === 2,
                  "ml-9": heading.heading === 3,
                  "ml-14": heading.heading === 4,
                })}
              >
                <Link
                  noUnderline
                  href={`#${heading.slug}`}
                  className="text-sm text-foreground/80 hover:text-primary"
                >
                  {heading.text}
                </Link>
              </div>
            ))}
            <hr className="border-t-1 mt-4 border-border" />
          </div>
        </div>
      )}
    </>
  )
}
