import { RecentNotes } from "@/components/recent-notes"
import Connect from "@/components/ui/layout/connect"
import Now from "@/components/ui/layout/now"
import Writing from "@/components/ui/layout/writing"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"

export default async function Page() {
  return (
    <div className="mt-28 space-y-12">
      <section className="flex flex-col justify-start">
        <div className="mb-32 flex flex-col items-start">
          <h1 className="text-lg">Yash Agarwal</h1>
        </div>
        <Now />
        <Writing />
        <Connect />
      </section>
      {/* <section className="flex flex-col justify-start">
        <RecentNotes count={siteConfig.recentNotes} />
      </section> */}
    </div>
  )
}
