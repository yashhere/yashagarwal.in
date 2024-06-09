import { FeaturedNotes } from "@/components/featured-notes"
import Link from "@/components/ui/link"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"

export default async function Page() {
  return (
    <div>
      <section className="flex flex-col justify-start">
        <SectionTitle data={null} title="Hey, I'm Yash 👋" />
        <div className="prose text-lg leading-7 text-text">
          <p>
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
          <p>
            This domain is my little digital nest where I write about my
            experiments with tech and life.
          </p>
        </div>
      </section>
      <section className="mt-16 flex flex-col justify-start">
        <FeaturedNotes count={siteConfig.featuredNotes} />
      </section>
    </div>
  )
}
