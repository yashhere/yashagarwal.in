"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeColor() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    // Update theme-color meta tag when theme changes
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        resolvedTheme === "dark" ? "#020617" : "#ffffff"
      )
    }
  }, [resolvedTheme])

  return null
}
