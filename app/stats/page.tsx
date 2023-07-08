import { getTotalViews } from "@/lib/actions"
import { ArrowTrendingUpIcon, PencilIcon } from "@heroicons/react/24/solid"
import { allPosts } from "contentlayer/generated"
import { Suspense } from "react"

const Page = async () => {
  const data = await getTotalViews()
  const totalViews = Number(data.total_views || 0)
  const totalPosts = allPosts.filter((p) => p.status != "draft").length

  return (
    <>
      <section className="pb-4">
        <h1 className="leading-extra-tight pb-6 font-heading text-5xl sm:text-[96px]">
          Stats
        </h1>
        <p className="font-medium text-text">
          Currated statistics regarding the existence of me on the web, and this
          blog.
        </p>
      </section>
      <section className="font-medium text-text">
        <div className="flex space-x-2">
          <PencilIcon className="w-4" />
          <p>{totalPosts} articles written</p>
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
