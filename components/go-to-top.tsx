"use client"

import { useRouter } from "next/navigation"

export function GoToTop({ slug }: { slug: string }) {
  const path = `/blog/${slug}`
  const router = useRouter()
  return (
    <div className="flex items-center justify-center pb-4">
      <button
        className="text-lg text-primary no-underline transition duration-200 hover:underline hover:underline-offset-8"
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
