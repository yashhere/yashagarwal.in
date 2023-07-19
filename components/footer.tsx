import { FC } from "react"
import moment from "moment"
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs"

import Link from "./ui/link"

const Socials = [
  {
    name: "Github",
    url: "https://github.com/yashhere",
    icon: BsGithub,
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/theyashagarwal/",
    icon: BsLinkedin,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/yash__here",
    icon: BsTwitter,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/yum_yash",
    icon: BsInstagram,
  },
]

export const Footer: FC = () => {
  return (
    <footer className="mt-12 pb-4 font-heading font-bold">
      <hr className="border-t-2 border-gray-300/60" />
      <div className="mb-12 mt-8 grid space-y-8 sm:grid-cols-2 sm:space-y-0">
        <div className="flex flex-row flex-wrap justify-center space-x-4 text-lg text-text/60 sm:justify-normal">
          {/* <Link href="/books" className="hover:text-text">
            reading
          </Link>
          <Link href="/bookmarks" className="hover:text-text">
            bookmarks
          </Link>
          <Link href="/snippets" className="hover:text-text">
            snippets
          </Link> */}
          <Link href="/stats" className="hover:text-text">
            stats
          </Link>
        </div>
        <div className="flex flex-row justify-center sm:justify-end">
          <div className="grid grid-cols-4 gap-6">
            {Socials.map((s) => {
              return (
                <Link
                  href={s.url}
                  key={s.name}
                  aria-label={s.name}
                  noExternalLinkIcon
                >
                  <s.icon className="h-8 w-8 text-text/70 hover:text-text sm:h-6 sm:w-6" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
      <div className="grid justify-center sm:justify-normal xl:grid-cols-2">
        <div className="sm:items-normal flex flex-col items-center justify-center text-base text-text/70 sm:items-baseline sm:justify-normal">
          <p>Yash Agarwal</p>
          <p>© 2016 - {moment().format("YYYY")}</p>
        </div>
      </div>
    </footer>
  )
}
