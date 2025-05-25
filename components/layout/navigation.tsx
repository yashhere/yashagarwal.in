"use client"

import { Suspense } from "react"
import { usePathname } from "next/navigation"
import { ArrowUUpLeftIcon } from "@phosphor-icons/react/dist/ssr"

import { cn } from "@/lib/utils"
import { DarkToggle, DarkToggleSkeleton } from "../interactive/mode-toggle"
import { AnalogClock, ClockSkeleton } from "../ui/clock/clock"
import Link from "../ui/link"

type NavItem = {
  name: string
  show: boolean
}

type NavItems = {
  [path: string]: NavItem
}

const navItems: NavItems = {
  "/": {
    name: "Home",
    show: true,
  },
  "/notes": {
    name: "Notes",
    show: true,
  },
  "/work": {
    name: "Work",
    show: true,
  },
  "/tags": {
    name: "Tags",
    show: false,
  },
  "/categories": {
    name: "Categories",
    show: false,
  },
}

export const Navigation = () => {
  let pathname = usePathname() || "/"

  // Check if the current path is a first-level route (either root or direct child)
  const pathSegments = pathname.split("/").filter(Boolean)
  const isFirstLevelRoute = pathSegments.length <= 1

  // Compute parent path logically
  const computeParentPath = () => {
    // If we're at root, parent is still root
    if (pathname === "/") return "/"

    // If we're at a first-level route like /notes, parent is /
    if (pathSegments.length === 1) return "/"

    // For nested routes like /notes/{slug}, parent is /notes
    if (pathSegments.length > 1) {
      return `/${pathSegments[0]}`
    }

    return "/"
  }

  const parentPath = computeParentPath()
  const parentName = navItems[parentPath]?.name || "Home"

  // For active tab highlighting, compute highlighted path
  let highlightedPath = isFirstLevelRoute ? pathname : parentPath

  return (
    <aside className="my-8 px-4 md:px-0">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-center justify-between px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          {isFirstLevelRoute ? (
            <div className="flex flex-row space-x-4">
              {Object.entries(navItems)
                .filter(([, { show }]) => show)
                .map(([path, { name }]) => {
                  const isActive = path === highlightedPath
                  return (
                    <Link
                      key={path}
                      href={path}
                      variant="nav"
                      className={cn(
                        "hover:text-foreground flex align-middle text-base leading-relaxed lowercase transition-all",
                        {
                          "text-foreground/70": !isActive,
                        }
                      )}
                    >
                      {name}
                    </Link>
                  )
                })}
            </div>
          ) : (
            <div className="flex flex-row space-x-4">
              <Link
                href={parentPath}
                className="hover:text-foreground text-foreground/70 flex items-center gap-2 text-base leading-relaxed lowercase"
                variant="nav"
              >
                <ArrowUUpLeftIcon size={16} />
                <span>Back to {parentName}</span>
              </Link>
            </div>
          )}

          <div className="flex flex-row items-center justify-end space-x-5">
            <Suspense fallback={<ClockSkeleton />}>
              <AnalogClock />
            </Suspense>
            <Suspense fallback={<DarkToggleSkeleton />}>
              <DarkToggle />
            </Suspense>
          </div>
        </nav>
      </div>
    </aside>
  )
}
