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

export const AnalogClock: FC = () => {
  const [timing, currentTime] = useClock()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="group relative flex cursor-pointer items-center justify-center text-sm">
            <div className="relative flex size-6 flex-col items-center justify-start overflow-hidden rounded-full">
              {/* The Circle */}
              <div className="size-6 rounded-full border border-text"></div>

              <section className="absolute z-50 flex size-6 items-center justify-center">
                {/* Center Circle */}
                <span className="absolute z-50 flex rounded-full bg-text/80 before:absolute before:size-px before:justify-center before:rounded-full before:bg-text"></span>

                {/* Seconds hand */}
                <span
                  className="absolute bottom-[0.72rem] left-[0.77rem] z-30 h-[0.60rem] w-[0.3px] origin-bottom rounded-full bg-text"
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
        </TooltipTrigger>
        <TooltipContent className="bg-background font-mono text-text">
          <p>{moment(currentTime).format("hh:mm:ss A")} IST</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
