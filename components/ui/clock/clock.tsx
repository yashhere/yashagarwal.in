"use client"

import { FC, useEffect, useState } from "react"
import { format } from "date-fns"

import useClock from "@/lib/useClock"

export const ClockSkeleton = () => {
  return (
    <div className="cursor-pointer rounded-md p-1">
      <div className="bg-foreground/20 border-border size-5.5 animate-pulse rounded-full border" />
    </div>
  )
}

export const AnalogClock: FC = () => {
  const [timing, currentTime] = useClock()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <ClockSkeleton />
  }

  return (
    <div className="group/clock relative">
      <div
        className="relative flex cursor-pointer items-center justify-center rounded-md p-1 text-sm"
        aria-label="clock"
        title={`${format(currentTime, "hh:mm:ss a")} IST`}
      >
        <div className="relative flex size-5.5 flex-col items-center justify-start overflow-hidden rounded-full">
          {/* The Circle */}
          <div className="border-foreground size-5.5 rounded-full border"></div>

          <section className="absolute z-50 flex size-5.5 items-center justify-center">
            {/* Center Circle */}
            <span className="bg-foreground/80 before:bg-foreground absolute z-50 flex rounded-full before:absolute before:size-px before:justify-center before:rounded-full"></span>

            {/* Seconds hand */}
            <span
              className="bg-primary absolute bottom-[0.66rem] left-[0.71rem] z-30 h-[0.55rem] w-[0.3px] origin-bottom rounded-full"
              style={timing.updateSeconds}
            ></span>

            {/* Minutes hand */}
            <span
              className="bg-foreground absolute bottom-[0.66rem] left-[0.705rem] z-20 h-[0.50rem] w-[0.6px] origin-bottom rounded-full"
              style={timing.updateMinutes}
            ></span>

            {/* Hour hand */}
            <span
              className="bg-foreground absolute bottom-[0.66rem] left-[0.69rem] z-10 h-[0.45rem] w-px origin-bottom rounded-full"
              style={timing.updateHours}
            ></span>
          </section>
        </div>
      </div>
      {/* CSS-based tooltip */}
      <div className="bg-background text-foreground pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md border px-3 py-1.5 font-mono text-sm whitespace-nowrap opacity-0 shadow-md transition-opacity group-hover/clock:opacity-100">
        {format(currentTime, "hh:mm:ss a")} IST
      </div>
    </div>
  )
}
