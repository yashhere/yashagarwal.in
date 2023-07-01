import { ArrowTrendingUpIcon, PencilIcon } from "@heroicons/react/24/solid"
import { allPosts } from "contentlayer/generated"
import { headers } from "next/headers"
import { Suspense } from "react"

async function getTotalViews(): Promise<number> {
  const data = headers()
  const protocol = data.get("x-forwarded-proto")
  const host = data.get("host")

  const res = await fetch(`${protocol}://${host}/views`, {
    cache: "reload",
  })
  return res.json()
}

const Page = async () => {
  // const totalViews = await getTotalViews();
  const totalViews = 0
  const totalPosts = allPosts.filter((p) => p.status != "draft").length

  return (
    <>
      <section className="pb-4">
        <h1 className="font-heading text-5xl sm:text-[96px] leading-extra-tight pb-6">
          Stats
        </h1>
        <p className="font-medium text-black/80">
          Currated statistics regarding the existence of me on the web, and this
          blog.
        </p>
      </section>
      <section className="font-medium text-black/80">
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
