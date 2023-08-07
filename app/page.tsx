import { RecentPosts } from "@/components/recent-posts"
import Link from "@/components/ui/link"
import { siteConfig } from "@/config/site"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

export default async function Page() {
  return (
    <>
      <section className="flex flex-col justify-start">
        <h1 className="my-8 text-4xl font-semibold tracking-tight sm:mt-4">
          Namaste, fellow wanderer 👋
        </h1>
        <div className="prose prose-article text-xl leading-8 text-text">
          <p>Welcome to my nest on the internet!</p>
          <p>
            Let me tell you{" "}
            <Link href="/blog/how-i-built-a-blog-with-nextjs">how</Link> I built
            this blog <br />
            Or perhaps I should <Link href="/about">introduce</Link> myself
            first?
          </p>
          <p>
            This is perhaps the 6th-edition of my personal website in seven
            years. The I&apos;m-actually-going-to-write-this-time-edition. The
            last edition had a complex writing workflow which eventually led to
            my{" "}
            <Link href="/blog/2021-a-bullish-year#blogging-and-writing">
              negligence
            </Link>{" "}
            to actually write (!). Not this time. Of course, that&apos;s what I
            always say 😈.
          </p>
          <p>
            So, till the time I abandon this version in favor of a new edition
            of my blog, keep reading and sharing! 🚀
          </p>
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
