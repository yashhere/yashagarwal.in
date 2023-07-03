import Link from "@/ui/link/link"
import { TopPosts } from "@/ui/post/top-posts"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Home | Yash Agarwal",
  description: "My nest on the Internet",
}

export default async function Page() {
  return (
    <>
      <section className="flex flex-col justify-start">
        <h1 className="mt-8 sm:mt-4 font-bold text-4xl mb-8 tracking-tighter">
          hey, I&apos;m Yash 👋
        </h1>
        <p className="prose text-xl prose-neutral dark:prose-invert leading-7">
          Hey there! Thanks for stopping by. I currently work as Software
          Developer at <Link href="https://www.netskope.com/">Netskope</Link>.
          <br />
        </p>
      </section>
      <section className="flex flex-col justify-start mt-8">
        {/* TODO: debug this. Shall I use 'use client' here? */}
        <h3 className="font-bold font-heading uppercase text-tertiary tracking-widest text-xl pb-4">
          Popular posts
        </h3>
        {/* @ts-expect-error Async Server Component */}
        <TopPosts />
        <Link
          href="/blog"
          className=" text-black/60 transition-all fade hover:text-black/95"
        >
          <p className="font-bold text-lg flex items-center">
            All Posts &nbsp;
            <ArrowRightIcon className="w-4" />
          </p>
        </Link>
      </section>
    </>
  )
}
