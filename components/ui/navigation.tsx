"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DarkToggle } from "../mode-toggle"

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
  "/about": {
    name: "about",
  },
}

export const Navigation = () => {
  let pathname = usePathname() || "/"
  if (pathname.includes("/blog/")) {
    pathname = "/blog"
  }

  return (
    <aside className="-mx-4 md:mx-0 md:w-[150px] md:shrink-0 md:px-0">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-start px-6 pb-0 sm:flex-col md:relative md:px-0"
          id="nav"
        >
          <div className="fade relative flex scroll-pr-6 flex-row items-start space-x-2 px-0 pb-0 font-heading text-2xl font-bold sm:text-[40px] md:flex-col md:space-x-0 md:overflow-auto">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = path == pathname
              return (
                <Link
                  key={path}
                  href={path}
                  className={cn(
                    "leading-extra-tight flex align-middle transition-all hover:text-text sm:leading-tight",
                    {
                      "text-text/60": !isActive,
                    },
                  )}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </aside>
  )
}
