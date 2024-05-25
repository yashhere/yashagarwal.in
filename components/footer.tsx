import { FC } from "react"
import { env } from "@/env.mjs"
import { FiGithub, FiLinkedin, FiRss } from "react-icons/fi"

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
  {
    name: "RSS",
    url: `${env.NEXT_PUBLIC_APP_URL}/atom.xml`,
    icon: FiRss,
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
}

export const Footer: FC = () => {
  return (
    <footer className="mt-auto font-heading">
      <hr className="border-[0.5px]" />
      <div className="my-8 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row justify-start gap-x-4">
            {Socials.map((s) => {
              return (
                <Link
                  href={s.url}
                  key={s.name}
                  aria-label={s.name}
                  noExternalLinkIcon
                >
                  <s.icon className="size-5 text-text/60 hover:text-text" />
                </Link>
              )
            })}
          </div>
          <div className="items-start">
            <p className="text-text/60">Live since 2016</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="text-text/60 hover:text-text hover:no-underline"
              >
                {name}
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
