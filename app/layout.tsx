import { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@/components/analytics"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/ui/navigation"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { cn, encodeParameter } from "@/lib/utils"

import "@/styles/globals.css"

const bodyFont = localFont({
  src: "../public/assets/fonts/wotfard.ttf",
  variable: "--font-body",
  display: "swap",
})

const monoFont = localFont({
  src: "../public/assets/fonts/league-mono.ttf",
  variable: "--font-mono",
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl: string = siteConfig.url

  const newOgImage = `/og?title=${encodeParameter(
    siteConfig.title
  )}&meta=${encodeParameter(siteConfig.description)}`

  return {
    metadataBase: new URL(siteUrl),
    title: siteConfig.title,
    description: siteConfig.description,
    keywords: [],
    authors: [
      {
        name: "Yash Agarwal",
        url: siteUrl,
      },
    ],
    creator: "Yash Agarwal",
    generator: "Next.js",
    archives: [`${siteUrl}/notes`],
    themeColor: [
      { media: "(prefers-color-scheme: dark)", color: "#0e141b" },
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    ],
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
        url: newOgImage,
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
        url: newOgImage,
        type: "image/png",
      },
      creator: "@yash__here",
      site: siteConfig.url,
    },
    verification: {
      google: "",
    },
    alternates: {
      canonical: siteUrl,
      types: {
        "application/rss+xml": [
          { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
          { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
        ],
      },
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
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-body antialiased",
          "bg-background text-text",
          "mx-4 mb-40 mt-8 flex max-w-6xl flex-col md:flex-row lg:mx-auto",
          bodyFont.variable,
          monoFont.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="mt-6 flex max-w-2xl flex-auto flex-col px-2 sm:mx-auto md:mt-0 md:px-0">
            <Navigation />
            {children}
            <Footer />
          </main>
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
