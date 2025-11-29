"use client"

import { useState } from "react"
import {
  ArrowDownIcon,
  ArticleNyTimesIcon,
} from "@phosphor-icons/react/dist/ssr"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import Link from "../ui/link"

export const TableOfContents = ({
  headings,
  interactive,
  className,
  onItemClick,
}: {
  headings: any[]
  interactive?: boolean
  className?: string
  onItemClick?: () => void
}) => {
  const [isOpen, setIsOpen] = useState(!interactive)

  const handleHeadingClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault()

    const scrollToHeading = () => {
      const element = document.getElementById(slug)
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
        // Update URL without triggering navigation
        window.history.pushState(null, "", `#${slug}`)
      }
    }

    if (onItemClick) {
      onItemClick()
      // Small delay to allow drawer to close/body scroll to unlock
      setTimeout(scrollToHeading, 350)
    } else {
      scrollToHeading()
    }
  }

  return (
    <div
      className={cn(
        "border-border bg-background rounded-md border p-2.5 text-sm",
        className
      )}
    >
      {interactive ? (
        <button
          className="group flex w-full items-center justify-between text-left"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="toc-content"
        >
          <div className="flex items-center gap-1.5">
            <ArticleNyTimesIcon className="text-muted-foreground h-3 w-3" />
            <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
              On this page
            </span>
          </div>
          <motion.span
            className="text-muted-foreground group-hover:text-foreground flex h-5 w-5 items-center justify-center rounded-md transition-colors hover:cursor-pointer"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ArrowDownIcon size={14} />
          </motion.span>
        </button>
      ) : (
        <div className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          On this page
        </div>
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="toc-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.2, delay: 0.1, ease: "easeOut" },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.25, ease: "easeInOut", delay: 0.05 },
                opacity: { duration: 0.15, ease: "easeIn" },
              },
            }}
            className="border-border mt-2 space-y-0.5 overflow-hidden border-t pt-2"
          >
            {headings.map((heading, index) => (
              <motion.div
                key={heading.slug}
                initial={{ y: -10, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: {
                    delay: 0.15 + index * 0.03,
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  y: -10,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                    ease: "easeIn",
                  },
                }}
                style={{
                  paddingLeft: `${(heading.heading - 1) * 0.5}rem`,
                }}
                className="flex items-start gap-2 text-sm"
              >
                <Link
                  href={`#${heading.slug}`}
                  className="hover:text-primary text-muted-foreground block py-0.5 transition-colors"
                  variant="nav"
                  onClick={(e) => handleHeadingClick(e, heading.slug)}
                >
                  {heading.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
