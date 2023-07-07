import "katex/dist/katex.css"
import "@/styles/mdx.css"
import { LikeButton } from "@/components/like-button"
import CustomMDXComponents from "@/components/mdx"
import { Metric } from "@/components/metrics/metric"
import { Series } from "@/components/series"
import { TableOfContents } from "@/components/table-of-contents"
import { ViewCounter } from "@/components/view-counter"
import { env } from "@/env.mjs"
import { getAllMetrics, getLikes } from "@/lib/actions"
import { getPost, getSeries } from "@/lib/content"
import { createOgImage } from "@/lib/createOgImage"
import { getSessionId } from "@/lib/server-utils"
import moment from "moment"
import { Metadata, ResolvingMetadata } from "next"
import { getMDXComponent } from "next-contentlayer/hooks"
import { Suspense } from "react"

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await getPost(params.slug)

  // access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const tags = (post.tags && post.tags.map(({ value }) => value)) || [""]

  const newOgImage = createOgImage({
    title: post.title,
    meta: [
      env.NEXT_PUBLIC_APP_URL,
      moment(post.published).format("MMM DD, YYYY"),
    ].join(" · "),
  })

  return {
    title: `${post.title} | Yash Agarwal`,
    description: post.description,
    authors: {
      name: "Yash Agarwal",
      url: env.NEXT_PUBLIC_APP_URL,
    },
    keywords: post.tags?.map((tag) => tag.value),
    creator: "Yash Agarwal",
    twitter: {
      card: "summary_large_image",
      creator: "@yash__here",
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: moment(post.published).format("MMM DD, YYYY"),
      images: [newOgImage, ...previousImages],
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const post: NonNullable<ReturnType<typeof getPost>> = getPost(slug)
  const Content = getMDXComponent(post.body.code)
  const allMetrics = await getAllMetrics()
  const sessionId = getSessionId(slug)
  let [totalLikes, userLikes] = await getLikes(slug, sessionId)

  const metrics = allMetrics && allMetrics.find((view) => view.slug === slug)
  const likes = new Number(metrics?.likes || 0)

  return (
    <>
      <div className="space-y-4">
        <section>
          <h1 className="relative max-w-4xl pb-2 font-heading text-5xl font-bold leading-none sm:text-6xl">
            {post.title}
          </h1>
          <div className="text-md mt-2 flex space-x-2 font-body font-semibold text-gray-600 sm:text-lg">
            <p>{moment(post.published).format("MMM DD, YYYY")}</p>
            <p>&middot;</p>
            <ViewCounter slug={slug} allMetrics={allMetrics} track={true} />
            <p>&middot;</p>
            <Metric stat={likes.toString()} type={"likes"} />
          </div>
          <div className="text-md mt-2 flex space-x-2 font-body font-semibold text-gray-600 sm:text-lg">
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
            <div className="prose prose-article text-lg leading-7 md:prose-lg lg:prose-xl prose-h1:mb-4 prose-h1:mt-16 prose-h2:mb-4 prose-h2:mt-16 prose-h3:my-8 prose-p:my-4">
              <Content components={CustomMDXComponents} />
            </div>
          </div>

          <div className="mt-16">
            <LikeButton
              slug={slug}
              sessionId={sessionId}
              totalLikes={totalLikes}
              userLikes={userLikes}
            />
          </div>
        </Suspense>
      </div>
    </>
  )
}
