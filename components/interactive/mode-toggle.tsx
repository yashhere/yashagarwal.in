"use client"

import { useEffect, useState } from "react"
import { MoonStarsIcon, SunDimIcon } from "@phosphor-icons/react/dist/ssr"
import { useTheme } from "next-themes"

export const DarkToggleSkeleton = () => {
  return (
    <div className="cursor-pointer rounded-md p-1">
      <div className="bg-foreground/20 border-border size-5.5 animate-pulse rounded-full border" />
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
    <div className="group/toggle relative overflow-hidden">
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
        title={getTooltipText()}
      >
        <div className="relative size-5.5">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
              resolvedTheme === "light"
                ? "scale-100 rotate-0 opacity-100"
                : "-translate-y-1 scale-50 -rotate-90 opacity-0"
            }`}
          >
            <SunDimIcon className="text-primary size-5.5 drop-shadow-sm" />
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
              resolvedTheme === "dark"
                ? "scale-100 rotate-0 opacity-100"
                : "translate-y-1 scale-50 rotate-90 opacity-0"
            }`}
          >
            <MoonStarsIcon className="text-foreground size-5.5 drop-shadow-sm" />
          </div>
        </div>
      </div>
      {/* CSS-based tooltip */}
      <div className="bg-background text-foreground pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md border px-3 py-1.5 text-sm whitespace-nowrap opacity-0 shadow-md transition-opacity group-hover/toggle:opacity-100">
        {getTooltipText()}
      </div>
    </div>
  )
}
