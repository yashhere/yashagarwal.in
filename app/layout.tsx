import "@/styles/globals.css"
import { Analytics } from "@/components/analytics"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/ui/navigation"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import localFont from "next/font/local"

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

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [],
  authors: [
    {
      name: "Yash Agarwal",
      url: `${env.NEXT_PUBLIC_APP_URL}`,
    },
  ],
  creator: "yashhere",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [`${siteConfig.url}/og.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@yashhere",
  },
  verification: {
    google: "",
  },
  alternates: {
    canonical: `${env.NEXT_PUBLIC_APP_URL}`,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
      "application/rss+json": [
        { url: "feed.json", title: "JSON Feed for yashagarwal.in" },
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
          monoFont.variable,
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
