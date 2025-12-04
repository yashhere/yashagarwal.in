import { Metadata } from "next"
import { Geist, IBM_Plex_Mono } from "next/font/google"

import "@/styles/globals.css"

import { ThemeColor } from "@/components/ui/theme-color"
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

export const metadata: Metadata = defaultMetadata
export const viewport = defaultViewport

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('theme');
                  const theme = stored === 'system' || !stored
                    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    : stored;
                  const color = theme === 'dark' ? '${THEME_COLORS.dark}' : '${THEME_COLORS.light}';
                  const meta = document.createElement('meta');
                  meta.name = 'theme-color';
                  meta.content = color;
                  document.head.appendChild(meta);
                } catch (e) {}
              })();
            `,
          }}
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
          monoFont.variable
        )}
      >
        <Providers>
          <ThemeColor />
          {children}
        </Providers>
      </body>
    </html>
  )
}
