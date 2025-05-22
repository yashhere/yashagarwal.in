"use client"

import { useRouter } from "next/navigation"
import { ArrowURightUpIcon } from "@phosphor-icons/react/dist/ssr"

export function GoToTop({ slug }: { slug: string }) {
  const path = `/notes/${slug}`
  const router = useRouter()
  return (
    <div>
      <button
        className="text-foreground/80 hover:text-foreground hover:cursor-pointer flex flex-row justify-between items-center gap-2 text-base transition-colors duration-200 ease-in-out"
        onClick={() => {
          window.scrollTo({ top: 0 })
          router.push(path)
        }}
      >
        Back to top
        <ArrowURightUpIcon className="w-5 h-5" />
      </button>
    </div>
  )
}
