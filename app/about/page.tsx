import { Metadata } from "next"
import Link from "next/link"
import { FC } from "react"

export const metadata: Metadata = {
  title: "About Me | Yash Agarwal",
  description: "Learn about me and what I do.",
}

const Page: FC = () => {
  return (
    <>
      <h1 className="text-5xl sm:text-[96px] font-heading font-bold leading-extra-tight pb-8">
        About Me
      </h1>
      <section className="space-y-4 text-black/80 font-medium">
        <blockquote className="border-l-4 border-primary/50 bg-primary/40 rounded-md pl-4 py-2 italic text-md">
          <p>
            Great minds discuss ideas; average minds discuss events; small minds
            discuss people.
          </p>
        </blockquote>
        <p>I&apos;m a 27 year old software engineer working remotely.</p>
        <p>
          Hi, I am Yash (y-uh-sh) 🙏. I am a computer programmer 👨‍💻 interested
          in network security 🛡, cryptography 🔐, and distributed systems 🌐.
          You can find me elsewhere on the Web; at places like{" "}
          <Link href="https://twitter.com/yash__here">Twitter</Link>,{" "}
          <Link href="https://github.com/yashhere">Github</Link> and{" "}
          <Link href="https://www.linkedin.com/in/theyashagarwal">
            LinkedIn
          </Link>
          . There is also my{" "}
          <Link href="mailto:yashagarwaljpr+blog@gmail.com">email</Link> 📩. I
          maintain a separate{" "}
          <Link href="https://highlights.yashagarwal.in/">website</Link> for
          storing my Kindle Paperwhite Highlights. Check it out!!
        </p>
      </section>
    </>
  )
}

export default Page
