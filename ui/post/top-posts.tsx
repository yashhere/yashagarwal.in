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
              className="transition-all [&_h4]:hover:text-primary-300"
            >
              <div className="flex h-full flex-col justify-between rounded-lg">
                <div className="mb-6">
                  <h4 className="w-full font-heading text-lg font-bold">
                    {post.title}
                  </h4>
                  <div className="text-md flex space-x-2 font-medium text-black/60 dark:text-white/60">
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
