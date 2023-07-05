"use client"

import { Suspense } from "react"
import { LoadingDots } from "../loading"

export const Metric = ({
  stat,
  type,
}: {
  stat: string | undefined
  type: string
}) => {
  return (
    <div className="flex space-x-1">
      <Suspense fallback={<LoadingDots />}>
        <span className="-mx-0.5 animate-[mutation_2s_ease-in-out_1] rounded-md px-0.5 slashed-zero tabular-nums tracking-tight">
          {`${Number(stat || 0).toLocaleString()}`} {type}
        </span>
      </Suspense>
    </div>
  )
}
