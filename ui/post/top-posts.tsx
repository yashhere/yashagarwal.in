import { Suspense } from "react"
import { headers } from "next/headers"
import { ViewCounter } from "@/ui/view-counter"
import { Post } from "contentlayer/generated"
import moment from "moment"

import { getAllViewsCount, getTopPosts } from "@/lib/db"

import Link from "../link/link"
import { PostPreviewLoading } from "./loading"

export async function TopPosts() {
  const [data, allViews] = await Promise.all([
    getTopPosts(3),
    getAllViewsCount(),
  ])

  return (
    <>
      {data?.map((post) => {
        return (
          <Suspense key={post.slug} fallback={<PostPreviewLoading />}>
            <Link
              href={`/blog/${post.slug}`}
              className="[&_h4]:hover:text-primary-300 transition-all"
            >
              <div className="flex flex-col rounded-lg justify-between h-full">
                <div className="mb-6">
                  <h4 className="w-full text-lg font-bold font-heading">
                    {post.title}
                  </h4>
                  <div className="text-black/60 text-md flex font-medium space-x-2">
                    <p>{moment(post.published).fromNow()}</p>
                    <p>&middot;</p>
                    <ViewCounter
                      slug={post.slug as string}
                      allViews={allViews}
                      track={false}
                    />
                    <p>&middot;</p>
                    {/* TODO: Add LikeCounter */}
                    <p>45 likes</p>
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
