"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import { DarkToggle } from "../mode-toggle"

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "writing",
  },
  "/about": {
    name: "intro",
  },
}

export const Navigation = () => {
  let pathname = usePathname() || "/"
  if (pathname.includes("/blog/")) {
    pathname = "/blog"
  }

  return (
    <aside className="mb-8 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-center justify-between px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex flex-row space-x-4 pr-10 sm:space-x-6">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path === pathname
              return (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    "flex align-middle text-2xl transition-all hover:text-text",
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
          <span className="text-lg text-text">
            <DarkToggle />
          </span>
        </nav>
      </div>
    </aside>
  )
}
