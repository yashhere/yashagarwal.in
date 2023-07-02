import { getAllViewsCount } from "@/lib/db"
import { BlogPostList } from "@/ui/post/blog-list"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Writing | Yash Agarwal",
  description:
    "Search through the thoughts I have dumped in this vast ocean of knowledge.",
}

export default async function Page() {
  const allViews = await getAllViewsCount()
  const posts = allPosts
    .filter((p) => p.status === "published")
    .sort((a, b) => {
      return compareDesc(new Date(a.published), new Date(b.published))
    })

  return (
    <>
      <section className="pb-8">
        <h1 className="text-5xl lg:text-[96px] font-heading font-bold leading-extra-tight pb-8">
          Blog
        </h1>
        <p className="text-black/80 text-lg">
          I&apos;ve written {posts?.length} articles since I started this blog
          in November 2022. My writing isn&apos;t just related to coding. I also
          try to write about the tricks I&apos;ve learned to manage my ADHD and
          psoriatic arthritis to (sorta) function as an adult.
        </p>
      </section>
      <BlogPostList allViews={allViews} posts={posts} />
    </>
  )
}
