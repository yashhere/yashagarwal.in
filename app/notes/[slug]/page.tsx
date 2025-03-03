import { Metadata, ResolvingMetadata } from "next"
import { DisqusComments } from "@/components/comments"
import CustomMDXComponents from "@/components/mdx"
import { Series } from "@/components/series"
import { TableOfContents } from "@/components/table-of-contents"
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
    return {}
  }

  // access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const newOgImage = note.image
    ? `${note.image}`
    : `/og?title=${encodeParameter(note.title)}&meta=${encodeParameter(
        moment(note.createdOn).format("MMM DD, YYYY")
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

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const notes = await getPreviewNotes()

  return notes.map((note) => ({
    slug: note.note.slug,
  }))
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

  return (
    <>
      <div>
        <section className="mb-8 space-y-2">
          <SectionTitle data={null} title={article.note.title} />
          <div className="flex flex-col pb-4 font-body text-base text-gray-600 sm:flex-row sm:justify-between">
            <span className="text-base">
              {moment(article.note.createdOn).format("MMM DD, YYYY")}
            </span>
          </div>
          <TagList tags={article.note.tags} />
        </section>
        {article.series ? (
          <div className="mb-8">
            <Series series={article.series} interactive={true} current={slug} />
          </div>
        ) : null}
        {article.note.toc && article.note.headings.length != 0 ? (
          <div className="mb-8">
            <TableOfContents
              headings={article.note.headings}
              path={`/notes/${article.note.slug}`}
              interactive={true}
            />
          </div>
        ) : null}
        <div className="mb-8">
          <div className="prose leading-7 text-text prose-headings:cursor-pointer">
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
        <DisqusComments
          slug={params.slug}
          url={`${siteConfig.url}/notes/${params.slug}`}
        />
      </div>
    </>
  )
}
