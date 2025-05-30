"use client"

import { useEffect, useState } from "react"

export function AnimatedGridBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full">
      {/* Base grid using Tailwind classes */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "2rem 2rem", // Using rem units that Tailwind understands
        }}
      />

      {/* Animated overlay using Tailwind classes */}
      <div
        className="animate-grid-flow absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 0.5px, transparent 0.5px),
            linear-gradient(to bottom, currentColor 0.5px, transparent 0.5px)
          `,
          backgroundSize: "6rem 6rem", // 96px in rem units
          backgroundPosition: "1rem 1rem", // 16px in rem units
        }}
      />
    </div>
  )
}
