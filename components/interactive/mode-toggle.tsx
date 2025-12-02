"use client"

import { useEffect, useState } from "react"
import { MoonStarsIcon, SunDimIcon } from "@phosphor-icons/react/dist/ssr"
import { motion } from "motion/react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
    <div className="overflow-hidden">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="cursor-pointer rounded-md p-1"
              onClick={async (e) => {
                const newTheme =
                  theme === "system"
                    ? resolvedTheme === "dark"
                      ? "light"
                      : "dark"
                    : "system"

                const toggleTheme = () => {
                  setTheme(newTheme)

                  // Force DOM update for View Transition snapshot
                  const systemTheme = window.matchMedia(
                    "(prefers-color-scheme: dark)"
                  ).matches
                    ? "dark"
                    : "light"
                  const effectiveTheme =
                    newTheme === "system" ? systemTheme : newTheme

                  if (effectiveTheme === "dark") {
                    document.documentElement.classList.add("dark")
                  } else {
                    document.documentElement.classList.remove("dark")
                  }
                }

                if (
                  !document.startViewTransition ||
                  window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ) {
                  toggleTheme()
                  return
                }

                const { top, left, width, height } =
                  e.currentTarget.getBoundingClientRect()
                const x = left + width / 2
                const y = top + height / 2
                const right = window.innerWidth - left
                const bottom = window.innerHeight - top
                const maxRadius = Math.hypot(
                  Math.max(left, right),
                  Math.max(top, bottom)
                )

                try {
                  await document.startViewTransition(() => {
                    flushSync(() => {
                      toggleTheme()
                    })
                  }).ready
                } catch (error) {
                  console.error("View transition failed:", error)
                  toggleTheme()
                }

                document.documentElement.animate(
                  {
                    clipPath: [
                      `circle(0px at ${x}px ${y}px)`,
                      `circle(${maxRadius}px at ${x}px ${y}px)`,
                    ],
                  },
                  {
                    duration: 500,
                    easing: "ease-in-out",
                    pseudoElement: "::view-transition-new(root)",
                  }
                )
              }}
            >
              <div className="relative size-5.5">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: resolvedTheme === "light" ? 1 : 0,
                    rotate: resolvedTheme === "light" ? 0 : -90,
                    scale: resolvedTheme === "light" ? 1 : 0.5,
                    y: resolvedTheme === "light" ? 0 : -4,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <SunDimIcon className="text-primary size-5.5 drop-shadow-sm" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: resolvedTheme === "dark" ? 1 : 0,
                    rotate: resolvedTheme === "dark" ? 0 : 90,
                    scale: resolvedTheme === "dark" ? 1 : 0.5,
                    y: resolvedTheme === "dark" ? 0 : 4,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                >
                  <MoonStarsIcon className="text-foreground size-5.5 drop-shadow-sm" />
                </motion.div>
              </div>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent className="bg-background text-foreground">
            <p>{getTooltipText()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
