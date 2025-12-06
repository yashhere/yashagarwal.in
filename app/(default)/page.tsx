import { FeaturedNotes } from "@/components/content/featured-notes"
import { DecorativeHr } from "@/components/ui/decorative-hr"
import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"
import { SocialLinks } from "@/components/ui/social-links"
import { siteConfig } from "@/config/site"

export default function Page() {
  return (
    <>
      <div className="mt-16 max-w-full">
        <div className="mb-10">
          <Heading
            level="h2"
            as="h1"
            className="text-foreground text-2xl font-semibold tracking-wide"
          >
            Yash Agarwal
          </Heading>
          <p className="text-muted-foreground mt-2 text-sm">
            Engineer / Builder / Learner
          </p>
        </div>

        <div className="text-foreground/90 space-y-6 text-base leading-relaxed">
          <p>
            Hey there!{" "}
            <span className="animate-wobble inline-block origin-[70%_70%]">
              👋
            </span>
          </p>
          <p>
            Welcome to my corner of the internet. I write code at{" "}
            <Link href="https://netskope.com" target="_blank" variant="text">
              Netskope
            </Link>{" "}
            for a living, building CASB security products that protect
            businesses&apos; data at rest.
          </p>
          <p>
            Currently, I&apos;m optimizing my{" "}
            <span className="text-foreground font-semibold">homelab</span>{" "}
            infrastructure, delving into latest trends in{" "}
            <span className="text-foreground font-semibold">LLMs</span>{" "}
            research, and{" "}
            <span className="text-foreground font-semibold">
              Backend Systems
            </span>
            .
          </p>
        </div>

        <div className="mt-8">
          <SocialLinks />
        </div>
      </div>

      <DecorativeHr variant="dot" />

      <Heading
        level="h3"
        as="h2"
        className="text-primary mt-6 mb-2 text-2xl tracking-wide"
      >
        Recent Writing
      </Heading>
      <FeaturedNotes count={siteConfig.featuredNotes} />
    </>
  )
}
