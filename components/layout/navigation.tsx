"use client"

import { Suspense } from "react"

import { siteConfig } from "@/config/site"
import { DarkToggle, DarkToggleSkeleton } from "../interactive/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "../ui/link"
import { NavMenu } from "./nav-menu"

export const Navigation = () => {
  return (
    <aside className="my-8">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-center justify-between px-0 pb-0"
          id="nav"
        >
          {/* Left: Avatar */}
          <Link
            href="/"
            variant="nav"
            className="transition-all hover:opacity-80"
          >
            <Avatar className="size-10">
              <AvatarImage
                src="/images/yash/at-beach.jpeg"
                alt={siteConfig.name}
              />
              <AvatarFallback className="text-sm font-semibold">
                {siteConfig.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>

          {/* Right: Nav Menu + Theme Toggle */}
          <div className="flex flex-row items-center gap-2">
            <NavMenu />
            <Suspense fallback={<DarkToggleSkeleton />}>
              <DarkToggle />
            </Suspense>
          </div>
        </nav>
      </div>
    </aside>
  )
}
