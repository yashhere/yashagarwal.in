import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react/dist/ssr"

export default function NotFound() {
  const suggestions = [
    "Check the URL for typos",
    "Go back to the homepage",
    "Browse my notes",
    "Search for what you're looking for",
  ]

  return (
    <div className="min-h-[60vh] flex flex-col justify-center">
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="text-6xl font-bold text-muted-foreground/40">404</div>
          <Heading level="h2" className="text-2xl">
            Page not found
          </Heading>
          <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        {/* Simple suggestions list */}
        <div className="space-y-4">
          <p className="text-sm text-foreground/80 font-medium">
            Here&apos;s what you can do:
          </p>
          <ul className="space-y-2 text-sm">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-muted-foreground"
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
            className="flex-1 sm:flex-initial text-center text-sm px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
          >
            <ArrowLeftIcon className="inline mr-1" />
            Back to home
          </Link>
          <Link
            href="/notes"
            variant="nav"
            className="flex-1 sm:flex-initial text-center text-sm px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
          >
            <MagnifyingGlassIcon className="inline mr-1" />
            Browse notes
          </Link>
        </div>
      </div>
    </div>
  )
}
