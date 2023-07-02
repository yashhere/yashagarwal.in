import "../styles/globals.css"

import { Metadata } from "next"
import localFont from "next/font/local"
import { Inter, Fira_Code, Gentium_Plus, EB_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import { Navigation } from "@/ui/layout/navigation"
import { Footer } from "@/ui/layout/footer"
import clsx from "clsx"

const bodyFont = localFont({
  src: "../public/assets/fonts/wotfard.ttf",
  variable: "--font-body",
  // weight: "400 900",
})

const monoFont = Fira_Code({
  display: "swap",
  variable: "--font-mono",
  subsets: ["cyrillic"],
})

const metadata: Metadata = {
  title: {
    default: "Yash Agarwal",
    template: "%s | Yash Agarwal",
  },
  description: "Developer, writer, and creator.",
  openGraph: {
    title: "Yash Agarwal",
    description: "Developer, writer, and creator.",
    url: "https://yashagarwal.in",
    siteName: "Yash Agarwal",
    images: [
      {
        url: "https://yashagarwal.in/og.jpg",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
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
  twitter: {
    title: "Yash Agarwal",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: "https://yashagarwal.in",
    types: {
      "application/rss+xml": [{ url: "rss.xml", title: "rss" }],
    },
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      className={clsx(
        "bg-white text-black dark:text-white dark:bg-[#111010]",
        bodyFont.variable,
        monoFont.variable,
      )}
    >
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto font-body">
        <Navigation />
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
          {children}
          <Footer />
        </main>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
