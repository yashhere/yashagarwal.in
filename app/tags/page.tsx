import Link from "@/components/ui/link"
import { allPosts } from "contentlayer/generated"
import GithubSlugger from "github-slugger"

export default function Page() {
  const allTags: string[] = []
  allPosts.map((post) => post.tags && allTags.push(...post.tags))

  var tagCounts = Array.from(new Set(allTags)).map((tagName) => ({
    tag: tagName,
    count: allTags.filter((f) => f === tagName).length,
  }))

  return (
    <>
      <h1 className="leading-extra-tight pb-8 font-heading text-5xl font-bold lg:text-[96px]">
        Tags
      </h1>
      <div className="text-md mt-2 flex flex-wrap justify-start font-body font-semibold text-gray-600 sm:text-lg">
        {tagCounts.map((tagEntry) => {
          const slugger = new GithubSlugger()
          const tag = tagEntry.tag
          const tag_slug = tag ? slugger.slug(tag) : undefined

          return (
            <div className="ml-4 mt-4 inline-flex items-center rounded-full bg-muted px-3 py-1 text-lg font-bold normal-case leading-7 text-text">
              <Link
                key={tag_slug}
                href={`/tags/${tag_slug}`}
                className="mr-2 text-primary"
              >
                {tag} ({tagEntry.count})
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
