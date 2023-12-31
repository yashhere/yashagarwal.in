import { Suspense } from "react"
import { Metadata } from "next"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"
import { getTotalViews } from "@/lib/actions"
import { ArrowTrendingUpIcon, PencilIcon } from "@heroicons/react/24/solid"
import { allNotes } from "contentlayer/generated"

export const metadata: Metadata = {
  title: "Stats | Yash Agarwal",
  description: "Find curated statistics regarding this website",
  alternates: {
    canonical: `${siteConfig.url}/stats`,
    types: {
      "application/rss+xml": [
        { url: "rss.xml", title: "RSS Feed for yashagarwal.in" },
        { url: "atom.xml", title: "Atom Feed for yashagarwal.in" },
      ],
    },
  },
}

const Page = async () => {
  const data = await getTotalViews()
  const totalViews = Number(data.total_views || 0)
  const totalNotes = allNotes.filter((p) => p.status != "draft").length

  return (
    <>
      <section className="pb-4">
        <SectionTitle data={null} title="Stats" />
        <p className="font-medium text-text">
          Curated statistics regarding the existence of me on the web, and this
          blog.
        </p>
      </section>
      <section className="font-medium text-text">
        <div className="flex space-x-2">
          <PencilIcon className="w-4" />
          <p>{totalNotes} articles written</p>
        </div>
        <div className="flex space-x-2">
          <ArrowTrendingUpIcon className="w-4" />
          <Suspense fallback={<p>loading..</p>}>
            <p>{totalViews} total views</p>
          </Suspense>
        </div>
      </section>
    </>
  )
}
export default Page
