import { FC } from "react"
import { TagSimpleIcon } from "@phosphor-icons/react/dist/ssr"
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
    <div className="rounded-md border border-border bg-background p-2.5 text-sm my-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <TagSimpleIcon className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Tags ({tags.length})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border">
          {tags.map((tag) => {
            const slugger = new GithubSlugger()
            const tag_slug = tag ? slugger.slug(tag) : undefined
            return (
              <Link
                key={tag_slug}
                href={`/tags/${tag_slug}`}
                className="inline-flex items-center rounded-md bg-muted/50 px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                variant="clean"
              >
                {tag}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
