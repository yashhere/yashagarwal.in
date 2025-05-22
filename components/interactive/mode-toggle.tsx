"use client"

import { useEffect, useState } from "react"
import { MoonStarsIcon, SunDimIcon } from "@phosphor-icons/react/dist/ssr"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export const DarkToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="overflow-hidden">
      <motion.div
        whileTap={{ rotate: 15 }}
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
        {resolvedTheme === "light" ? (
          <SunDimIcon className="size-5 text-foreground" />
        ) : null}
        {resolvedTheme === "dark" ? (
          <MoonStarsIcon className="size-5 text-foreground" />
        ) : null}
      </motion.div>
    </div>
  )
}
