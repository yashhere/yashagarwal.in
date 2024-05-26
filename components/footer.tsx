import { FC } from "react"
import { env } from "@/env.mjs"
import { FiGithub, FiLinkedin, FiRss } from "react-icons/fi"
import { RiTwitterXFill } from "react-icons/ri"

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
  "/changelog": {
    name: "changelog",
  },
}

export const Footer: FC = () => {
  return (
    <footer className="mt-auto w-full space-y-4 bg-gray-100/40">
      <hr className="border-[0.5px] border-gray-200" />
      <div className="mx-auto max-w-2xl space-y-8 px-8 py-4 md:px-0">
        <div className="flex flex-row items-start justify-between md:flex-row">
          <section className="flex flex-col md:mr-4 md:w-2/5">
            <h1 className="mb-4 text-lg font-bold">Follow</h1>
            <div className="md:flex md:flex-row md:gap-4">
              {Socials.map((s) => {
                return (
                  <Link
                    href={s.url}
                    key={s.name}
                    aria-label={s.name}
                    noExternalLinkIcon
                    className="flex flex-row items-center gap-4 space-y-2 align-middle text-text md:gap-2"
                  >
                    <s.icon className="size-6 text-text/60 hover:text-text" />
                    <h1 className="text-lg md:hidden">{s.name}</h1>
                  </Link>
                )
              })}
            </div>
          </section>
          <section className="flex flex-col md:ml-4 md:w-1/2">
            <h1 className="mb-4 text-lg font-bold">Browse</h1>
            <div className="flex flex-col md:flex-row md:gap-4">
              {Object.entries(navItems).map(([path, { name }]) => {
                return (
                  <Link
                    key={path}
                    href={path}
                    className="space-y-2 text-lg capitalize text-text/60 hover:text-text hover:no-underline"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </section>
        </div>
        <div className="flex flex-col items-start justify-between md:flex-row">
          <section className="md:mr-4 md:w-2/5">
            <h1 className="mb-4 text-lg font-bold">Want to stay up to date?</h1>
            <div className="mb-6">
              <Link
                href={`${env.NEXT_PUBLIC_APP_URL}/atom.xml`}
                aria-label="rss-icon"
                noExternalLinkIcon
                className="flex h-10 flex-row items-center gap-2 rounded-3xl border border-gray-400/50 bg-background px-4 py-1 text-text/60 hover:border-gray-400 hover:text-text"
              >
                <FiRss className="size-6" />
                <span className="text-lg">Subscribe via RSS Feed</span>
              </Link>
            </div>
          </section>
          <section className="md:ml-4 md:w-1/2">
            <h1 className="mb-4 text-lg font-bold">Subscribe to Newsletter</h1>
            <div className="mb-6 flex flex-col">
              <form className="shadow-border flex h-10 items-center justify-between gap-2 overflow-hidden rounded-3xl border-[1px] border-gray-400/50 bg-background focus-within:border-gray-400 focus-within:outline-none">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your email"
                  className="h-full w-[20%] grow border-none bg-transparent px-3.5 text-lg transition-colors placeholder:text-text/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="focus:shadow-focus-ring mr-1 h-[30px] w-[80px] rounded-3xl bg-text px-1.5 text-sm font-semibold text-gray-100 outline-none md:w-[104px] md:px-3.5 md:text-base"
                >
                  <span className="block">Subscribe</span>
                </button>
              </form>
              <label className="px-3.5 pt-1 text-xs">
                No spam. Unsubscribe anytime
              </label>
            </div>
          </section>
        </div>
      </div>

      {/*
      1. Last Updated on
      2. Made with love in Jaipur
      3. Analog Clock
      4. copyright

      */}
      {/* <div className="mx-auto flex max-w-2xl flex-col px-3 sm:px-0">
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
      </div> */}
    </footer>
  )
}
