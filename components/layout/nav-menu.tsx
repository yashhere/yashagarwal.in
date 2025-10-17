"use client"

import { usePathname } from "next/navigation"
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "../ui/link"

type NavItem = {
  name: string
  href: string
}

const primaryNavItems: NavItem[] = [{ name: "Notes", href: "/notes" }]

const moreNavItems: NavItem[] = [
  { name: "Work", href: "/work" },
  { name: "Tags", href: "/tags" },
  { name: "Categories", href: "/categories" },
]

export const NavMenu = () => {
  const pathname = usePathname() || "/"

  // Determine the active path (first-level route)
  const pathSegments = pathname.split("/").filter(Boolean)
  const highlightedPath =
    pathSegments.length <= 1 ? pathname : `/${pathSegments[0]}`

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return highlightedPath === href
  }

  return (
    <div className="flex items-center gap-1">
      {/* Primary nav items */}
      {primaryNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          variant="nav"
          className={cn(
            "hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-1.5 text-base font-medium transition-colors",
            {
              "text-foreground": isActive(item.href),
              "text-muted-foreground": !isActive(item.href),
            }
          )}
        >
          {item.name}
        </Link>
      ))}

      {/* More dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex items-center gap-1 rounded-md border-0 px-3 py-1.5 text-base font-medium ring-0 transition-colors outline-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
              {
                "text-foreground": moreNavItems.some((item) =>
                  isActive(item.href)
                ),
                "text-muted-foreground": !moreNavItems.some((item) =>
                  isActive(item.href)
                ),
              }
            )}
            aria-label="More pages"
          >
            More
            <CaretDownIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-background/80 border-border/50 min-w-[160px] border-0 ring-0 backdrop-blur-md focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {moreNavItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                variant="nav"
                className={cn("w-full cursor-pointer font-medium", {
                  "text-foreground bg-accent": isActive(item.href),
                  "text-muted-foreground": !isActive(item.href),
                })}
              >
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
