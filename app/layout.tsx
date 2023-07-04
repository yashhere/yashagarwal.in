import "../styles/globals.css"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Analytics } from "@/ui/analytics"
import { Footer } from "@/ui/layout/footer"
import { Navigation } from "@/ui/layout/navigation"
import { TailwindIndicator } from "@/ui/tailwind-indicator"
import { ThemeProvider } from "@/ui/theme-provider"
import { Metadata } from "next"
import { Fira_Code } from "next/font/google"
import localFont from "next/font/local"

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
      url: "https://yashagarwal.in",
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
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
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
          "bg-white text-black dark:bg-[#111010] dark:text-white",
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
