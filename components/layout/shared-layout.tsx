"use client"

import { Geist, IBM_Plex_Mono } from "next/font/google"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Analytics } from "@/components/interactive/analytics"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { cn } from "@/lib/utils"

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

interface SharedLayoutProps {
  children: React.ReactNode
}

export const SharedLayout = ({ children }: SharedLayoutProps) => {
  return (
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
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
        <TailwindIndicator />
      </ThemeProvider>
    </body>
  )
}
