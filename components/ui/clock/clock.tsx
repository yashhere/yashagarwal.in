"use client"

import { FC } from "react"
import useClock from "@/lib/useClock"

export const AnalogClock: FC = () => {
  const [timing] = useClock()
  return (
    <div className="group relative flex cursor-pointer items-center justify-center text-sm">
      <div
        className={`relative flex h-5 w-5 flex-col items-center justify-start overflow-hidden rounded-full`}
      >
        <div className="h-5 w-5 rounded-full border border-text"></div>
        <section className="absolute z-50 flex h-5 w-5 items-center justify-center">
          {/* Center Circle */}
          <span className="absolute z-50 flex rounded-full bg-text/80 before:absolute before:h-[0.8px] before:w-[0.8px] before:justify-center before:rounded-full before:bg-text"></span>

          {/* Seconds hand */}
          <span
            className="absolute bottom-[0.6rem] left-[0.64rem] z-30 h-[0.50rem] w-[0.3px] origin-bottom rounded-full bg-text/70"
            style={timing.updateSeconds}
          ></span>

          {/* Minutes hand */}
          <span
            className="absolute bottom-[0.58rem] left-[0.63rem] z-20 h-[0.45rem] w-[0.6px] origin-bottom rounded-full bg-text"
            style={timing.updateMinutes}
          ></span>

          {/* Hour hand */}
          <span
            className="absolute bottom-[0.59rem] left-[0.60rem] z-10 h-[0.4rem] w-px origin-bottom rounded-full bg-text"
            style={timing.updateHours}
          ></span>
        </section>
      </div>
    </div>
  )
}
