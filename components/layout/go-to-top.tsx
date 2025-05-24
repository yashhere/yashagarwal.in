"use client"

import { ArrowURightUpIcon } from "@phosphor-icons/react/dist/ssr"

export function GoToTop({ slug }: { slug: string }) {
  const path = `/notes/${slug}`

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    // Update URL to remove hash without triggering navigation
    window.history.pushState(null, "", path)
  }

  return (
    <div>
      <button
        className="text-foreground/80 hover:text-foreground hover:cursor-pointer flex flex-row justify-between items-center gap-2 text-base transition-colors duration-200 ease-in-out"
        onClick={scrollToTop}
      >
        Back to top
        <ArrowURightUpIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
