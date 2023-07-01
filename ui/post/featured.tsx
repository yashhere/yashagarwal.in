import { headers } from "next/headers"
import Link from "next/link"

import { Metrics } from "@/ui/metrics"
import { Post } from "contentlayer/generated"
import moment from "moment"
import { Suspense } from "react"
import { PostPreviewLoading } from "./loading"

async function getFeaturedPost(): Promise<Post> {
  const data = headers()
  const protocol = data.get("x-forwarded-proto")
  const host = data.get("host")

  const res = await fetch(`${protocol}://${host}/best`, {
    cache: "reload",
  })
  return res.json()
}

export async function FeaturedPost() {
  const data = await getFeaturedPost()

  return (
    <Suspense fallback={<PostPreviewLoading />}>
      <Link
        href={`/blog/${data.slug}`}
        className="[&_h4]:hover:underline transform hover:scale-[1.02] transition-all"
      >
        <div className="flex flex-col bg-white rounded-lg justify-between h-full">
          <div className="tracking-tight mb-6">
            <h4 className="w-full text-xl font-bold font-heading">
              {data.title}
            </h4>
            <div className="text-black/80 text-sm flex font-semibold space-x-2">
              <p>{moment(data.published).format("MMM DD, YYYY")}</p>
              <p>&middot;</p>
              <Metrics slug={data.slug} increment={false} />
            </div>
          </div>
        </div>
      </Link>
    </Suspense>
  )
}
