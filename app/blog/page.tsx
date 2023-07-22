import { Metadata } from "next"
import { BlogPostList } from "@/components/blog-list"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"
import { getPreviewPosts } from "@/lib/content"

export const metadata: Metadata = {
  title: "Writing | Yash Agarwal",
  description:
    "Search through the thoughts I have dumped in this vast ocean of knowledge.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
    },
  },
}

export default async function Page() {
  const articles = await getPreviewPosts()

  return (
    <>
      <section className="pb-8">
        <SectionTitle data={articles} title="Blog" />
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
