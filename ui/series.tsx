"use client"

import React, { FC, ReactNode } from "react"
import Link from "next/link"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

import { getSeries } from "@/lib/content"
import { cn } from "@/lib/utils"

import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "../lib/constants"

type TitleProps = {
  children?: ReactNode
}

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <div>
      <div className="font-heading text-sm text-black/50 dark:text-white/50">
        series
      </div>
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
    <div className="shadow-surface-elevation-low rounded bg-black/10 p-5 dark:bg-white/10 lg:px-8 lg:py-7">
      {interactive ? (
        <button
          className="items center group flex w-full text-left"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <Title>
            {series?.title}
            <span className="font-medium text-black/50 dark:text-white/50">
              {" "}
              &middot; {index} of {series.posts?.length}
            </span>
          </Title>

          <div className="ml-auto pl-4">
            <div className="rounded-full bg-black/10 p-2 text-black group-hover:bg-black/25 dark:bg-white/10 dark:text-white dark:group-hover:bg-white/25">
              {isOpen ? (
                <ChevronUpIcon className="w-5" />
              ) : (
                <ChevronDownIcon className="w-5" />
              )}
            </div>
          </div>
        </button>
      ) : (
        <Title>{series.title}</Title>
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
          <hr className="my-5 border-t-2 border-black/5 dark:border-white/5" />

          <ul className="text-base">
            {series.posts?.map((post) => (
              <li
                key={post.slug}
                className={cn(
                  "relative my-3 pl-7 before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full",
                  {
                    "before:ring-light-yellow-300/20 before:bg-black/90 before:ring-[3px] before:ring-offset-1 before:ring-offset-white/10 dark:before:bg-white/90 dark:before:ring-offset-black/10":
                      post.isCurrent,
                    "before:bg-black/30 dark:before:bg-white/30":
                      post.status === "published" && !post.isCurrent,
                    "before:bg-black/10 dark:before:bg-white/10":
                      post.status !== "published",
                  },
                )}
              >
                {post.status === "published" ? (
                  post.isCurrent ? (
                    <span className="text-black/90 dark:text-white/90">
                      {post.title}
                    </span>
                  ) : (
                    <Link
                      href={`/blog/${post.slug}`}
                      className={cn(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
                    >
                      {post.title}
                    </Link>
                  )
                ) : (
                  <span className="text-black/40 dark:text-black/40">
                    {post.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}
