"use client"

import { domAnimation, LazyMotion, m } from "motion/react"

export default function AnimateEnter({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex h-full w-full flex-col items-center"
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
