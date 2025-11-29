import { Metadata } from "next"

import { Navigation } from "@/components/layout/navigation"
import { SharedLayout } from "@/components/layout/shared-layout"

import "@/styles/globals.css"
import "@/styles/mdx.css"

import { Suspense } from "react"

import { Loading } from "@/components/ui/loading"
import { defaultMetadata, defaultViewport } from "@/lib/seo/default"
import {
  PersonStructuredData,
  WebsiteStructuredData,
} from "@/lib/seo/structured-data"

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
      <SharedLayout>
        <div className="mx-auto w-full max-w-3xl px-4 xl:px-6">
          <Navigation />
        </div>
        <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 pb-18 xl:px-6">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
      </SharedLayout>
    </html>
  )
}
