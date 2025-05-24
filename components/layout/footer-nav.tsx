"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

import Link from "../ui/link"

// same is present in navigation.tsx as well.
const navItems = {
  "/notes": {
    name: "notes",
  },
  "/work": {
    name: "work",
  },
  "/colophon": {
    name: "colophon",
  },
  // "/changelog": {
  //   name: "changelog",
  // },
}

export const FooterNavigation = () => {
  let pathname = usePathname() || "/"

  // a note should also show `notes` as active tab
  if (pathname.includes("/notes/")) {
    pathname = "/notes"
  }

  return (
    <section className="flex w-1/3 flex-col md:w-auto">
      <h1 className="mb-4 text-base font-medium">Explore</h1>
      <div className="flex flex-col space-y-2">
        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = path === pathname
          return (
            <Link
              key={path}
              href={path}
              className={cn(
                "text-base capitalize text-foreground hover:text-foreground hover:no-underline",
                {
                  "text-foreground/60": !isActive,
                }
              )}
              variant="nav"
            >
              {name}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
