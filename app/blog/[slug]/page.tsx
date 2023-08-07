import { Suspense } from "react"
import { Metadata, ResolvingMetadata } from "next"
import { Comments } from "@/components/comments"
import CustomMDXComponents from "@/components/mdx"
import { Series } from "@/components/series"
import { TableOfContents } from "@/components/table-of-contents"
import { ViewCounter } from "@/components/view-counter"
import { siteConfig } from "@/config/site"
import { getPartialPost, getPreviewPosts } from "@/lib/content"

import "@/styles/mdx.css"
import "katex/dist/katex.css"

import { GoToTop } from "@/components/go-to-top"
import { TagList } from "@/components/tag-list"
import Draft from "@/components/ui/draft"
import Link from "@/components/ui/link"
import { env } from "@/env.mjs"
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
  const encodedUrl = encodeParameter(
    `${env.NEXT_PUBLIC_APP_URL}/blog/${article.post.slug}`
  )
  const metrics = {
    slug: article.post.slug as string,
    likes: article.likes as number,
    views: article.views as number,
  }

  return (
    <>
      <div className="space-y-4">
        <section>
          <h1 className="relative pb-2 font-heading text-4xl font-bold leading-none sm:text-5xl">
            {article.post.title}
          </h1>
          {article.post.description ? (
            <>
              <h3 className="relative mt-4 pb-2 font-heading text-lg font-normal leading-relaxed text-text/70">
                {article.post.description}
              </h3>
              <hr className="border-t-1 my-4 border-gray-300/60" />
            </>
          ) : null}
          <div className="mt-2 flex flex-col font-body text-base text-gray-600 sm:flex-row sm:justify-between">
            <p>Planted about {moment(article.post.published).fromNow()}</p>
            {article.post.updatedOn ? (
              <p>
                Last tended about {moment(article.post.updatedOn).fromNow()}
              </p>
            ) : null}
          </div>
          <ViewCounter
            slug={slug}
            metrics={metrics}
            track={true}
            show={false}
          />
          <TagList tags={article.post.tags} />
          <hr className="border-t-1 my-4 border-gray-300/60" />
        </section>

        <Suspense fallback={<div>Loading...</div>}>
          {article.series ? (
            <>
              <Series
                series={article.series}
                interactive={true}
                current={slug}
              />
            </>
          ) : null}

          <TableOfContents
            headings={article.post.headings}
            path={`/blog/${article.post.slug}`}
            interactive={true}
          />

          <div className="py-8">
            <div className="prose prose-article text-lg leading-7 md:prose-lg lg:prose-xl prose-headings:cursor-pointer prose-h1:mb-4 prose-h1:mt-16 prose-h2:mb-4 prose-h2:mt-16 prose-h3:my-8 prose-p:my-4 prose-th:cursor-auto">
              <MdxContent components={CustomMDXComponents} />
              {article.post.status === "draft" ? <Draft /> : null}
            </div>
          </div>

          <hr className="border-t-1 border-gray-300/60" />
          <div className="flex flex-col items-center justify-center space-x-2 space-y-4 py-8 sm:flex-row sm:justify-between sm:space-y-0">
            <Link
              href={`https://twitter.com/intent/tweet?text=${encodedUrl}%20via%20%40yash__here`}
              className="text-lg text-primary"
              noUnderline
            >
              <span className="text-text/80">Share this article on</span>{" "}
              <span>Twitter</span>
            </Link>
            <GoToTop slug={slug} />
          </div>

          <hr className="border-t-1 border-gray-300/60" />

          <Comments />
        </Suspense>
      </div>
    </>
  )
}
