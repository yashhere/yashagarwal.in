import { FC, Suspense } from "react"
import { env } from "@/env.mjs"
import {
  AtIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  RssIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr"

import { LastVisitor } from "../interactive/last-visitor"
import Newsletter from "../interactive/newsletter"
import { AnalogClock } from "../ui/clock/clock"
import Link from "../ui/link"
import { FooterNavigation } from "./footer-nav"

const Socials = [
  {
    name: "X",
    url: "https://www.x.com/yash__here",
    icon: XLogoIcon,
  },
  {
    name: "RSS",
    url: `${env.NEXT_PUBLIC_APP_URL}/atom.xml`,
    icon: RssIcon,
  },
  {
    name: "Email",
    url: "mailto:yashagarwaljpr+blog@gmail.com",
    icon: AtIcon,
  },
  {
    name: "GitHub",
    url: "https://github.com/yashhere",
    icon: GithubLogoIcon,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/theyashagarwal/",
    icon: LinkedinLogoIcon,
  },
]

export const Footer: FC = () => {
  return (
    <footer className="mt-auto w-full space-y-4 bg-muted/40">
      <hr className="border-t-1 border-border" />
      <div className="mx-auto max-w-2xl space-y-8 p-4 md:px-0">
        <div className="flex flex-row flex-wrap items-start justify-between md:flex-row">
          <section className="flex flex-col">
            <h1 className="mb-4 text-base font-medium">Get in touch</h1>
            <div className="space-y-2 flex flex-col">
              {Socials.map((s) => {
                return (
                  <Link
                    href={s.url}
                    key={s.name}
                    aria-label={s.name}
                    className="text-foreground/60 hover:text-foreground"
                    variant="nav"
                    external={true}
                    showIcon={false}
                  >
                    <div className="flex items-center gap-4 md:gap-2">
                      <s.icon className="size-5" />
                      <span className="text-base">{s.name}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
          <FooterNavigation />
          <div className="mt-8 flex flex-col md:mt-0">
            <section>
              <h1 className="mb-4 text-base font-medium">Get email updates</h1>
              <div className="mb-6 flex flex-col">
                <Newsletter />
              </div>
            </section>
          </div>
          <Suspense fallback={null}>
            <div className="mt-6 inline-block md:hidden">
              <LastVisitor />
            </div>
          </Suspense>
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-8 p-4 text-base md:px-0">
        <div className="flex w-full flex-row justify-between">
          <div>Be nice ツ</div>
          <Suspense fallback={null}>
            <div className="hidden md:inline-block">
              <LastVisitor />
            </div>
          </Suspense>
          <Suspense fallback={null}>
            <div className="flex flex-row items-center gap-2">
              <div>©</div>
              <div>2016</div>
              <div>-</div>
              <div className="flex flex-row">
                <AnalogClock />
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </footer>
  )
}
