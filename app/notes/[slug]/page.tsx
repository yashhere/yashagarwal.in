import { Metadata } from "next"
import GithubSlugger from "github-slugger"

import { Mdx } from "@/components/content/mdx"
import { Series } from "@/components/content/series"
import { TableOfContents } from "@/components/content/table-of-contents"
import { DisqusComments } from "@/components/interactive/comments"
import { siteConfig } from "@/config/site"
import { getPartialNote, getPreviewNotes } from "@/lib/content"

import "@/styles/mdx.css"
import "katex/dist/katex.css"

import { notFound } from "next/navigation"
import { XLogoIcon } from "@phosphor-icons/react/dist/ssr"
import moment from "moment"

import { BackLinks } from "@/components/content/backlinks"
import { TagList } from "@/components/content/tag-list"
import { GoToTop } from "@/components/layout/go-to-top"
import { DecorativeHr } from "@/components/ui/decorative-hr"
import Draft from "@/components/ui/draft"
import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"
import { env } from "@/env.mjs"
import { articleViewport } from "@/lib/seo/default"
import { generateArticleMetadata } from "@/lib/seo/metadata"
import { ArticleStructuredData } from "@/lib/seo/structured-data"
import { encodeParameter } from "@/lib/utils"

type Props = {
  params: Promise<{ slug: string }>
}

export const viewport = articleViewport

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const previewNotes = await getPreviewNotes()
  const note = previewNotes.find((item) => item.note.slug === params.slug)?.note
  if (!note) {
    return {}
  }

  const newOgImage = note.image
    ? `${note.image}`
    : `/og?title=${encodeParameter(note.title)}&meta=${encodeParameter(
        moment(note.createdOn).format("MMM DD, YYYY")
      )}&tags=${note.tags.join("|")}`

  return generateArticleMetadata({
    title: note.title,
    description: note.description,
    excerpt: note.description,
    tags: note.tags,
    createdOn: note.createdOn,
    updatedOn: note.updatedOn,
    coverImage: newOgImage,
    slug: params.slug,
  })
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const notes = await getPreviewNotes()

  return notes.map((note) => ({
    slug: note.note.slug,
  }))
}

export default async function Page(props: Props) {
  const params = await props.params
  const { slug } = params
  const article = await getPartialNote(slug)
  if (!article) {
    notFound()
  }
  const encodedUrl = encodeParameter(
    `${env.NEXT_PUBLIC_APP_URL}/notes/${article.note.slug}`
  )

  const slugger = new GithubSlugger()
  const category_slug = article.note.category
    ? slugger.slug(article.note.category)
    : undefined

  return (
    <>
      <ArticleStructuredData
        title={article.note.title}
        description={article.note.description}
        publishedAt={article.note.publishedAt}
        updatedAt={article.note.updatedAt}
        url={`/notes/${article.note.slug}`}
        image={article.note.coverImage}
      />
      <div>
        <section className="mb-8 space-y-2">
          <div className="text-foreground/80 text-sm tracking-wider uppercase">
            <Link
              key={category_slug}
              href={`/categories/${category_slug}`}
              variant="text"
              showIcon={false}
            >
              {article.note.category}
            </Link>
          </div>
          <Heading level="h2">{article.note.title}</Heading>
          <div className="text-foreground/60 flex flex-row gap-1 text-sm">
            <span>{moment(article.note.createdOn).format("MMM DD, YYYY")}</span>
          </div>
        </section>
        {article.series ? (
          <div className="mb-8">
            <Series series={article.series} interactive={true} />
          </div>
        ) : null}
        {article.note.toc && article.note.headings.length != 0 ? (
          <div className="mb-8">
            <TableOfContents
              headings={article.note.headings}
              interactive={true}
            />
          </div>
        ) : null}
        <div className="mb-8">
          <div className="prose text-foreground">
            <Mdx code={article.note.mdx} />
            {article.note.status === "draft" ? <Draft /> : null}
          </div>
        </div>
        <DecorativeHr />
        {article.backlinks && <BackLinks backlinks={article.backlinks} />}
        {article.note.tags && article.note.tags.length > 0 && (
          <TagList tags={article.note.tags} />
        )}
        <DecorativeHr />
        <div className="my-8 flex flex-row items-center justify-between space-x-2">
          <Link
            href={`https://x.com/intent/tweet?text=${encodedUrl}%20via%20%40yash__here`}
            className="text-base"
            variant="nav"
            showIcon={false}
          >
            <div className="border-border/80 text-foreground/80 hover:text-foreground hover:border-border flex flex-row items-center gap-1 rounded-full border px-4 py-1 text-base">
              <XLogoIcon className="flex w-5" /> Share
            </div>
          </Link>
          <GoToTop slug={slug} />
        </div>
        <DecorativeHr />
        <DisqusComments
          slug={params.slug}
          url={`${siteConfig.url}/notes/${params.slug}`}
        />
      </div>
    </>
  )
}
