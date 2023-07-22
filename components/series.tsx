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
      <div className="font-heading text-lg text-text">series</div>
      <div className="text-lg font-bold">{children}</div>
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
  const index = series.posts?.findIndex((post) => post?.isCurrent) + 1

  return (
    <div className="shadow-surface-elevation-low rounded bg-muted px-5 py-4 lg:px-8 lg:py-5">
      {interactive ? (
        <button
          className="items center group flex w-full items-center text-left"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <Title>
            {series?.seriesTitle}
            <span className="font-medium text-text">
              {" "}
              &middot; {index} of {series.posts?.length}
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
          <hr className="my-5 border-t-2 border-gray-600/30" />

          <ul className="text-base">
            {series.posts?.map((post) => (
              <li
                key={post.slug}
                className={cn(
                  "relative my-3 pl-7 before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full",
                  {
                    "before:bg-gray-100/10 before:ring-[3px] before:ring-primary before:ring-offset-1 before:ring-offset-gray-100/10":
                      post.isCurrent,
                    "before:bg-gray-600":
                      post.status === "published" && !post.isCurrent,
                    "before:bg-gray-300/70": post.status !== "published",
                  }
                )}
              >
                {post.status === "published" ? (
                  post.isCurrent ? (
                    <span className="text-text">{post.title}</span>
                  ) : (
                    <Link
                      href={`/blog/${post.slug}`}
                      className={cn("font-medium text-primary transition-all")}
                    >
                      {post.title}
                    </Link>
                  )
                ) : (
                  <span className="text-text/50">Planned: {post.title}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}
