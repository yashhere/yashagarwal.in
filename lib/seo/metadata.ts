import { Metadata } from "next"

import { siteConfig } from "./default"

interface PageMetadataOptions {
  title?: string
  description?: string
  keywords?: string[]
  canonicalUrl?: string
  noIndex?: boolean
  ogImage?: string
  twitterImage?: string
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  type?: "website" | "article"
}

export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description = siteConfig.description,
    keywords = siteConfig.keywords,
    canonicalUrl,
    noIndex = false,
    ogImage = siteConfig.ogImage,
    twitterImage = siteConfig.ogImage,
    publishedTime,
    modifiedTime,
    authors = [siteConfig.author],
    tags,
    type = "website",
  } = options

  const pageTitle = title || siteConfig.title
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title

  const url = canonicalUrl ? `${siteConfig.url}${canonicalUrl}` : siteConfig.url
  return {
    title: pageTitle,
    description,
    keywords,
    authors: authors.map((name) => ({ name })),
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    ...(publishedTime && { publishedTime }),
    ...(modifiedTime && { modifiedTime }),
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: url,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [twitterImage],
      ...(siteConfig.twitterHandle && { creator: siteConfig.twitterHandle }),
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": [
          { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
          { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
        ],
      },
    },
  }
}

export function generateArticleMetadata(article: {
  title: string
  description?: string
  excerpt?: string
  tags?: string[]
  createdOn?: string
  updatedOn?: string
  coverImage?: string
  slug: string
}): Metadata {
  return generatePageMetadata({
    title: article.title,
    description: article.description || article.excerpt,
    keywords: article.tags,
    canonicalUrl: `/notes/${article.slug}`,
    ogImage: article.coverImage,
    twitterImage: article.coverImage,
    publishedTime: article.createdOn,
    modifiedTime: article.updatedOn || article.createdOn,
    tags: article.tags,
    type: "article",
  })
}

export function generateCategoryMetadata(category: {
  name: string
  description?: string
  slug: string
  postCount?: number
}): Metadata {
  const title = `${category.name} Articles`
  const description =
    category.description ||
    `Explore ${category.postCount || ""} articles about ${category.name} by ${siteConfig.author}.`

  return generatePageMetadata({
    title,
    description,
    canonicalUrl: `/categories/${category.slug}`,
    keywords: [category.name, ...siteConfig.keywords],
  })
}

export function generateTagMetadata(tag: {
  name: string
  slug: string
  postCount?: number
}): Metadata {
  const title = `${tag.name} Posts`
  const description = `Discover ${tag.postCount || ""} posts tagged with ${tag.name}.`

  return generatePageMetadata({
    title,
    description,
    canonicalUrl: `/tags/${tag.slug}`,
    keywords: [tag.name, ...siteConfig.keywords],
  })
}
