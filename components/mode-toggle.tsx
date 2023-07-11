"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export const DarkToggle = () => {
  const { theme, setTheme } = useTheme()
  if (process.env.NODE_ENV === "production") return null
  return (
    <label>
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={(ev) => setTheme(ev.target.checked ? "dark" : "light")}
      />{" "}
      Dark
    </label>
  )
}
