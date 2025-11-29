import { Metadata } from "next"
import { Geist, IBM_Plex_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Analytics } from "@/components/interactive/analytics"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/layout/navigation"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { cn } from "@/lib/utils"

import "@/styles/globals.css"
import "@/styles/mdx.css"

import { Suspense } from "react"

import { Loading } from "@/components/ui/loading"
import { defaultMetadata, defaultViewport } from "@/lib/seo/default"
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/lib/seo/structured-data"

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

export const metadata: Metadata = defaultMetadata
export const viewport = defaultViewport

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <WebsiteStructuredData />
        <PersonStructuredData />
      </head>
      <body
        className={cn(
          "flex flex-col items-center",
          "optimize-legibility min-h-dvh font-sans antialiased",
          "bg-background text-foreground",
          "selection:bg-slate-200 selection:text-slate-900 dark:selection:bg-slate-700 dark:selection:text-slate-100",
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
          <main className="w-full max-w-3xl flex-1 px-4 pb-18 md:px-6">
            <Navigation />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <Footer />
          <SpeedInsights />
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
