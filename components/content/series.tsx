"use client"

import React from "react"
import { ArrowDownIcon, ListNumbersIcon } from "@phosphor-icons/react/dist/ssr"
import { AnimatePresence, motion } from "motion/react"

import { getSeries } from "@/lib/content"
import { cn } from "@/lib/utils"
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
    <div className="border-border bg-background rounded-md border p-2.5 text-sm">
      {interactive ? (
        <button
          className="group flex w-full items-center justify-between text-left"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="series-content"
        >
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <ListNumbersIcon className="text-muted-foreground h-3 w-3" />
              <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Series
              </span>
            </div>
            <span className="text-foreground text-sm font-medium">
              {series.seriesTitle}{" "}
              <span className="text-muted-foreground font-normal">
                ({index}/{series.notes?.length})
              </span>
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
        <div className="flex flex-col gap-0.5">
          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Series
          </span>
          <span className="text-foreground text-sm font-medium">
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
            className="border-border mt-2 space-y-0.5 overflow-hidden border-t pt-2"
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
                  className={cn("mt-[10px] size-1 flex-shrink-0 rounded-full", {
                    "bg-primary": note.isCurrent,
                    "bg-muted-foreground": !note.isCurrent,
                    "bg-muted-foreground/60": note.status !== "published",
                  })}
                />
                <div className="min-w-0 flex-1">
                  {note.status === "published" ? (
                    note.isCurrent ? (
                      <span className="text-foreground block py-0.5">
                        {note.title}
                      </span>
                    ) : (
                      <Link
                        href={`/notes/${note.slug}`}
                        className="text-muted-foreground hover:text-primary block py-0.5 transition-colors"
                        variant="nav"
                      >
                        {note.title}
                      </Link>
                    )
                  ) : (
                    <span className="text-muted-foreground/60 block py-0.5">
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
