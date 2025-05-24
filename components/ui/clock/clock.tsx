"use client"

import { FC, useEffect, useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import useClock from "@/lib/useClock"
import moment from "moment"

export const ClockSkeleton = () => {
  return (
    <div className="cursor-pointer p-1 rounded-md">
      <div className="size-5.5 bg-foreground/20 border border-border animate-pulse rounded-full" />
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger aria-label="clock">
          <div className="group relative flex cursor-pointer items-center justify-center text-sm p-1 rounded-md">
            <div className="relative flex size-5.5 flex-col items-center justify-start overflow-hidden rounded-full">
              {/* The Circle */}
              <div className="size-5.5 rounded-full border border-foreground"></div>

              <section className="absolute z-50 flex size-5.5 items-center justify-center">
                {/* Center Circle */}
                <span className="absolute z-50 flex rounded-full bg-foreground/80 before:absolute before:size-px before:justify-center before:rounded-full before:bg-foreground"></span>

                {/* Seconds hand */}
                <span
                  className="absolute bottom-[0.66rem] left-[0.71rem] z-30 h-[0.55rem] w-[0.3px] origin-bottom rounded-full bg-foreground"
                  style={timing.updateSeconds}
                ></span>

                {/* Minutes hand */}
                <span
                  className="absolute bottom-[0.66rem] left-[0.705rem] z-20 h-[0.50rem] w-[0.6px] origin-bottom rounded-full bg-foreground"
                  style={timing.updateMinutes}
                ></span>

                {/* Hour hand */}
                <span
                  className="absolute bottom-[0.66rem] left-[0.69rem] z-10 h-[0.45rem] w-px origin-bottom rounded-full bg-foreground"
                  style={timing.updateHours}
                ></span>
              </section>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-background font-mono text-foreground">
          <p>{moment(currentTime).format("hh:mm:ss A")} IST</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
