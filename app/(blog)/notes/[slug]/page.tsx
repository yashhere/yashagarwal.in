import { Metadata } from "next"
import dynamic from "next/dynamic"
import GithubSlugger from "github-slugger"

import { Mdx } from "@/components/content/mdx"
import { Series } from "@/components/content/series"
import { TableOfContents } from "@/components/content/table-of-contents"
import { siteConfig } from "@/config/site"
import { getPartialNote, getPreviewNotes } from "@/lib/content"

import "@/styles/mdx.css"
import "katex/dist/katex.css"

import { notFound } from "next/navigation"
import { ArrowLeftIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr"
import { format } from "date-fns"

import { BreadcrumbItem, Breadcrumbs } from "@/components/content/breadcrumbs"
import { ReadingProgress } from "@/components/content/reading-progress"
import { RelatedNotes } from "@/components/content/related-notes"
import { DecorativeHr } from "@/components/ui/decorative-hr"
import Draft from "@/components/ui/draft"
import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"
import { env } from "@/env.mjs"
import { articleViewport } from "@/lib/seo/default"
import { generateArticleMetadata } from "@/lib/seo/metadata"
import {
  ArticleStructuredData,
  BreadcrumbStructuredData,
} from "@/lib/seo/structured-data"
import { encodeParameter } from "@/lib/utils"

// Lazy load below-the-fold components
const BackLinks = dynamic(() =>
  import("@/components/content/backlinks").then((mod) => ({
    default: mod.BackLinks,
  }))
)
const TagList = dynamic(() =>
  import("@/components/content/tag-list").then((mod) => ({
    default: mod.TagList,
  }))
)
const GoToTop = dynamic(() =>
  import("@/components/layout/go-to-top").then((mod) => ({
    default: mod.GoToTop,
  }))
)
const MobileActions = dynamic(() =>
  import("@/components/content/mobile-actions").then((mod) => ({
    default: mod.MobileActions,
  }))
)

// Lazy load comments component as it's below the fold
const DisqusComments = dynamic(
  () =>
    import("@/components/interactive/comments").then(
      (mod) => mod.DisqusComments
    ),
  {
    loading: () => <div className="h-20" />,
  }
)

type Props = {
  params: Promise<{ slug: string }>
}

export const viewport = articleViewport

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const previewNotes = getPreviewNotes()
  const note = previewNotes.find((item) => item.note.slug === params.slug)?.note
  if (!note) {
    return {}
  }

  const newOgImage = note.image
    ? `${note.image}`
    : `/og/${encodeParameter(note.slug ?? params.slug)}`

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
  const notes = getPreviewNotes()

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

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Notes", href: "/notes" },
  ]

  if (article.note.category && category_slug) {
    breadcrumbItems.push({
      label: article.note.category,
      href: `/categories/${category_slug}`,
    })
  }

  breadcrumbItems.push({ label: article.note.title })

  // Build breadcrumb structured data with category if available
  const breadcrumbStructuredDataItems = [
    { name: "Home", url: "/" },
    { name: "Notes", url: "/notes" },
  ]

  if (article.note.category && category_slug) {
    breadcrumbStructuredDataItems.push({
      name: article.note.category,
      url: `/categories/${category_slug}`,
    })
  }

  breadcrumbStructuredDataItems.push({
    name: article.note.title,
    url: `/notes/${article.note.slug}`,
  })

  return (
    <>
      <ReadingProgress targetId="article-body" />
      <ArticleStructuredData
        title={article.note.title}
        description={article.note.description}
        publishedAt={article.note.createdOn}
        updatedAt={article.note.updatedOn}
        url={`/notes/${article.note.slug}`}
        image={article.note.image}
        category={article.note.category}
        tags={article.note.tags}
        wordCount={article.note.readingTime?.words}
      />
      <BreadcrumbStructuredData items={breadcrumbStructuredDataItems} />

      <div className="mx-auto flex w-full max-w-3xl flex-col py-8 xl:max-w-screen-2xl xl:flex-row xl:justify-center">
        {/* Left Column: Sticky TOC (Desktop) */}
        <aside
          className="hidden w-56 shrink-0 pl-4 xl:block xl:w-64 xl:pl-6"
          style={{ contain: "layout style paint" }}
        >
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
            {article.note.headings && article.note.headings.length > 0 && (
              <>
                <div className="text-foreground/80 mb-4 text-sm font-medium tracking-wider uppercase">
                  On this Page
                </div>
                <TableOfContents
                  headings={article.note.headings}
                  className="border-none bg-transparent p-0"
                  mode="desktop"
                />
              </>
            )}
            <div className="mt-8">
              <Link
                href="/notes"
                variant="nav"
                className="text-muted-foreground"
              >
                <ArrowLeftIcon size={16} /> Back to Notes
              </Link>
            </div>
          </div>
        </aside>

        {/* Middle Column: Main Content */}
        <main className="mx-auto flex w-full max-w-3xl min-w-0 flex-col px-4 md:px-6">
          <section className="mb-8 space-y-2">
            <Breadcrumbs items={breadcrumbItems} />
            <Heading level="h1">{article.note.title}</Heading>
            <div className="text-foreground/60 flex flex-row flex-wrap gap-2 text-sm">
              <span>
                Published on{" "}
                {format(new Date(article.note.createdOn), "MMM dd, yyyy")}
              </span>
              {article.note.updatedOn && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span className="block sm:inline">
                    Last updated on{" "}
                    {format(new Date(article.note.updatedOn), "MMM dd, yyyy")}
                  </span>
                </>
              )}
            </div>
          </section>

          {article.series ? (
            <div className="mb-8">
              <Series series={article.series} interactive={true} />
            </div>
          ) : null}

          <div className="mb-8">
            {/* Added max-w-none to override prose default width since we control it via grid */}
            <div
              id="article-body"
              className="prose prose-slate dark:prose-invert text-foreground max-w-none"
            >
              <Mdx code={article.note.mdx} />
              {article.note.status === "draft" ? <Draft /> : null}
            </div>
          </div>

          <DecorativeHr />
          <RelatedNotes relatedSlugs={article.note.related} />
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
        </main>

        {/* Right Column: Empty placeholder to balance the 3-column flex layout */}
        <aside
          className="hidden w-56 shrink-0 pr-4 xl:block xl:w-64 xl:pr-6"
          style={{ contain: "layout style paint" }}
        />
      </div>

      <MobileActions headings={article.note.headings} />
    </>
  )
}
