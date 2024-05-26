import { siteConfig } from "@/config/site"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`
}

export function encodeParameter(str: string) {
  return encodeURIComponent(str)
}

export function decodeParameter(str: string | null) {
  if (str) {
    return decodeURIComponent(str)
  } else {
    return
  }
}
