import { BlogPostList } from "@/components/blog-list"
import { getPreviewPosts } from "@/lib/content"
import GithubSlugger from "github-slugger"

type Props = {
  params: { tag: string }
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

  return (
    <>
      <section className="pb-8">
        <h1 className="leading-extra-tight pb-8 font-heading text-5xl font-bold lg:text-[96px]">
          {tagName}
        </h1>
      </section>
      <BlogPostList articles={postsWithTag} noSearchBox />
    </>
  )
}
