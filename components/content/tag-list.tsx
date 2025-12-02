"use client"

import { FC } from "react"
import { TagChevronIcon } from "@phosphor-icons/react/dist/ssr"
import GithubSlugger from "github-slugger"
import { motion, Variants } from "motion/react"

import Link from "../ui/link"

type TagListProps = {
  tags: string[]
}

export const TagList: FC<TagListProps> = ({ tags }) => {
  if (!tags || (tags && tags.length === 0)) {
    return null
  }

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    }),
  }

  return (
    <div className="border-border bg-background my-8 rounded-md border p-2.5 text-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <TagChevronIcon className="text-muted-foreground h-3 w-3" />
          <span className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
            Tags ({tags.length})
          </span>
        </div>

        <div className="border-border flex flex-wrap items-center gap-1.5 border-t pt-2">
          {tags.map((tag, idx) => {
            const slugger = new GithubSlugger()
            const tag_slug = tag ? slugger.slug(tag) : undefined
            return (
              <motion.div
                key={tag_slug}
                variants={item}
                custom={idx}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Link
                  href={`/tags/${tag_slug}`}
                  className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-colors"
                  variant="nav"
                >
                  {tag}
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
