"use client"

import { useLayoutEffect } from "react"
import { useTheme } from "next-themes"

import { THEME_COLORS } from "@/lib/constants/theme-colors"

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
