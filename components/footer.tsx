import { FC } from "react"
import { env } from "@/env.mjs"
import moment from "moment"
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
  "/lifelog": {
    name: "log",
  },
}

export const Footer: FC = () => {
  return (
    <footer className="mt-auto font-heading">
      <hr className="border-[0.5px]" />
      <div className="my-8 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row justify-between">
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
          <div className="items-start text-lg">
            <p className="text-base">&copy; 2016 - {moment().format("YYYY")}</p>
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
