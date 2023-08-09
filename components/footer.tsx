import { FC } from "react"
import { env } from "@/env.mjs"
import { cn } from "@/lib/utils"
import { RssIcon } from "@heroicons/react/24/outline"
import moment from "moment"
import { IconContext } from "react-icons"
import {
  SlSocialGithub,
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialTwitter,
} from "react-icons/sl"

import Link from "./ui/link"

const Socials = [
  {
    name: "Github",
    url: "https://github.com/yashhere",
    icon: SlSocialGithub,
    color: "#333",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/theyashagarwal/",
    icon: SlSocialLinkedin,
    color: "#0077b5",
  },
  {
    name: "RSS",
    url: `${env.NEXT_PUBLIC_APP_URL}/atom.xml`,
    icon: RssIcon,
    color: "#f26522",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yash__here",
    icon: SlSocialTwitter,
    color: "#1da1f2",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yum_yash",
    icon: SlSocialInstagram,
    color: "#c13584",
  },
]

export const Footer: FC = () => {
  return (
    <footer className="mt-12 pb-4 font-heading">
      <hr className="border-[0.5px]" />
      <div className="mt-12 flex flex-row items-center justify-center gap-x-10">
        {Socials.map((s) => {
          return (
            <Link
              href={s.url}
              key={s.name}
              aria-label={s.name}
              noExternalLinkIcon
            >
              <s.icon
                className={cn(
                  "h-6 w-6 text-text/70",
                  `hover:text-[${s.color}]`
                )}
              />
            </Link>
          )
        })}
      </div>

      <div className="mx-auto mt-8 flex flex-col items-center justify-center text-lg">
        <p>
          Nurtured with care by{" "}
          <Link noUnderline className="text-secondary" href="/">
            Yash
          </Link>
        </p>
        <p className="mt-4 text-base">🌱 2016 - {moment().format("YYYY")}</p>
      </div>
    </footer>
  )
}
