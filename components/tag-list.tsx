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
    <div className="-mx-2 flex flex-row flex-wrap justify-start gap-4 font-sans text-gray-1100">
      {tags.map((tag) => {
        const slugger = new GithubSlugger()
        const tag_slug = tag ? slugger.slug(tag) : undefined
        return (
          <Link
            noUnderline
            key={tag_slug}
            href={`/tags/${tag_slug}`}
            className="items-center rounded-3xl px-2 py-[0.5px] text-sm text-gray-1100 hover:bg-[#F5F4F4] dark:hover:bg-gray-200"
          >
            {tag}
          </Link>
        )
      })}
    </div>
  )
}
