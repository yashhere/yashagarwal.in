"use client"

import { useLayoutEffect } from "react"
import { useTheme } from "next-themes"

import { THEME_COLORS } from "@/lib/constants/theme-colors"

export function ThemeColor() {
  const { resolvedTheme } = useTheme()

  useLayoutEffect(() => {
    // Update theme-color meta tag synchronously before paint
    const metaThemeColors = document.querySelectorAll(
      'meta[name="theme-color"]'
    )

    metaThemeColors.forEach((meta) => {
      const color =
        resolvedTheme === "dark" ? THEME_COLORS.dark : THEME_COLORS.light
      meta.setAttribute("content", color)
      meta.removeAttribute("media")
    })
  }, [resolvedTheme])

  return null
}
