import { FC } from "react"
import GithubSlugger from "github-slugger"

import Link from "./ui/link"

type TagListProps = {
  tags: string[]
}

export const TagList: FC<TagListProps> = ({ tags }) => {
  if (!tags || (tags && tags.length === 0)) {
    return null
  }

  return (
    <div className="mt-4 flex flex-row flex-wrap justify-start font-body text-base">
      {tags.map((tag) => {
        const slugger = new GithubSlugger()
        const tag_slug = tag ? slugger.slug(tag) : undefined
        return (
          <>
            <Link
              key={tag_slug}
              href={`/tags/${tag_slug}`}
              className="mb-2 mr-4 rounded text-primary"
            >
              {tag}
            </Link>
          </>
        )
      })}
    </div>
  )
}
