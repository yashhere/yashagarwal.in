import { RecentNotes } from "@/components/recent-notes"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"

export default async function Page() {
  return (
    <div className="space-y-12">
      <section className="flex flex-col justify-start">
        <SectionTitle data={null} title="Hey, I'm Yash 👋" />
        <div className="text-lg leading-8 text-text">
          <p>
            I&apos;m a Software Engineer crafting efficient solutions for
            intricate problems. Currently I work at{" "}
            <a href="https://netskope.com" target="_blank">
              Netskope
            </a>{" "}
            on it&apos;s API security product.
          </p>
          <p>
            This domain is my little digital nest where I write about my
            experiments with tech and life.
          </p>
        </div>
      </section>
      <section className="flex flex-col justify-start">
        <RecentNotes count={siteConfig.recentNotes} />
      </section>
    </div>
  )
}
