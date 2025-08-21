"use client"

import { usePathname } from "next/navigation"

import AnimateEnter from "../ui/animate-enter"

export function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimateEnter key={pathname}>
      <>
        <main className="w-full max-w-xl flex-1 px-4 pb-18 md:px-0">
          <div className="py-6">{children}</div>
        </main>
      </>
    </AnimateEnter>
  )
}
