import { siteConfig } from "@/lib/seo/default"

interface StructuredDataProps {
  data: object
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Pre-built structured data generators
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Website",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
  }
}

export function generatePersonSchema(person?: {
  jobTitle?: string
  company?: string
  sameAs?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    url: siteConfig.url,
    ...(person?.jobTitle && { jobTitle: person.jobTitle }),
    ...(person?.company && {
      worksFor: {
        "@type": "Organization",
        name: person.company,
      },
    }),
    ...(person?.sameAs && { sameAs: person.sameAs }),
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  url: string
  image?: string
  wordCount?: number
  category?: string
  tags?: string[]
}) {
  const fullUrl = `${siteConfig.url}${article.url}`

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.url,
      jobTitle: siteConfig.authorJobTitle,
      worksFor: {
        "@type": "Organization",
        name: siteConfig.authorCompany,
      },
      sameAs: siteConfig.authorSameAs,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.author,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/yash/yash-avatar.webp`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    url: fullUrl,
    ...(article.image && {
      image: {
        "@type": "ImageObject",
        url: article.image.startsWith("http")
          ? article.image
          : `${siteConfig.url}${article.image}`,
        width: 1200,
        height: 630,
      },
    }),
    ...(article.category && { articleSection: article.category }),
    ...(article.tags &&
      article.tags.length > 0 && { keywords: article.tags.join(", ") }),
    ...(article.wordCount && { wordCount: article.wordCount }),
  }
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.url}${item.url}`,
    })),
  }
}

// Convenience components
export function WebsiteStructuredData() {
  return <StructuredData data={generateWebsiteSchema()} />
}

export function PersonStructuredData(
  props?: Parameters<typeof generatePersonSchema>[0]
) {
  return <StructuredData data={generatePersonSchema(props)} />
}

export function ArticleStructuredData(
  props: Parameters<typeof generateArticleSchema>[0]
) {
  return <StructuredData data={generateArticleSchema(props)} />
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  return <StructuredData data={generateBreadcrumbSchema(items)} />
}
