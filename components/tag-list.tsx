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
    <div className="text-md mt-2 flex flex-wrap justify-start font-body font-semibold text-gray-600 sm:text-lg">
      {tags.map((tag) => {
        const slugger = new GithubSlugger()
        const tag_slug = tag ? slugger.slug(tag) : undefined
        return (
          <>
            <Link
              key={tag_slug}
              href={`/tags/${tag_slug}`}
              className="mr-2 text-primary"
            >
              #{tag}
            </Link>
          </>
        )
      })}
    </div>
  )
}
