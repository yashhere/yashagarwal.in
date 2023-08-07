"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { TbMoon, TbSun } from "react-icons/tb"

export const DarkToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

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
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? (
          <TbSun className="h-6 w-6 text-text" />
        ) : (
          <TbMoon className="h-6 w-6 text-text" />
        )}
      </motion.div>
    </>
  )
}
