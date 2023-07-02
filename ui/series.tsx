"use client"

import React, { FC, ReactNode } from "react"
import cx from "clsx"
import Link from "next/link"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { FOCUS_VISIBLE_OUTLINE, LINK_STYLES } from "../lib/constants"
import { motion } from "framer-motion"
import { getSeries } from "@/lib/content"

type TitleProps = {
  children?: ReactNode
}

const Title: FC<TitleProps> = ({ children }) => {
  return (
    <div>
      <div className="text-sm font-heading text-black/50">series</div>
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
    <div className="rounded bg-black/10 p-5 shadow-surface-elevation-low lg:px-8 lg:py-7">
      {interactive ? (
        <button
          className="group flex w-full items center text-left"
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <Title>
            {series?.title}
            <span className="font-medium text-black/50">
              {" "}
              &middot; {index} of {series.posts?.length}
            </span>
          </Title>

          <div className="ml-auto pl-4">
            <div className="rounded-full bg-black/10 p-2 text-black group-hover:bg-black/25">
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
          <hr className="my-5 border-t-2 border-black/5" />

          <ul className="text-base">
            {series.posts?.map((post) => (
              <li
                key={post.slug}
                className={cx(
                  "relative my-3 pl-7 before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full",
                  {
                    "before:bg-black/90 before:ring-[3px] before:ring-light-yellow-300/20 before:ring-offset-1 before:ring-offset-white/10":
                      post.isCurrent,
                    "before:bg-black/30":
                      post.status === "published" && !post.isCurrent,
                    "before:bg-black/10": post.status !== "published",
                  },
                )}
              >
                {post.status === "published" ? (
                  post.isCurrent ? (
                    <span className="text-black/90">{post.title}</span>
                  ) : (
                    <Link
                      href={`/blog/${post.slug}`}
                      className={cx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
                    >
                      {post.title}
                    </Link>
                  )
                ) : (
                  <span className="text-black/40">{post.title}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}
