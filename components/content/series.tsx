"use client"

import React from "react"
import { getSeries } from "@/lib/content"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react/dist/ssr"

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
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Series
            </span>
            <span className="font-medium text-foreground text-sm">
              {series.seriesTitle}{" "}
              <span className="text-muted-foreground font-normal">
                ({index}/{series.notes?.length})
              </span>
            </span>
          </div>

          <span className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-colors group-hover:text-foreground">
            {isOpen ? <ArrowUpIcon size={14} /> : <ArrowDownIcon size={14} />}
          </span>
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

      {isOpen && (
        <div className="mt-2 pt-2 border-t border-border space-y-0.5">
          <ul className="space-y-1">
            {series.notes?.map((note) => (
              <li
                key={note.slug}
                className={cn(
                  "relative pl-4 before:absolute before:left-0 before:top-[7px] before:size-1 before:rounded-full",
                  {
                    "before:bg-primary": note.isCurrent,
                    "before:bg-muted-foreground":
                      note.status === "published" && !note.isCurrent,
                    "before:bg-border/70": note.status !== "published",
                  }
                )}
              >
                {note.status === "published" ? (
                  note.isCurrent ? (
                    <span className="text-foreground text-sm">
                      {note.title}
                    </span>
                  ) : (
                    <Link
                      href={`/notes/${note.slug}`}
                      className="text-primary hover:underline transition-all text-sm"
                      variant="nav"
                    >
                      {note.title}
                    </Link>
                  )
                ) : (
                  <span className="text-muted-foreground text-sm">
                    Planned: {note.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
