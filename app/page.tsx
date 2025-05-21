import { FeaturedNotes } from "@/components/content/featured-notes"
import Link from "@/components/ui/link"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"

export default async function Page() {
  return (
    <div>
      <section className="flex flex-col justify-start">
        <SectionTitle data={null} title="Hey, I'm Yash 👋" />
        <div className="text-foreground">
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
      </section>
      <section className="mt-12 flex flex-col justify-start">
        <FeaturedNotes count={siteConfig.featuredNotes} />
      </section>
    </div>
  )
}
