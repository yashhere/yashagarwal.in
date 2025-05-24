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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: siteConfig.author,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    url: `${siteConfig.url}${article.url}`,
    ...(article.image && {
      image: {
        "@type": "ImageObject",
        url: article.image,
      },
    }),
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
