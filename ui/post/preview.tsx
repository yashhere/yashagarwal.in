import { Suspense } from "react"
import moment from "moment"

import { getPost } from "@/lib/content"

import Link from "../link/link"
import { ViewCounter } from "../view-counter"
import { PostPreviewLoading } from "./loading"

export const PostPreview = ({
  post,
  allLikes,
  allViews,
}: {
  post: NonNullable<ReturnType<typeof getPost>>
  allLikes: {
    slug: string
    likes: number
  }[]
  allViews: {
    slug: string
    views: number
  }[]
}) => {
  const likesForSlug =
    allLikes && allLikes.find((item) => item.slug === post.slug)
  const likes = new Number(likesForSlug?.likes || 0)
  return (
    <>
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
              <p>{`${likes.toLocaleString()} likes`}</p>
            </div>
          </div>
        </Link>
      </Suspense>
    </>
  )
}
