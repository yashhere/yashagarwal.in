import { Metadata } from "next"
import { Geist, IBM_Plex_Mono, Newsreader } from "next/font/google"

import "@/styles/globals.css"

import { THEME_COLORS } from "@/lib/constants/theme-colors"
import { defaultMetadata, defaultViewport } from "@/lib/seo/default"
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/lib/seo/structured-data"
import { cn } from "@/lib/utils"
import { Providers } from "./providers"

const sansFont = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  style: ["normal"],
  weight: "variable",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
  preload: true,
  fallback: ["ui-monospace", "monospace"],
})

const serifFont = Newsreader({
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: "variable",
  preload: true,
  fallback: ["Georgia", "serif"],
})

export const metadata: Metadata = defaultMetadata
export const viewport = defaultViewport

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head>
        <meta name="theme-color" content={THEME_COLORS.light} />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content={THEME_COLORS.dark}
        />
        <WebsiteStructuredData />
        <PersonStructuredData
          sameAs={[
            "https://x.com/yash__here",
            "https://github.com/yashhere",
            "https://www.linkedin.com/in/theyashagarwal/",
          ]}
        />
      </head>
      <body
        className={cn(
          "flex flex-col items-center",
          "optimize-legibility min-h-dvh font-sans antialiased",
          "bg-background text-foreground",
          "selection:bg-slate-200 selection:text-slate-900 dark:selection:bg-slate-700 dark:selection:text-slate-100",
          "flex flex-col lg:mx-auto",
          sansFont.variable,
          monoFont.variable,
          serifFont.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
