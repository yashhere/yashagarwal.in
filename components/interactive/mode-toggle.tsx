"use client"

import { useEffect, useState } from "react"
import { MoonStarsIcon, SunDimIcon } from "@phosphor-icons/react/dist/ssr"
import { useTheme } from "next-themes"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const DarkToggleSkeleton = () => {
  return (
    <div className="rounded-md p-1">
      <div className="bg-muted size-5.5 animate-pulse rounded-full" />
    </div>
  )
}

export const DarkToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <DarkToggleSkeleton />
  }

  const getTooltipText = () => {
    const themes = {
      light: [
        "Shine on",
        "Bright mode",
        "Stay sunny",
        "Full glow",
        "Light it up",
        "Day mode",
      ],
      dark: [
        "Dark side",
        "Night mode",
        "Low light",
        "Fade in",
        "Stay dim",
        "Shadow on",
      ],
    }
    const options = resolvedTheme === "dark" ? themes.dark : themes.light
    return options[Math.floor(Math.random() * options.length)]
  }

  return (
    <div className="overflow-hidden">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="cursor-pointer rounded-md p-1 transition-transform hover:scale-105 active:scale-95"
              onClick={() => {
                if (theme == "system") {
                  if (resolvedTheme == "dark") {
                    setTheme("light")
                  } else {
                    setTheme("dark")
                  }
                } else {
                  setTheme("system")
                }
              }}
            >
              <div className="relative size-5.5">
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{
                    opacity: resolvedTheme === "light" ? 1 : 0,
                    transform: `rotate(${resolvedTheme === "light" ? 0 : -90}deg) scale(${resolvedTheme === "light" ? 1 : 0.5}) translateY(${resolvedTheme === "light" ? 0 : -4}px)`,
                  }}
                >
                  <SunDimIcon className="text-primary size-5.5 drop-shadow-sm" />
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                  style={{
                    opacity: resolvedTheme === "dark" ? 1 : 0,
                    transform: `rotate(${resolvedTheme === "dark" ? 0 : 90}deg) scale(${resolvedTheme === "dark" ? 1 : 0.5}) translateY(${resolvedTheme === "dark" ? 0 : 4}px)`,
                  }}
                >
                  <MoonStarsIcon className="text-foreground size-5.5 drop-shadow-sm" />
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-background text-foreground">
            <p>{getTooltipText()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
