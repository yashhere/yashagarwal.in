"use client"

import { useState } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArticleNyTimesIcon,
} from "@phosphor-icons/react/dist/ssr"
import { AnimatePresence, motion } from "motion/react"

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
          <div className="flex items-center gap-1.5">
            <ArticleNyTimesIcon className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              On this page
            </span>
          </div>
          <motion.span
            className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-colors group-hover:text-foreground hover:cursor-pointer"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ArrowDownIcon size={14} />
          </motion.span>
        </button>
      ) : (
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
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
            className="mt-2 space-y-0.5 pt-2 border-t border-border overflow-hidden"
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
                  className="block py-0.5 hover:text-primary   text-muted-foreground transition-colors"
                  variant="nav"
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
