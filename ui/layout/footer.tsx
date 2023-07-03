import { FC } from "react"
import Link from "next/link"
import moment from "moment"
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs"

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
]

export const Footer: FC = () => {
  return (
    <footer className="mt-12 pb-4 font-heading font-bold">
      <hr className="border-t-2 border-black/20 dark:border-white/20" />
      <div className="mb-12 mt-8 grid space-y-2 sm:grid-cols-2 sm:space-y-0">
        <div className="text-md flex flex-col text-black/60 dark:text-white/60">
          {/* <Link href="/books" className="hover:text-black/95">
            reading
          </Link>
          <Link href="/bookmarks" className="hover:text-black/95">
            bookmarks
          </Link>
          <Link href="/snippets" className="hover:text-black/95">
            snippets
          </Link> */}
          <Link
            href="/stats"
            className="hover:text-black/95 dark:hover:text-white/95"
          >
            stats
          </Link>
        </div>
        <div className="flex flex-row justify-end">
          <div className="grid grid-cols-3 gap-4">
            {Socials.map((s) => {
              return (
                <a href={s.url} key={s.name}>
                  <s.icon className="h-6 w-6 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-2">
        <div className="text-sm text-black/70 dark:text-white/70">
          <p>Yash Agarwal</p>
          <p>© 2016 - {moment().format("YYYY")}</p>
        </div>
      </div>
    </footer>
  )
}
