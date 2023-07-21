import { Metadata, ResolvingMetadata } from "next"
import { BlogPostList } from "@/components/blog-list"
import { siteConfig } from "@/config/site"
import { getPreviewPosts } from "@/lib/content"
import GithubSlugger from "github-slugger"

type Props = {
  params: { tag: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const siteUrl: string = siteConfig.url

  // access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${params.tag} | Yash Agarwal`,
    description: `All posts related to ${params.tag}`,
    authors: {
      name: "Yash Agarwal",
      url: siteUrl,
    },
    keywords: `${params.tag}`,
    creator: "Yash Agarwal",
    alternates: {
      canonical: `${siteConfig.url}/tags/${params.tag}`,
      types: {
        "application/rss+xml": [
          { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
          { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
        ],
      },
    },
  }
}

export default async function Page({ params }: Props) {
  const slugger = new GithubSlugger()
  const previewPosts = await getPreviewPosts()

  const postsWithTag = previewPosts.filter((previewPost) => {
    slugger.reset()
    const tags = previewPost.post.tags
    if (!tags || tags.length == 0) {
      return false
    }
    return tags.map((tag) => slugger.slug(tag)).includes(params.tag)
  })

  // find un-slugified tag name
  const tagName = new Set<string[]>()
  postsWithTag.forEach((post) => {
    const tags = post.post.tags
    if (!tags || tags.length == 0) {
      return
    }

    tags.forEach((tag) => {
      slugger.reset()
      if (slugger.slug(tag) == params.tag) {
        tagName.add(tag)
      }
    })
  })

  if (tagName.size === 0) {
    tagName.add([params.tag])
  }

  return (
    <>
      <section className="pb-8">
        <h1 className="leading-extra-tight pb-8 font-heading text-5xl font-bold lg:text-[96px]">
          {tagName}
        </h1>
      </section>
      {postsWithTag.length !== 0 ? (
        <BlogPostList articles={postsWithTag} noSearchBox />
      ) : (
        <p>No posts found for tag {tagName}</p>
      )}
    </>
  )
}
