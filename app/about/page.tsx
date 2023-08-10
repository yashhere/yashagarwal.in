import { FC } from "react"
import { Metadata } from "next"
import RandomPhoto from "@/components/random-photo"
import Link from "@/components/ui/link"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "About Me | Yash Agarwal",
  description: "Learn about me and what I do.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
    },
  },
}

const Page: FC = () => {
  return (
    <>
      <SectionTitle data={null} title="About" />
      <section className="prose prose-article md:prose-lg lg:prose-xl">
        <blockquote>
          <p>
            Great minds discuss ideas; average minds discuss events; small minds
            discuss people.
          </p>
        </blockquote>
        <p>
          Hi, I am Yash (y-uh-sh) 🙏. I&apos;m a software engineer working
          remotely.
        </p>
        <p>
          In tech, I am primarily interested in backend development and learning
          scalable systems.
        </p>

        <p>
          I currently work in the API-enabled Protection team at{" "}
          <Link href="https://netskope.com">Netskope</Link>. Previously I worked
          for <Link href="https://cisco.com">Cisco</Link> in the SBG group.
        </p>

        <RandomPhoto className="mx-auto h-auto max-w-full rounded shadow-lg" />
        <p>
          I completed my graduation from National Institute of Technology,
          Calicut in 2018. In NITC, I majored in Computer Science and
          Engineering. Apart from curriculam, I was active in managing the{" "}
          <Link href="https://athena.nitc.ac.in/">Software Systems Lab</Link> as
          a system administrator. In 2018, I also led the team organising the
          largest FOSS event in South India at that time - FOSSMeet. Read my
          experiences of <Link href="/blog/fossmeet-17">FOSSMeet&apos;17</Link>{" "}
          and <Link href="/blog/fossmeet-18">FOSSMeet&apos;18</Link>.
        </p>
        <p>
          You can find me elsewhere on the Web; at places like{" "}
          <Link href="https://github.com/yashhere">Github</Link>,{" "}
          <Link href="https://www.linkedin.com/in/theyashagarwal">
            LinkedIn
          </Link>{" "}
          and <Link href="https://twitter.com/yash__here">Twitter</Link>. There
          is also my{" "}
          <Link href="mailto:yashagarwaljpr+blog@gmail.com">email</Link>.
        </p>
        <p>
          I also built another{" "}
          <Link href="https://highlights.yashagarwal.in/">website</Link> for
          storing my Kindle Paperwhite Highlights.
        </p>
      </section>
    </>
  )
}

export default Page
