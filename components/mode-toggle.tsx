"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { TbMoon, TbSun, TbSunMoon } from "react-icons/tb"

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
        {theme === "light" ? <TbSun className="h-6 w-6 text-text" /> : null}
        {theme === "dark" ? <TbMoon className="h-6 w-6 text-text" /> : null}
        {theme === "system" ? (
          <TbSunMoon className="h-6 w-6 text-text" />
        ) : null}
      </motion.div>
    </>
  )
}
