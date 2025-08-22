import { FeaturedNotes } from "@/components/content/featured-notes"
import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"
import Section from "@/components/ui/section"
import { SocialLinks } from "@/components/ui/social-links"
import { siteConfig } from "@/config/site"

export default function Page() {
  return (
    <>
      <div className="mt-12 max-w-xl">
        <div className="mb-8">
          <Heading
            level="h2"
            className="text-foreground text-2xl font-semibold"
          >
            Yash Agarwal
          </Heading>
          <p className="text-foreground/60 mt-1 text-base italic">
            Developer / Creator / Explorer
          </p>
        </div>

        <div className="text-foreground/90 space-y-6 text-base leading-relaxed">
          <p>
            This is my home on the web. I write code at{" "}
            <Link
              href="https://netskope.com"
              target="_blank"
              variant="text"
              external={false}
            >
              Netskope
            </Link>{" "}
            for a living, building CASB security products for SaaS APIs that
            protect businesses&apos; data at rest.
          </p>
          <p>
            Outside of software I like to tinker with homelab setups, explore
            cybersecurity, and document my experiments. You can find me on{" "}
            <Link
              href="https://x.com/yash__here"
              target="_blank"
              variant="text"
              external={false}
            >
              X
            </Link>{" "}
            or drop me{" "}
            <Link
              href="mailto:yashagarwaljpr+blog@gmail.com"
              target="_blank"
              variant="text"
              external={false}
            >
              an email{" "}
            </Link>
            .
          </p>

          <p>
            Now a days, I write primarily about homelab experiments, security,
            and backend development.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <SocialLinks />
      </div>

      <div className="relative mt-16">
        <div className="via-border absolute -top-10 left-1/2 h-px w-48 -translate-x-1/2 transform bg-gradient-to-r from-transparent to-transparent"></div>
        <Section title="Popular Writing">
          <FeaturedNotes count={siteConfig.featuredNotes} />
        </Section>
      </div>
    </>
  )
}
