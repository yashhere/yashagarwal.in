import { FC } from "react"
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
      <div className="mt-8 flex flex-row items-center justify-center gap-x-10">
        {Socials.map((s) => {
          return (
            <Link
              href={s.url}
              key={s.name}
              aria-label={s.name}
              noExternalLinkIcon
            >
              <s.icon className="h-6 w-6 text-text/70 hover:text-text" />
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
        <p className="text-base">© 2016 - {moment().format("YYYY")}</p>
      </div>
    </footer>
  )
}
