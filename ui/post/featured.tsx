import { headers } from "next/headers"
import Link from "next/link"

import { ViewCounter } from "@/ui/view-counter"
import { Post } from "contentlayer/generated"
import moment from "moment"
import { Suspense } from "react"
import { PostPreviewLoading } from "./loading"
import { getAllViewsCount, getTopPosts } from "@/lib/db"

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
  const data = await getTopPosts(5)
  const allViews = await getAllViewsCount()

  return (
    <>
      {data?.map((post) => {
        return (
          <Suspense key={post.slug} fallback={<PostPreviewLoading />}>
            <Link
              href={`/blog/${post.slug}`}
              className="[&_h4]:hover:underline transform hover:scale-[1.02] transition-all"
            >
              <div className="flex flex-col bg-white rounded-lg justify-between h-full">
                <div className="tracking-tight mb-6">
                  <h4 className="w-full text-xl font-bold font-heading">
                    {post.title}
                  </h4>
                  <div className="text-black/80 text-sm flex font-semibold space-x-2">
                    <p>{moment(post.published).format("MMM DD, YYYY")}</p>
                    <p>&middot;</p>
                    <ViewCounter
                      slug={post.slug as string}
                      allViews={allViews}
                      track={false}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </Suspense>
        )
      })}
    </>
  )
}
