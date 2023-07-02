import { FeaturedPost } from "@/ui/post/featured"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Home | Yash Agarwal",
  description: "My nest on the Internet",
}

export default async function Page() {
  console.log("YASH: in root page")
  return (
    <>
      <section className="flex flex-col justify-start">
        <h1 className="text-5xl font-bold font-heading sm:text-[96px] leading-extra-tight">
          Yash
        </h1>
        <h1 className="text-5xl font-bold font-heading sm:text-[96px] leading-extra-tight pb-12">
          Agarwal
        </h1>
        <p className="font-medium text-black/80">
          Hey there! Thanks for stopping by. I am Yash Agarwal, a Software
          Engineer.
          <br />
          <br />
          This is work in progress.
        </p>
      </section>
      <section className="flex flex-col justify-start mt-8">
        {/* TODO: debug this. Shall I use 'use client' here? */}
        <h3 className="font-bold font-heading text-xl text-black/60 pb-4">
          Popular posts
        </h3>
        {/* @ts-expect-error Async Server Component */}
        <FeaturedPost />
        <Link
          href="/blog"
          className=" text-black/60 transition-all fade hover:text-black/95"
        >
          <p className="font-semibold flex">
            All Posts <ArrowRightIcon className="w-4" />
          </p>
        </Link>
      </section>
    </>
  )
}
