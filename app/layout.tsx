import { Metadata, ResolvingMetadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@/components/analytics"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/ui/navigation"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { createOgImageGeneral } from "@/lib/og/createOgImage"
import { cn } from "@/lib/utils"
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

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  const siteUrl: string = siteConfig.url

  // access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
  const newOgImage = createOgImageGeneral()

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
    archives: [`${siteUrl}/blog`],
    themeColor: [
      { media: "(prefers-color-scheme: dark)", color: "#0e141b" },
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    ],
    referrer: "strict-origin-when-cross-origin",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.title,
      images: [newOgImage, ...previousImages],
      countryName: "India",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: newOgImage,
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-body antialiased",
          "bg-background text-text",
          "mx-4 mb-40 mt-8 flex max-w-4xl flex-col md:mt-20 md:flex-row lg:mx-auto lg:mt-32",
          bodyFont.variable,
          monoFont.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:mt-0 md:px-0">
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
