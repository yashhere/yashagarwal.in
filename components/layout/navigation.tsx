"use client"

import { Suspense } from "react"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import { DarkToggle, DarkToggleSkeleton } from "../interactive/mode-toggle"
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
          <Link href="/" className="group cursor-pointer select-none">
            <div className="relative size-10 overflow-hidden rounded-full">
              <Image
                src="/images/yash/yash.webp"
                alt={siteConfig.name}
                width={40}
                height={40}
                className="size-full object-cover transition-transform duration-300 select-none group-hover:scale-110"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  const fallback = target.nextElementSibling as HTMLDivElement
                  if (fallback) fallback.style.display = "flex"
                }}
              />
              <div className="bg-muted text-foreground absolute inset-0 hidden items-center justify-center text-sm font-semibold">
                {siteConfig.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
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
