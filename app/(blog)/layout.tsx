import { Suspense } from "react"

import { Navigation } from "@/components/layout/navigation"
import { Loading } from "@/components/ui/loading"

import "@/styles/globals.css"
import "@/styles/mdx.css"

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
        <Navigation />
      </div>
      <main className="mx-auto w-full max-w-screen-2xl flex-1 pb-18">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  )
}
