import { Metadata } from "next"
import { BlogPostList } from "@/components/blog-list"
import { getPreviewPosts } from "@/lib/content"

export const metadata: Metadata = {
  title: "Writing | Yash Agarwal",
  description:
    "Search through the thoughts I have dumped in this vast ocean of knowledge.",
}

export default async function Page() {
  const articles = await getPreviewPosts()

  return (
    <>
      <section className="pb-8">
        <h1 className="leading-extra-tight pb-8 font-heading text-5xl font-bold lg:text-[96px]">
          Blog
        </h1>
        <div className="text-lg text-text">
          <p>
            Since April 2016, I&apos;ve penned {articles.length} articles across
            diverse categories. From tech knowledge and life updates to year
            reviews and travelogues, there&apos;s a little something on every
            topic.
          </p>
        </div>
      </section>
      <BlogPostList articles={articles} />
    </>
  )
}
