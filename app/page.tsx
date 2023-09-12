import { RecentNotes } from "@/components/recent-notes"
import Link from "@/components/ui/link"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

export default async function Page() {
  return (
    <>
      <section className="flex flex-col justify-start">
        <SectionTitle data={null} title="Namaste, fellow wanderer 👋" />
        <div className="prose prose-article text-lg leading-8 text-text">
          <p>Welcome to my little corner of the internet!</p>
          <p>
            You should read{" "}
            <Link href="/notes/how-i-built-a-blog-with-nextjs">how</Link> I
            built this blog, but perhaps I should{" "}
            <Link href="/whoami">introduce</Link> myself first.
          </p>
          <p>
            This is perhaps the 6th-edition of my personal website in seven
            years. The I&apos;m-actually-going-to-write-this-time-edition. The
            last edition of this website had a complex writing workflow which
            eventually led to my{" "}
            <Link href="/notes/2021-a-bullish-year#blogging-and-writing">
              negligence
            </Link>{" "}
            to actually write! Not this time. Of course, that&apos;s what I
            always say.
          </p>
          <br />
        </div>
      </section>
      <section className="flex flex-col justify-start">
        <RecentNotes count={siteConfig.recentNotes} />
        {/* <Link
          href="/notes"
          className="group flex items-center justify-start space-x-2 text-lg font-bold hover:text-primary"
        >
          <span>All Notes</span>
          <ArrowRightIcon className="h-4 w-4 transition duration-200 group-hover:translate-x-1" />
        </Link> */}
      </section>
    </>
  )
}
