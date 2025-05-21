"use client"

import { useRouter } from "next/navigation"

export function GoToTop({ slug }: { slug: string }) {
  const path = `/notes/${slug}`
  const router = useRouter()
  return (
    <div>
      <button
        className="text-base text-primary"
        onClick={() => {
          window.scrollTo({ top: 0 })
          router.push(path)
        }}
      >
        Back to top
      </button>
    </div>
  )
}
