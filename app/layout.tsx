import { Metadata } from "next"
import { IBM_Plex_Mono, Inter } from "next/font/google"
import { Analytics } from "@/components/interactive/analytics"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/layout/navigation"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { cn, encodeParameter } from "@/lib/utils"

import "@/styles/globals.css"

import { Toaster } from "@/components/ui/toast"

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  style: ["normal", "italic"],
})

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
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

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e141b" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "flex flex-col items-center",
          "min-h-dvh font-sans antialiased optimize-legibility",
          "bg-background text-foreground",
          "selection:bg-zinc-200/60",
          "flex flex-col lg:mx-auto",
          sansFont.variable,
          monoFont.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          enableColorScheme={false}
          disableTransitionOnChange={true}
          defaultTheme="system"
          enableSystem
        >
          <Toaster closeButton className="pointer-events-auto" />
          <main className="w-full max-w-2xl flex-1 px-4  md:px-0 ">
            <Navigation />
            <div className="py-6">{children}</div>
          </main>
          <Footer />
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
