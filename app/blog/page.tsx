import { Metadata } from "next"
import { BlogPostList } from "@/ui/post/blog-list"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { getAllLikesCount, getAllViewsCount, getLikes } from "@/lib/db"

export const metadata: Metadata = {
  title: "Writing | Yash Agarwal",
  description:
    "Search through the thoughts I have dumped in this vast ocean of knowledge.",
}

export default async function Page() {
  const allViews = await getAllViewsCount()
  let allLikes = await getAllLikesCount()
  const posts = allPosts
    .filter((p) => p.status === "published")
    .sort((a, b) => {
      return compareDesc(new Date(a.published), new Date(b.published))
    })

  return (
    <>
      <section className="pb-8">
        <h1 className="leading-extra-tight pb-8 font-heading text-5xl font-bold lg:text-[96px]">
          Blog
        </h1>
        <div className="text-lg text-black/80 dark:text-white/80">
          <p>
            Since April 2016, I&apos;ve penned 47 captivating articles across
            diverse categories. From tech knowledge and life updates to year
            reviews and travelogues, there&apos;s a little something on every
            topic.
          </p>
        </div>
      </section>
      <BlogPostList allViews={allViews} allLikes={allLikes} posts={posts} />
    </>
  )
}
