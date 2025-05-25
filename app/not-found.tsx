import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr"

import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"

export default function NotFound() {
  const suggestions = [
    "Check the URL for typos",
    "Go back to the homepage",
    "Browse my notes",
    "Search for what you're looking for",
  ]

  return (
    <div className="flex min-h-[60vh] flex-col justify-center">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="text-muted-foreground/40 text-6xl font-bold">404</div>
          <Heading level="h2" className="text-2xl">
            Page not found
          </Heading>
          <p className="text-muted-foreground max-w-lg text-base leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        {/* Simple suggestions list */}
        <div className="space-y-4">
          <p className="text-foreground/80 text-sm font-medium">
            Here&apos;s what you can do:
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
          <Link
            href="/"
            variant="nav"
            className="border-border hover:bg-muted flex-1 rounded-md border px-4 py-2 text-center text-sm transition-colors sm:flex-initial"
          >
            <ArrowLeftIcon className="mr-1 inline" />
            Back to home
          </Link>
          <Link
            href="/notes"
            variant="nav"
            className="border-border hover:bg-muted flex-1 rounded-md border px-4 py-2 text-center text-sm transition-colors sm:flex-initial"
          >
            <MagnifyingGlassIcon className="mr-1 inline" />
            Browse notes
          </Link>
        </div>
      </div>
    </div>
  )
}
