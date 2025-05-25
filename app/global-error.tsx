"use client"

import { ArrowLeftIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const suggestions = [
    "Try refreshing the page",
    "Clear your browser cache",
    "Check your internet connection",
    "Contact me if the problem persists",
  ]

  return (
    <html>
      <body className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center px-4 font-sans antialiased">
        <div className="w-full max-w-2xl">
          <div className="flex min-h-[60vh] flex-col justify-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="text-muted-foreground/40 text-6xl font-bold">
                  <WarningIcon className="h-16 w-16" />
                </div>
                <h2 className="text-2xl font-semibold">Something went wrong</h2>
                <p className="text-muted-foreground max-w-lg text-base leading-relaxed">
                  A critical error occurred. This might be a temporary issue
                  with the application.
                </p>
                {error.message && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 font-mono text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
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
                <a
                  href="/"
                  className="border-border hover:bg-muted text-foreground flex-1 rounded-md border px-4 py-2 text-center text-sm no-underline transition-colors sm:flex-initial"
                >
                  <ArrowLeftIcon className="mr-1 inline" />
                  Back to home
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
