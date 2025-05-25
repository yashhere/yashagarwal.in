"use client"

import { usePathname } from "next/navigation"

import AnimateEnter from "../ui/animate-enter"

export function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimateEnter key={pathname}>
      <>
        <main className="w-full max-w-2xl flex-1 px-4 md:px-0 pb-18">
          <div className="py-6">{children}</div>
        </main>
      </>
    </AnimateEnter>
  )
}
