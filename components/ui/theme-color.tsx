"use client"

import { useLayoutEffect } from "react"
import { useTheme } from "next-themes"

// Theme colors matching CSS variables
const THEME_COLORS = {
  light: "#ffffff", // oklch(1 0 0)
  dark: "#020617", // oklch(0.141 0.005 285.823)
} as const

export function ThemeColor() {
  const { resolvedTheme } = useTheme()

  useLayoutEffect(() => {
    // Update theme-color meta tag synchronously before paint
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (metaThemeColor) {
      const color =
        resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light
      metaThemeColor.setAttribute("content", color)
    }
  }, [resolvedTheme])

  return null
}
