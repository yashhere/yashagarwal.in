import Image from "next/image"
import { FeaturedNotes } from "@/components/content/featured-notes"
import { Navigation } from "@/components/layout/navigation"
import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"
import Section from "@/components/ui/section"
import { siteConfig } from "@/config/site"

export default async function Page() {
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <div className="relative h-12 w-12">
          <Image
            alt="Logo"
            src="/images/yash/at-beach.jpeg"
            className="rounded-full w-full h-full object-cover"
            title="Yash's photo"
            fill={true}
          />
          <div className="absolute -bottom-2 -right-2 rounded-full bg-background px-1 py-0.5 text-sm">
            👋🏽
          </div>
        </div>
        <div className="flex flex-col">
          <Heading level="h2" className="text-foreground">
            Yash Agarwal
          </Heading>
          <p className="mt-0">Engineer / Creator / Explorer</p>
        </div>
      </div>

      <div className="text-foreground mt-12 leading-relaxed">
        <p className="text-base leading-relaxed mb-4">
          I&apos;m a Software Engineer crafting efficient solutions for
          intricate problems. Currently I work at{" "}
          <Link
            href="https://netskope.com"
            target="_blank"
            noExternalLinkIcon
            underline
          >
            Netskope
          </Link>{" "}
          on it&apos;s API security product.
        </p>
        <p className="text-base leading-relaxed">
          This domain is my little digital nest where I write about my
          experiments with tech and life.
        </p>
      </div>

      <Section title="Writing">
        <FeaturedNotes count={siteConfig.featuredNotes} />
      </Section>
    </>
  )
}
