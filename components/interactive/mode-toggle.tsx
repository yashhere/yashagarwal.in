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
import { cn } from "@/lib/utils"

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
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-200",
                    resolvedTheme === "light"
                      ? "scale-100 opacity-100"
                      : "-translate-y-1 scale-50 -rotate-90 opacity-0"
                  )}
                >
                  <SunDimIcon className="text-primary size-5.5 drop-shadow-sm" />
                </div>
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-200",
                    resolvedTheme === "dark"
                      ? "scale-100 opacity-100"
                      : "translate-y-1 scale-50 rotate-90 opacity-0"
                  )}
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
