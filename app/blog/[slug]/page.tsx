import { Suspense } from "react"
import { Metadata, ResolvingMetadata } from "next"
import { Comments } from "@/components/comments"
import { LikeButton } from "@/components/like-button"
import CustomMDXComponents from "@/components/mdx"
import { Metric } from "@/components/metrics/metric"
import { Series } from "@/components/series"
import { TableOfContents } from "@/components/table-of-contents"
import { ViewCounter } from "@/components/view-counter"
import { siteConfig } from "@/config/site"
import { getLikes } from "@/lib/actions"
import { getPartialPost, getPreviewPosts } from "@/lib/content"
import { getSessionId } from "@/lib/server-utils"

import "@/styles/mdx.css"
import "katex/dist/katex.css"

import { GoToTop } from "@/components/go-to-top"
import { TagList } from "@/components/tag-list"
import Draft from "@/components/ui/draft"
import { encodeParameter } from "@/lib/utils"
import moment from "moment"
import { getMDXComponent } from "next-contentlayer/hooks"

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previewPosts = await getPreviewPosts()
  const post = previewPosts.find((item) => item.post.slug === params.slug)?.post
  const siteUrl: string = siteConfig.url
  if (!post) {
    return {}
  }

  // access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const newOgImage = post.image
    ? `${post.image}`
    : `/og?title=${encodeParameter(post.title)}&meta=${encodeParameter(
        moment(post.published).format("MMMM DD, YYYY")
      )}&tags=${post.tags.join("|")}`

  return {
    title: `${post.title} | Yash Agarwal`,
    description: post.description,
    authors: {
      name: "Yash Agarwal",
      url: siteUrl,
    },
    keywords: post.tags?.map((tag) => tag.value),
    creator: "Yash Agarwal",
    alternates: {
      canonical: `${siteConfig.url}/blog/${params.slug}`,
      types: {
        "application/rss+xml": [
          { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
          { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
        ],
      },
    },
    twitter: {
      title: post.title,
      description: post.description,
      card: "summary_large_image",
      creator: "@yash__here",
      images: {
        width: 1200,
        height: 630,
        url: newOgImage,
        type: "image/png",
      },
      site: siteUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: moment(post.published).format("MMM DD, YYYY"),
      images: [
        {
          width: 1200,
          height: 630,
          url: newOgImage,
          type: "image/png",
        },
        ...previousImages,
      ],
      locale: "en_US",
      url: siteConfig.url,
      siteName: siteConfig.title,
      countryName: "India",
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params
  const article = await getPartialPost(slug)
  if (!article) {
    // TODO: Add 404 here
    return <></>
  }
  const MdxContent = getMDXComponent(article.post.body.code)
  const sessionId = getSessionId(slug)
  let [totalLikes, userLikes] = await getLikes(slug, sessionId)

  const metrics = {
    slug: article.post.slug as string,
    likes: article.likes as number,
    views: article.views as number,
  }

  return (
    <>
      <div className="space-y-4">
        <section>
          <h1 className="relative max-w-4xl pb-2 font-heading text-4xl font-bold leading-none sm:text-5xl">
            {article.post.title}
          </h1>
          <div className="text-md mt-2 flex space-x-2 font-body font-semibold text-gray-600 sm:text-lg">
            <p>{moment(article.post.published).format("MMM DD, YYYY")}</p>
            <p>&middot;</p>
            <ViewCounter slug={slug} metrics={metrics} track={true} />
            <p>&middot;</p>
            <Metric stat={article.likes.toString()} type={"likes"} />
          </div>
          <div className="text-md mt-2 flex space-x-2 font-body font-semibold text-gray-600 sm:text-lg">
            <p>
              Time to read: {Math.round(article.post.readingTime.minutes)} mins
            </p>
          </div>
          <TagList tags={article.post.tags} />
        </section>

        <Suspense fallback={<div>Loading...</div>}>
          {/* Post Series */}
          {article.series ? (
            <Series series={article.series} interactive={true} current={slug} />
          ) : null}

          {/* Post Content */}
          <div className="pt-4">
            <div className="prose prose-article text-lg leading-7 md:prose-lg lg:prose-xl prose-headings:cursor-pointer prose-h1:mb-4 prose-h1:mt-16 prose-h2:mb-4 prose-h2:mt-16 prose-h3:my-8 prose-p:my-4 prose-th:cursor-auto">
              <TableOfContents
                headings={article.post.headings}
                path={`/blog/${article.post.slug}`}
                interactive={true}
              />
              <MdxContent components={CustomMDXComponents} />

              {article.post.status === "draft" ? <Draft /> : null}
            </div>
          </div>

          <div className="py-8">
            <LikeButton
              slug={slug}
              sessionId={sessionId}
              totalLikes={totalLikes}
              userLikes={userLikes}
            />
          </div>

          {/* Post Series */}
          {article.series ? (
            <div className="py-8">
              <Series
                series={article.series}
                interactive={true}
                current={slug}
              />
            </div>
          ) : null}

          <GoToTop slug={slug} />

          <hr className="border-t-1 border-gray-300/60" />

          <Comments />
        </Suspense>
      </div>
    </>
  )
}
