"use client"

import { ArrowLeftIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr"

import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"

type ErrorProps = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const suggestions = [
    "Try refreshing the page",
    "Go back to the homepage",
    "Check your internet connection",
    "Contact me if the problem persists",
  ]

  return (
    <div className="flex min-h-[60vh] flex-col justify-center">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="text-muted-foreground/40 text-6xl font-bold">
            <WarningIcon className="h-16 w-16" />
          </div>
          <Heading level="h2" className="text-2xl">
            Something went wrong
          </Heading>
          <p className="text-muted-foreground max-w-lg text-base leading-relaxed">
            An unexpected error occurred while loading this page.
          </p>
          {error.message && (
            <div className="text-destructive/80 bg-destructive/5 border-destructive/20 rounded-md border p-3 font-mono text-sm">
              {error.message}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-foreground/80 text-sm font-medium">
            Here&apos;s what you can try:
          </p>
          <ul className="space-y-2 text-sm">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="text-muted-foreground flex items-start gap-2"
              >
                <span className="text-border/120 -mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={reset}
            className="border-border hover:bg-muted flex-1 rounded-md border px-4 py-2 text-center text-sm transition-colors sm:flex-initial"
          >
            Try again
          </button>
          <Link
            href="/"
            variant="nav"
            className="border-border hover:bg-muted flex-1 rounded-md border px-4 py-2 text-center text-sm transition-colors sm:flex-initial"
          >
            <ArrowLeftIcon className="mr-1 inline" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
