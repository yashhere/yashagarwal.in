import { FC } from "react"
import { TagChevronIcon } from "@phosphor-icons/react/dist/ssr"
import GithubSlugger from "github-slugger"

import Link from "../ui/link"

type TagListProps = {
  tags: string[]
}

export const TagList: FC<TagListProps> = ({ tags }) => {
  if (!tags || (tags && tags.length === 0)) {
    return null
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
          {tags.map((tag) => {
            const slugger = new GithubSlugger()
            const tag_slug = tag ? slugger.slug(tag) : undefined
            return (
              <Link
                key={tag_slug}
                href={`/tags/${tag_slug}`}
                className="bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center rounded-md px-2 py-1 text-xs font-medium transition-colors"
                variant="nav"
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
