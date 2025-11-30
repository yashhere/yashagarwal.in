"use client"

import { SpeedInsights } from "@vercel/speed-insights/next"

import { Analytics } from "@/components/interactive/analytics"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { TailwindIndicator } from "@/components/ui/tailwind-indicator"

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
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
  )
}
