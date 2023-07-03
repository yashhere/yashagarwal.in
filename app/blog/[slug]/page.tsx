import "@/styles/mdx.css"

import { Suspense } from "react"
import CustomMDXComponents from "@/ui/mdx"
import { TableOfContents } from "@/ui/post/table-of-contents"
import { Series } from "@/ui/series"
import { ViewCounter } from "@/ui/view-counter"
import moment from "moment"
import { getMDXComponent } from "next-contentlayer/hooks"

import { getPost, getSeries } from "@/lib/content"
import { getAllViewsCount } from "@/lib/db"

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
          <h1 className="relative max-w-4xl pb-2 font-heading text-5xl font-bold leading-none sm:text-6xl">
            {post.title}
          </h1>
          <div className="text-md mt-2 flex space-x-2 font-body font-semibold text-black/70 sm:text-lg">
            <p>{moment(post.published).format("MMM DD, YYYY")}</p>
            <p>&middot;</p>
            <ViewCounter slug={slug} allViews={allViews} track={true} />
            <p>&middot;</p>
            <p>45 likes</p>
          </div>
          <div className="text-md mt-2 flex space-x-2 font-body font-semibold text-black/70 sm:text-lg">
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
            <div className="prose text-lg leading-7 text-black md:prose-lg lg:prose-xl prose-headings:text-secondary prose-h1:mb-4 prose-h1:mt-16 prose-h2:mb-4 prose-h2:mt-8 prose-h3:my-4 prose-p:my-4">
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
