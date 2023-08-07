import { RecentPosts } from "@/components/recent-posts"
import Link from "@/components/ui/link"
import { siteConfig } from "@/config/site"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

export default async function Page() {
  return (
    <>
      <section className="flex flex-col justify-start">
        <h1 className="my-8 text-4xl font-bold tracking-tighter sm:mt-4">
          hey, I&apos;m Yash 👋
        </h1>
        <div className="prose prose-article text-xl leading-7 text-text">
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
        <RecentPosts count={siteConfig.recentPosts} />
        <Link
          href="/blog"
          className="group mt-8 flex items-center justify-start space-x-2 text-lg font-bold hover:text-primary"
        >
          <span>All Posts</span>
          <ArrowRightIcon className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
        </Link>
      </section>
    </>
  )
}
