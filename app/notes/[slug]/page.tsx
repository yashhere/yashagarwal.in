import { Suspense } from "react"
import { Metadata, ResolvingMetadata } from "next"
import { Comments } from "@/components/comments"
import CustomMDXComponents from "@/components/mdx"
import { Series } from "@/components/series"
import { TableOfContents } from "@/components/table-of-contents"
import { ViewCounter } from "@/components/view-counter"
import { siteConfig } from "@/config/site"
import { getPartialNote, getPreviewNotes } from "@/lib/content"

import "@/styles/mdx.css"
import "katex/dist/katex.css"

import { notFound } from "next/navigation"
import { BackLinks } from "@/components/backlinks"
import { GoToTop } from "@/components/go-to-top"
import { TagList } from "@/components/tag-list"
import Draft from "@/components/ui/draft"
import Link from "@/components/ui/link"
import SectionTitle from "@/components/ui/section-title"
import { env } from "@/env.mjs"
import { GROWTH_STAGE_ICONS } from "@/lib/constants"
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
  const previewNotes = await getPreviewNotes()
  const note = previewNotes.find((item) => item.note.slug === params.slug)?.note
  const siteUrl: string = siteConfig.url
  if (!note) {
    return
  }

  // access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const newOgImage = note.image
    ? `${note.image}`
    : `/og?title=${encodeParameter(note.title)}&meta=${encodeParameter(
        moment(note.createdOn).format("MMMM DD, YYYY")
      )}&tags=${note.tags.join("|")}`

  return {
    title: `${note.title} | Yash Agarwal`,
    description: note.description,
    authors: {
      name: "Yash Agarwal",
      url: siteUrl,
    },
    keywords: note.tags?.map((tag) => tag.value),
    creator: "Yash Agarwal",
    alternates: {
      canonical: `${siteConfig.url}/notes/${params.slug}`,
      types: {
        "application/rss+xml": [
          { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
          { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
        ],
      },
    },
    twitter: {
      title: note.title,
      description: note.description,
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
      title: note.title,
      description: note.description,
      type: "article",
      publishedTime: moment(note.createdOn).format("MMM DD, YYYY"),
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
  const article = await getPartialNote(slug)
  if (!article) {
    // TODO: Add 404 here
    notFound()
  }
  const MdxContent = getMDXComponent(article.note.body.code)
  const encodedUrl = encodeParameter(
    `${env.NEXT_PUBLIC_APP_URL}/notes/${article.note.slug}`
  )
  const metrics = {
    slug: article.note.slug as string,
    likes: article.likes as number,
    views: article.views as number,
  }

  return (
    <>
      <div className="space-y-4">
        <section>
          <SectionTitle data={null} title={article.note.title} />
          {article.note.description ? (
            <>
              <h3 className="relative mt-4 pb-2 font-heading text-lg font-normal leading-relaxed text-text/70">
                {article.note.description}
              </h3>
              <hr className="border-t-1 my-4 border-gray-300/60" />
            </>
          ) : null}
          <div className="mt-2 flex flex-col font-body text-base text-gray-600 sm:flex-row sm:justify-between">
            <p>
              Planted on{" "}
              <span className="text-sm tracking-widest">
                {moment(article.note.createdOn).format("DD/MM/YY")}
              </span>
            </p>
            {article.note.updatedOn ? (
              <p>
                Last tended on{" "}
                <span className="text-sm tracking-widest">
                  {moment(article.note.updatedOn).format("DD/MM/YY")}
                </span>
              </p>
            ) : null}
          </div>
          <p className="mt-4 text-gray-600">
            Growth Stage:{" "}
            <span className="capitalize">
              {GROWTH_STAGE_ICONS[article.note.growthStage]}{" "}
              {article.note.growthStage}
            </span>
          </p>
          <TagList tags={article.note.tags} />
          <hr className="border-t-1 my-4 border-gray-300/60" />
          <ViewCounter
            slug={slug}
            metrics={metrics}
            track={true}
            show={false}
          />
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
            headings={article.note.headings}
            path={`/notes/${article.note.slug}`}
            interactive={true}
          />

          <div className="py-8">
            <div className="prose prose-article text-lg leading-8 prose-headings:cursor-pointer prose-h1:mt-16 prose-h1:text-4xl prose-h2:mt-8 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-h4:text-xl prose-p:mt-8 prose-th:cursor-auto">
              <MdxContent components={CustomMDXComponents} />
              {article.note.status === "draft" ? <Draft /> : null}
            </div>
          </div>
          <BackLinks backlinks={article.backlinks} />
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
