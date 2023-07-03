import { getPost, getSeries } from "@/lib/content"
import CustomMDXComponents from "@/ui/mdx"
import { TableOfContents } from "@/ui/post/table-of-contents"
import { Series } from "@/ui/series"
import { ViewCounter } from "@/ui/view-counter"
import { allPosts } from "contentlayer/generated"
import moment from "moment"
import { getMDXComponent } from "next-contentlayer/hooks"
import { Suspense } from "react"
import { getAllViewsCount } from "@/lib/db"
import { LoadingDots } from "@/ui/loading"
import { LikeButton2 } from "@/ui/like-button"

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug)

  return {
    title: `${post.title} | Yash Agarwal`,
    description: post.description,
    authors: {
      name: "Yash Agarwal",
      url: "https://yashagarwal.in",
    },
    keywords: post.tags?.map((tag) => tag.value),
    creator: "Yash Agarwal",
    twitter: {
      card: "summary_large_image",
      creator: "@yash__here",
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post: NonNullable<ReturnType<typeof getPost>> = getPost(slug)
  const Content = getMDXComponent(post.body.code)
  const allViews = await getAllViewsCount()

  return (
    <>
      <div className="space-y-4">
        <section>
          <h1 className="font-bold font-heading text-5xl sm:text-6xl leading-none relative max-w-4xl pb-2">
            {post.title}
          </h1>
          <div className="mt-2 flex space-x-2 text-md text-black/70 sm:text-lg font-body font-semibold">
            <p>{moment(post.published).format("MMM DD, YYYY")}</p>
            <p>&middot;</p>
            <ViewCounter slug={slug} allViews={allViews} track={true} />
            <p>&middot;</p>
            <p>45 likes</p>
          </div>
          <div className="mt-2 flex space-x-2 text-md text-black/70 sm:text-lg font-body font-semibold">
            <p>Time to read: {Math.round(post.readingTime.minutes)} mins</p>
          </div>
        </section>

        <Suspense fallback={<div>Loading...</div>}>
          {/* DEBUG: Table of contents needs some serious UI tweaking */}
          <TableOfContents
            headings={post.headings}
            path={`/blog/${post.slug}`}
          />

          {/* Post Series */}
          {post.series != null ? (
            <Series
              series={getSeries(post.series.title, post.slug)}
              interactive={true}
              current={slug}
            />
          ) : null}

          {/* Post Content */}
          <div className="pt-8">
            <div className="prose text-black text-lg md:prose-lg lg:prose-xl prose-headings:text-secondary prose-h1:mt-16 prose-h1:mb-4 prose-h2:mt-8 prose-h2:mb-4 prose-h3:my-4 prose-p:my-4 prose-code:before:hidden prose-code:after:hidden leading-7">
              <Content components={CustomMDXComponents} />
            </div>
          </div>

          {/* <div className="mt-16">
            <LikeButton2 slug={post.slug} />
          </div> */}
        </Suspense>
      </div>
    </>
  )
}
