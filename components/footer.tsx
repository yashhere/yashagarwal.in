import { FC } from "react"
import { env } from "@/env.mjs"
import { FiGithub, FiLinkedin, FiRss } from "react-icons/fi"

import { AnalogClock } from "./ui/clock/clock"
import Link from "./ui/link"

const Socials = [
  {
    name: "Github",
    url: "https://github.com/yashhere",
    icon: FiGithub,
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/theyashagarwal/",
    icon: FiLinkedin,
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
  "/changelog": {
    name: "changelog",
  },
}

export const Footer: FC = () => {
  return (
    <footer className="mt-auto w-full space-y-4">
      <hr className="border-[0.5px]" />
      <div className="mx-auto flex max-w-2xl flex-col px-3 sm:px-0">
        <div className="flex flex-row items-start justify-between space-x-4 sm:mx-auto sm:space-x-8 md:items-center">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="text-lg text-text/60 hover:text-text hover:no-underline"
              >
                {name}
              </Link>
            )
          })}
        </div>
        <div className="my-8 flex flex-row items-center justify-between">
          <div className="flex flex-row justify-start gap-x-4">
            {Socials.map((s) => {
              return (
                <Link
                  href={s.url}
                  key={s.name}
                  aria-label={s.name}
                  noExternalLinkIcon
                >
                  <s.icon className="size-6 text-text/60 hover:text-text" />
                </Link>
              )
            })}
          </div>
          <div className="flex flex-row justify-start gap-x-4">
            <Link
              href={`${env.NEXT_PUBLIC_APP_URL}/atom.xml`}
              aria-label="rss-icon"
              noExternalLinkIcon
            >
              <FiRss className="size-6 text-text/60 hover:text-text" />
            </Link>
            <AnalogClock />
          </div>
        </div>
      </div>
    </footer>
  )
}
