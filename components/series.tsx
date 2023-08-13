"use client"

import React, { FC, ReactNode } from "react"
import Link from "next/link"
import { getSeries } from "@/lib/content"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

type TitleProps = {
  children?: ReactNode
}

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <div>
      <div className="font-heading text-base text-text">series</div>
      <div className="flex flex-col justify-start text-lg sm:flex-row sm:items-center sm:space-x-2">
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
    <div>
      {interactive ? (
        <button
          className="group flex w-full items-center text-left"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <Title>
            <span className="font-bold">{series?.seriesTitle}</span>
            <span className="hidden sm:inline-block">&middot;</span>
            <span className="text-base text-text">
              {index} of {series.notes?.length}
            </span>
          </Title>

          <div className="ml-auto pl-4">
            <div className="rounded-full bg-gray-600/10 p-2 text-text group-hover:bg-gray-600/25">
              {isOpen ? (
                <ChevronUpIcon className="w-5" />
              ) : (
                <ChevronDownIcon className="w-5" />
              )}
            </div>
          </div>
        </button>
      ) : (
        <Title>{series.seriesTitle}</Title>
      )}
      <hr className="border-t-1 my-4 border-gray-300/60" />
      {isOpen && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          variants={{
            open: {
              opacity: 1,
              height: "auto",
            },
            collapsed: {
              opacity: 0,
              height: 0,
            },
          }}
        >
          <ul className="text-lg">
            {series.notes?.map((note) => (
              <li
                key={note.slug}
                className={cn(
                  "relative my-3 pl-7 before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full",
                  {
                    "before:bg-gray-100/10 before:ring-[3px] before:ring-primary before:ring-offset-1 before:ring-offset-gray-100/10":
                      note.isCurrent,
                    "before:bg-gray-600":
                      note.status === "published" && !note.isCurrent,
                    "before:bg-gray-300/70": note.status !== "published",
                  }
                )}
              >
                {note.status === "published" ? (
                  note.isCurrent ? (
                    <span className="text-text">{note.title}</span>
                  ) : (
                    <Link
                      href={`/notes/${note.slug}`}
                      className={cn("font-medium text-primary transition-all")}
                    >
                      {note.title}
                    </Link>
                  )
                ) : (
                  <Link
                    href={`/notes/${note.slug}`}
                    className={cn("font-medium text-text/50 transition-all")}
                  >
                    Planned: {note.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <hr className="border-t-1 my-4 border-gray-300/60" />
        </motion.div>
      )}
    </div>
  )
}
