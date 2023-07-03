import { Suspense } from "react"
import moment from "moment"

import { getPost } from "@/lib/content"

import Link from "../link/link"
import { ViewCounter } from "../view-counter"
import { PostPreviewLoading } from "./loading"

export const PostPreview = ({
  post,
  allViews,
}: {
  post: NonNullable<ReturnType<typeof getPost>>
  allViews: {
    slug: string
    views: number
  }[]
}) => {
  return (
    <>
      {/* <Suspense key={post.slug} fallback={<PostPreviewLoading />}>
        <Link
          href={`/blog/${post.slug}`}
          className="flex flex-col w-full [&_h4]:hover:text-primary-300 transition-all"
        >
          <div className="flex flex-col">
            <h5 className="text-md font-semibold font-body">{post.title}</h5>
            <div className="flex flex-row justify-between font-medium text-black/50 text-sm items-center">
              <div className="flex flex-row space-x-1">
                <p>
                  {moment(post.published, "YYYY-MM-DD").format("MMM DD, YYYY")}
                </p>
                <p>&middot;</p>
                <ViewCounter
                  slug={post.slug}
                  allViews={allViews}
                  track={false}
                />
              </div>
            </div>
          </div>
        </Link>
      </Suspense> */}
      <Suspense fallback={<PostPreviewLoading />}>
        <Link
          href={`/blog/${post.slug}`}
          className="flex w-full flex-col transition-all [&_h4]:hover:text-primary-300"
        >
          <div className="flex flex-col">
            <h4 className="w-full font-heading text-lg font-bold">
              {post.title}
            </h4>
            <div className="flex space-x-2 text-sm font-medium text-black/60 dark:text-white/60">
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
        </Link>
      </Suspense>
    </>
  )
}
