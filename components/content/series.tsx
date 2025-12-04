"use client"

import React from "react"
import { CaretDownIcon, ListNumbersIcon } from "@phosphor-icons/react/dist/ssr"

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

          <span
            className={cn(
              "text-muted-foreground group-hover:text-foreground flex h-5 w-5 items-center justify-center rounded-md transition-all duration-200 hover:cursor-pointer",
              isOpen && "rotate-180"
            )}
          >
            <CaretDownIcon size={16} weight="bold" />
          </span>
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

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div
            id="series-content"
            className={cn(
              "border-border mt-2 space-y-0.5 border-t pt-2 transition-opacity duration-200",
              isOpen ? "opacity-100" : "opacity-0"
            )}
          >
            {series.notes?.map((note) => (
              <div key={note.slug} className="flex items-start gap-2 text-sm">
                <div
                  className={cn("mt-2.5 size-1 shrink-0 rounded-full", {
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
