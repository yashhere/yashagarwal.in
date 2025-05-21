"use client"

import { FC } from "react"
import { usePathname } from "next/navigation"
import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"
import { FiGithub, FiLinkedin, FiRss } from "react-icons/fi"
import { RiAtLine, RiTwitterXFill } from "react-icons/ri"

import Newsletter from "../interactive/newsletter"
import { AnalogClock } from "../ui/clock/clock"
import Link from "../ui/link"

const Socials = [
  {
    name: "Email",
    url: "mailto:yashagarwaljpr+blog@gmail.com",
    icon: RiAtLine,
  },
  {
    name: "GitHub",
    url: "https://github.com/yashhere",
    icon: FiGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/theyashagarwal/",
    icon: FiLinkedin,
  },
  {
    name: "Twitter",
    url: "https://www.twitter.com/yash__here",
    icon: RiTwitterXFill,
  },
]

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

export const Footer: FC = () => {
  let pathname = usePathname() || "/"

  // a note should also show `notes` as active tab
  if (pathname.includes("/notes/")) {
    pathname = "/notes"
  }

  return (
    <footer className="mt-auto w-full space-y-4 bg-muted/40">
      <hr className="border-t-1 border-border" />
      <div className="mx-auto max-w-2xl space-y-8 p-4 md:px-0">
        <div className="flex flex-row flex-wrap items-start justify-between md:flex-row">
          <section className="flex flex-col">
            <h1 className="mb-4 text-base font-bold">Get in touch</h1>
            <div className="space-y-2">
              {Socials.map((s) => {
                return (
                  <Link
                    href={s.url}
                    key={s.name}
                    aria-label={s.name}
                    noExternalLinkIcon
                    className="flex flex-row items-center gap-4 text-foreground/60 hover:text-foreground hover:no-underline md:gap-2"
                  >
                    <s.icon className="size-5" />
                    <h1 className="text-base">{s.name}</h1>
                  </Link>
                )
              })}
            </div>
          </section>
          <section className="flex w-1/3 flex-col md:w-auto">
            <h1 className="mb-4 text-base font-bold">Explore</h1>
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
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </section>
          <div className="mt-8 flex flex-col md:mt-0">
            <section className="">
              <h1 className="mb-4 text-base font-bold">Prefer RSS 🙂</h1>
              <div className="mb-6">
                <Link
                  href={`${env.NEXT_PUBLIC_APP_URL}/atom.xml`}
                  aria-label="rss-icon"
                  noExternalLinkIcon
                  className="flex h-10 flex-row items-center gap-2 rounded-3xl border border-border/50 bg-muted px-4 py-1 text-foreground/60 hover:border-border hover:text-foreground"
                >
                  <FiRss className="size-6" />
                  <span className="text-base">Subscribe via RSS Feed</span>
                </Link>
              </div>
            </section>
            <section>
              <h1 className="mb-4 text-base font-bold">Get email updates</h1>
              <div className="mb-6 flex flex-col">
                <Newsletter />
              </div>
            </section>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between md:flex-row"></div>
      </div>

      <div className="mx-auto max-w-2xl space-y-8 p-4 text-base md:px-0">
        <div className="flex w-full flex-row justify-between">
          <div>Be nice ツ</div>
          <div className="flex flex-row items-center gap-2">
            <div>©</div>
            <div>2016</div>
            <div>-</div>
            <div className="flex flex-row">
              <AnalogClock />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
