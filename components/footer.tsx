import { FC } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { env } from "@/env.mjs"
import moment from "moment"
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
    <footer className="mt-auto w-full border-[1px] border-t-gray-600 py-2">
      <div className="mx-auto flex max-w-2xl flex-col gap-4 px-3 sm:px-0">
        <div className="flex flex-row items-center justify-between">
          <h1>This is footer</h1>
          <AnalogClock />
        </div>
      </div>
    </footer>
  )
}
