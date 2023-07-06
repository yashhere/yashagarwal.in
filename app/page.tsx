import { TopPosts } from "@/components/top-posts"
import Link from "@/components/ui/link"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | Yash Agarwal",
  description: "My nest on the Internet",
}

export default async function Page() {
  return (
    <>
      <section className="flex flex-col justify-start">
        <h1 className="my-8 text-4xl font-bold tracking-tighter sm:mt-4">
          hey, I&apos;m Yash 👋
        </h1>
        <div className="prose prose-neutral text-xl leading-7 dark:prose-invert">
          <p>Welcome to my digital home!</p>
          <p>
            I&apos;m a software engineer with a knack for exploring technology
            and expressing myself through writing.
          </p>
          <p>
            This blog is my little oasis, where ideas bloom and stories take
            root. Here, you&apos;ll find a collection of personal anecdotes,
            occasional tech insights, and experiments that fuel my curiosity.
            Step inside, explore, and don&apos;t forget to check out my most
            popular posts below.
          </p>
          <p>Happy reading! 🚀</p>
          <br />
        </div>
      </section>
      <section className="mt-8 flex flex-col justify-start">
        {/* TODO: debug this. Shall I use 'use client' here? */}
        <h2 className="pb-4 font-heading text-xl font-bold uppercase tracking-widest text-tertiary">
          Popular posts
        </h2>
        {/* @ts-expect-error Async Server Component */}
        <TopPosts />
        <Link
          href="/blog"
          className="fade text-black/60 transition-all hover:text-black/95 dark:text-white/60 dark:hover:text-white/95"
        >
          <p className="flex items-center text-lg font-bold">
            All Posts &nbsp;
            <ArrowRightIcon className="w-4" />
          </p>
        </Link>
      </section>
    </>
  )
}
