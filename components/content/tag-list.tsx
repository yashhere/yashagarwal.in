import { FC } from "react"
import GithubSlugger from "github-slugger"

import { Heading } from "../ui/heading"
import Link from "../ui/link"

type TagListProps = {
  tags: string[]
}

export const TagList: FC<TagListProps> = ({ tags }) => {
  if (!tags || (tags && tags.length === 0)) {
    return null
  }

  return (
    <div className="flex flex-col my-8 space-y-4">
      <Heading level="h2">Keywords:</Heading>
      <div className="flex flex-wrap items-center gap-2">
        {tags.map((tag) => {
          const slugger = new GithubSlugger()
          const tag_slug = tag ? slugger.slug(tag) : undefined
          return (
            <Link
              key={tag_slug}
              href={`/tags/${tag_slug}`}
              className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground/80 transition-colors hover:bg-muted/80 hover:text-foreground"
              noUnderline
            >
              {tag}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
