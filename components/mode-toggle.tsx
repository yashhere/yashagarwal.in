"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi"

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
    <>
      <motion.div
        whileTap={{ rotate: 15 }}
        onClick={() => {
          if (theme === "dark") {
            setTheme("system")
          } else if (theme === "light") {
            setTheme("dark")
          } else {
            setTheme("light")
          }
        }}
      >
        {theme === "light" ? <FiSun className="size-6 text-text" /> : null}
        {theme === "dark" ? <FiMoon className="size-6 text-text" /> : null}
        {theme === "system" ? <FiMonitor className="size-6 text-text" /> : null}
      </motion.div>
    </>
  )
}
