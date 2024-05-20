import { RecentNotes } from "@/components/recent-notes"
import Connect from "@/components/ui/layout/connect"
import NewsLetter from "@/components/ui/layout/newsletter"
import Now from "@/components/ui/layout/now"
import Work from "@/components/ui/layout/work"
import Writing from "@/components/ui/layout/writing"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"

export default async function Page() {
  return (
    <div className="mt-28 space-y-12">
      <section className="flex flex-col justify-start">
        <Now />
        <Work />
        <Writing showDescription />
        <Connect />
        <NewsLetter />
      </section>
    </div>
  )
}
