import { Metadata, Viewport } from "next"

import { env } from "@/env.mjs"

const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000"
  }
  return env.NEXT_PUBLIC_APP_URL
}

export const siteConfig = {
  name: "Yash Agarwal",
  title: "/dev/yash/notes",
  description:
    "Explore backend systems, homelab experiments, networking setups, and full-stack dev insights from an engineer's perspective. Learn, build, and self-host smarter.",
  url: getBaseUrl(),
  ogImage: "/images/og.png",
  twitterImage: "/images/og.png",
  twitterHandle: "@yash__here",
  keywords: [
    "backend engineering",
    "homelab setup",
    "Golang backend",
    "Python backend",
    "Linux networking",
    "DevOps blog",
    "self-hosting",
    "Next.js blog",
    "system design",
    "web infrastructure",
  ] as string[],
  author: "Yash Agarwal",
} as const

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  archives: [`${siteConfig.url}/notes`],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: {
      width: 1200,
      height: 630,
      url: siteConfig.ogImage,
      type: "image/png",
    },
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: {
      width: 1200,
      height: 630,
      url: siteConfig.ogImage,
      type: "image/png",
    },
    creator: siteConfig.twitterHandle,
    site: siteConfig.url,
  },
  verification: {},
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
    },
  },
}

// Default viewport
export const defaultViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// Article viewport
export const articleViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}
