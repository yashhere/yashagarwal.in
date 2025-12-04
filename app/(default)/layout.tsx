import { Navigation } from "@/components/layout/navigation"

import "@/styles/globals.css"
import "@/styles/mdx.css"

interface DefaultLayoutProps {
  children: React.ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <main className="w-full max-w-3xl flex-1 px-4 pb-18 md:px-6">
      <Navigation />
      {children}
    </main>
  )
}
