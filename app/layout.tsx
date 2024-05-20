import { Metadata } from "next"
import { Newsreader } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@/components/analytics"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/ui/navigation"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { cn, encodeParameter } from "@/lib/utils"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import "@/styles/globals.css"

const GeistRegular = localFont({
  src: "../public/assets/fonts/geist-regular.otf",
  variable: "--font-geist-regular",
  display: "swap",
})

const monoFont = localFont({
  src: "../public/assets/fonts/league-mono.ttf",
  variable: "--font-mono",
  display: "swap",
})

const NewsReader = Newsreader({
  subsets: ["latin"],
  variable: "--font-news-reader",
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
          "min-h-screen font-sans antialiased",
          "bg-gray-100 text-gray-1200",
          "flex flex-col lg:mx-auto",
          GeistRegular.variable,
          NewsReader.variable,
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          enableColorScheme={false}
          disableTransitionOnChange={true}
          defaultTheme="system"
          enableSystem
        >
          <div className="h-screen ">
            <main className="mx-4 flex max-w-2xl flex-auto flex-col px-2 sm:mx-auto">
              {/* <Navigation /> */}
              <div className="mb-32">{children}</div>
            </main>
            <Footer />
          </div>
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
