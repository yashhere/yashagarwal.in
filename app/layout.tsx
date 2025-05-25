import { Metadata } from "next"
import { IBM_Plex_Mono, Inter } from "next/font/google"
import { Analytics } from "@/components/interactive/analytics"
import { Footer } from "@/components/layout/footer"
import { Navigation } from "@/components/layout/navigation"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { cn } from "@/lib/utils"
import { SpeedInsights } from "@vercel/speed-insights/next"

import "@/styles/globals.css"

import { AnimatedLayout } from "@/components/layout/animated-layout"
import { Toaster } from "@/components/ui/toast"
import { defaultMetadata } from "@/lib/seo/default"
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/lib/seo/structured-data"

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

export const metadata: Metadata = defaultMetadata

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
      <head>
        <WebsiteStructuredData />
        <PersonStructuredData />
      </head>
      <body
        className={cn(
          "flex flex-col items-center",
          "min-h-dvh font-sans antialiased optimize-legibility",
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
          <Toaster closeButton className="pointer-events-auto" />
          <main className="w-full max-w-2xl flex-1 px-4 md:px-0 pb-18">
            <Navigation />
            <AnimatedLayout>{children}</AnimatedLayout>
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
