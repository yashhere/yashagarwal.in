import { Metadata } from "next"
import Link from "@/components/ui/link"
import { siteConfig } from "@/config/site"
import { allPosts } from "contentlayer/generated"
import GithubSlugger from "github-slugger"

export const metadata: Metadata = {
  title: "Tags | Yash Agarwal",
  description: "Tag cloud for /dev/yash/notes.",
  alternates: {
    canonical: `${siteConfig.url}/tags`,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
    },
  },
}

export default function Page() {
  const allTags: string[] = []
  allPosts.map((post) => post.tags && allTags.push(...post.tags))

  var tagCounts = Array.from(new Set(allTags)).map((tagName) => ({
    tag: tagName,
    count: allTags.filter((f) => f === tagName).length,
  }))

  for (let i = tagCounts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[tagCounts[i], tagCounts[j]] = [tagCounts[j], tagCounts[i]]
  }

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
            <div className="ml-4 mt-4 inline-flex items-center rounded-full bg-muted px-3 py-1 text-lg font-bold normal-case leading-7">
              <Link
                key={tag_slug}
                href={`/tags/${tag_slug}`}
                className="mr-2 text-text hover:text-primary"
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
