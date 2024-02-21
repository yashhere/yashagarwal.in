import { FC } from "react"
import { env } from "@/env.mjs"
import { RssIcon } from "@heroicons/react/24/outline"
import moment from "moment"
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
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/theyashagarwal/",
    icon: SlSocialLinkedin,
  },
  {
    name: "RSS",
    url: `${env.NEXT_PUBLIC_APP_URL}/atom.xml`,
    icon: RssIcon,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yash__here",
    icon: SlSocialTwitter,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yum_yash",
    icon: SlSocialInstagram,
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
              <s.icon className="size-6 text-text/60 hover:text-text" />
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
