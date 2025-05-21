"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { DarkToggle } from "../interactive/mode-toggle"

const navItems = {
  "/": {
    name: "Home",
  },
  "/notes": {
    name: "Notes",
  },
  "/work": {
    name: "Work",
  },
}

export const Navigation = () => {
  let pathname = usePathname() || "/"

  // a note should also show `notes` as active tab
  if (pathname.includes("/notes/")) {
    pathname = "/notes"
  }

  return (
    <aside className="my-8">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-center justify-between px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex flex-row space-x-4">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname
              return (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    "flex align-middle transition-all hover:text-foreground text-base leading-relaxed",
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

          <div className="flex flex-row items-center justify-end space-x-5">
            <span className="text-foreground">
              <DarkToggle />
            </span>
          </div>
        </nav>
      </div>
    </aside>
  )
}
