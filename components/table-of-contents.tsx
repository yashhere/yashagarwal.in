"use client"

import { FC, ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"

import Link from "./ui/link"

type TitleProps = {
  children?: ReactNode
}

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <div>
      <div className="text-lg font-bold">{children}</div>
    </div>
  )
}

export const TableOfContents = ({ headings, path, interactive }) => {
  const router = useRouter()
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
          <div className="font-heading text-lg font-bold">
            Table of Contents
          </div>

          <div className="ml-auto pl-4">
            <div className="rounded-full bg-muted p-2 text-foreground group-hover:bg-muted/70">
              {isOpen ? (
                <FiChevronUp className="w-5" />
              ) : (
                <FiChevronDown className="w-5" />
              )}
            </div>
          </div>
        </button>
      ) : (
        <div className="font-heading text-lg font-bold">Table of Contents</div>
      )}
      <hr className="border-t-1 my-4 border-border/60" />
      {isOpen && (
        <div>
          <div className="ml-2">
            {headings.map((heading) => (
              <div
                key={heading.slug}
                className={cn("my-3 line-clamp-1 sm:line-clamp-none", {
                  "ml-5": heading.heading === 2,
                  "ml-9": heading.heading === 3,
                  "ml-14": heading.heading === 4,
                })}
              >
                <Link
                  noUnderline
                  href={`#${heading.slug}`}
                  className="text-base text-foreground/80 hover:text-primary"
                >
                  {heading.text}
                </Link>
              </div>
            ))}
            <hr className="border-t-1 my-4 border-border/60" />
          </div>
        </div>
      )}
    </>
  )
}
