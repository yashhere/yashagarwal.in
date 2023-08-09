"use client"

import { FC } from "react"
import useClock from "@/lib/useClock"

export const AnalogClock: FC = () => {
  const [timing] = useClock()
  return (
    <div className="group relative flex cursor-pointer items-center justify-center text-sm">
      <div className="relative flex h-6 w-6 flex-col items-center justify-start overflow-hidden rounded-full">
        <div className="h-6 w-6 rounded-full border border-text"></div>
        <section className="absolute z-50 flex h-6 w-6 items-center justify-center">
          {/* Center Circle */}
          <span className="absolute z-50 flex rounded-full bg-text/80 before:absolute before:h-px before:w-px before:justify-center before:rounded-full before:bg-text"></span>

          {/* Seconds hand */}
          <span
            className="absolute bottom-[0.72rem] left-[0.77rem] z-30 h-[0.60rem] w-[0.3px] origin-bottom rounded-full bg-text/70"
            style={timing.updateSeconds}
          ></span>

          {/* Minutes hand */}
          <span
            className="absolute bottom-[0.72rem] left-[0.765rem] z-20 h-[0.55rem] w-[0.6px] origin-bottom rounded-full bg-text"
            style={timing.updateMinutes}
          ></span>

          {/* Hour hand */}
          <span
            className="absolute bottom-[0.72rem] left-[0.75rem] z-10 h-[0.5rem] w-px origin-bottom rounded-full bg-text"
            style={timing.updateHours}
          ></span>
        </section>
      </div>
    </div>
  )
}
