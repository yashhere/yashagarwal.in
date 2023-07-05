import "@/styles/mdx.css"
import { createHash } from "crypto"
import { getAllMetrics, getLikes } from "@/lib/actions"
import { getPost, getSeries } from "@/lib/content"
import { createOgImage } from "@/lib/createOgImage"
import { LikeButton } from "@/ui/like-button"
import CustomMDXComponents from "@/ui/mdx"
import { Metric } from "@/ui/metrics/metric"
import { TableOfContents } from "@/ui/post/table-of-contents"
import { Series } from "@/ui/series"
import { ViewCounter } from "@/ui/view-counter"
import moment from "moment"
import { Metadata, ResolvingMetadata } from "next"
import { getMDXComponent } from "next-contentlayer/hooks"
import { headers } from "next/headers"
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
      "yashagarwal.in",
      moment(post.published).format("MMM DD, YYYY"),
    ].join(" · "),
  })

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
    openGraph: {
      images: [newOgImage, ...previousImages],
    },
  }
}

function getSessionId(slug: string) {
  const ipAddress = headers().get("x-forwarded-for")

  const currentUserId =
    // Since a users IP address is part of the sessionId in our database, we
    // hash it to protect their privacy. By combining it with a salt, we get
    // get a unique id we can refer to, but we won't know what their ip
    // address was.
    createHash("md5")
      .update(ipAddress + process.env.IP_ADDRESS_SALT!, "utf8")
      .digest("hex")

  // Identify a specific users interactions with a specific post
  return slug + "___" + currentUserId
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
          <div className="text-md mt-2 flex space-x-2 font-body font-semibold text-black/70 dark:text-white/70 sm:text-lg">
            <p>{moment(post.published).format("MMM DD, YYYY")}</p>
            <p>&middot;</p>
            <ViewCounter slug={slug} allMetrics={allMetrics} track={true} />
            <p>&middot;</p>
            <Metric stat={likes.toString()} type={"likes"} />
          </div>
          <div className="text-md mt-2 flex space-x-2 font-body font-semibold text-black/70 dark:text-white/70 sm:text-lg">
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
            <div className="prose text-lg leading-7 dark:prose-invert md:prose-lg lg:prose-xl prose-headings:text-secondary prose-h1:mb-4 prose-h1:mt-16 prose-h2:mb-4 prose-h2:mt-8 prose-h3:my-4 prose-p:my-4">
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
