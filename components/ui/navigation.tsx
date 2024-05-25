"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { DarkToggle } from "../mode-toggle"

const navItems = {
  "/": {
    name: "home",
  },
  "/notes": {
    name: "notes",
  },
  "/work": {
    name: "work",
  },
}

export const Navigation = () => {
  let pathname = usePathname() || "/"

  // a note should also show `notes` as active tab
  if (pathname.includes("/notes/")) {
    pathname = "/notes"
  }

  return (
    <aside className="my-8 tracking-tight">
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
                    "flex align-middle text-xl transition-all hover:text-text md:text-2xl",
                    {
                      "text-text/60": !isActive,
                    }
                  )}
                >
                  {name}
                </Link>
              )
            })}
          </div>

          <div className="flex flex-row items-center justify-end space-x-5">
            <span className="text-text">
              <DarkToggle />
            </span>
          </div>
        </nav>
      </div>
    </aside>
  )
}
