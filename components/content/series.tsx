"use client"

import React, { FC, ReactNode } from "react"
import Link from "next/link"
import { getSeries } from "@/lib/content"
import { cn } from "@/lib/utils"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"

type TitleProps = {
  children?: ReactNode
}

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <div>
      <div className="font-sans text-base text-foreground">series</div>
      <div className="flex flex-col justify-start text-base sm:flex-row sm:items-center sm:space-x-2">
        {children}
      </div>
    </div>
  )
}

export const Series = ({
  series,
  interactive,
}: {
  series: NonNullable<ReturnType<typeof getSeries>>
  interactive?: boolean
  current: string
}) => {
  const [isOpen, setIsOpen] = React.useState(!interactive)
  const index = series.notes?.findIndex((note) => note?.isCurrent) + 1

  return (
    <>
      {interactive ? (
        <button
          className="group flex w-full items-center text-left"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <Title>
            <span className="font-medium">{series?.seriesTitle}</span>
            <span className="hidden sm:inline-block">&middot;</span>
            <span className="text-base text-foreground">
              {index} of {series.notes?.length}
            </span>
          </Title>

          <div className="ml-auto pl-4">
            <div className="rounded-full bg-muted p-2 text-foreground group-hover:bg-muted/70">
              {isOpen ? (
                <FiChevronUp className="w-4" />
              ) : (
                <FiChevronDown className="w-4" />
              )}
            </div>
          </div>
        </button>
      ) : (
        <Title>{series.seriesTitle}</Title>
      )}
      <hr className="border-t-1 my-4 border-border" />
      {isOpen && (
        <div>
          <ul className="text-base">
            {series.notes?.map((note) => (
              <li
                key={note.slug}
                className={cn(
                  "relative my-3 pl-7 before:absolute before:left-1 before:top-[9px] before:size-1.5 before:rounded-full",
                  {
                    "before:bg-background/10 before:ring-[3px] before:ring-primary before:ring-offset-1 before:ring-offset-background/10":
                      note.isCurrent,
                    "before:bg-muted-foreground":
                      note.status === "published" && !note.isCurrent,
                    "before:bg-border/70": note.status !== "published",
                  }
                )}
              >
                {note.status === "published" ? (
                  note.isCurrent ? (
                    <span className="text-foreground">{note.title}</span>
                  ) : (
                    <Link
                      href={`/notes/${note.slug}`}
                      className={cn("text-primary transition-all")}
                    >
                      {note.title}
                    </Link>
                  )
                ) : (
                  <Link
                    href={`/notes/${note.slug}`}
                    className={cn("text-foreground/50 transition-all")}
                  >
                    Planned: {note.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <hr className="border-t-1 my-4 border-border" />
        </div>
      )}
    </>
  )
}
