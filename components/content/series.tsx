"use client"

import React from "react"
import { getSeries } from "@/lib/content"
import { cn } from "@/lib/utils"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ListNumbersIcon,
} from "@phosphor-icons/react/dist/ssr"
import { AnimatePresence, motion } from "framer-motion"

import Link from "../ui/link"

export const Series = ({
  series,
  interactive,
}: {
  series: NonNullable<ReturnType<typeof getSeries>>
  interactive?: boolean
}) => {
  const [isOpen, setIsOpen] = React.useState(!interactive)
  const index = series.notes?.findIndex((note) => note?.isCurrent) + 1

  return (
    <div className="rounded-md border border-border bg-background p-2.5 text-sm">
      {interactive ? (
        <button
          className="group flex w-full items-center justify-between text-left"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="series-content"
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <ListNumbersIcon className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Series
              </span>
            </div>
            <span className="font-medium text-foreground text-sm">
              {series.seriesTitle}{" "}
              <span className="text-muted-foreground font-normal">
                ({index}/{series.notes?.length})
              </span>
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
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Series
          </span>
          <span className="font-medium text-foreground text-sm">
            {series.seriesTitle}
          </span>
        </div>
      )}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="series-content"
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
            {series.notes?.map((note, index) => (
              <motion.div
                key={note.slug}
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
                className="flex items-start gap-2 text-sm"
              >
                <div
                  className={cn("mt-[10px] size-1 rounded-full flex-shrink-0", {
                    "bg-primary": note.isCurrent,
                    "bg-muted-foreground": !note.isCurrent,
                    "bg-muted-foreground/60": note.status !== "published",
                  })}
                />
                <div className="flex-1 min-w-0">
                  {note.status === "published" ? (
                    note.isCurrent ? (
                      <span className="block py-0.5 text-foreground">
                        {note.title}
                      </span>
                    ) : (
                      <Link
                        href={`/notes/${note.slug}`}
                        className="block py-0.5 text-muted-foreground hover:text-primary transition-colors"
                        variant="nav"
                      >
                        {note.title}
                      </Link>
                    )
                  ) : (
                    <span className="block py-0.5 text-muted-foreground/60">
                      Planned: {note.title}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
