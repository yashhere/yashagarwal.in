"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"

import { Analytics } from "@/components/interactive/analytics"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"
import { ThemeColor } from "@/components/ui/theme-color"
import { TooltipProvider } from "@/components/ui/tooltip"

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <ThemeProvider
        attribute="class"
        enableColorScheme={false}
        disableTransitionOnChange={true}
        defaultTheme="system"
        enableSystem
      >
        <ThemeColor />
        {children}
        <Footer />
        <SpeedInsights />
        <Analytics />
        <TailwindIndicator />
      </ThemeProvider>
    </TooltipProvider>
  )
}
