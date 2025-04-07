import Image, { ImageProps } from "next/image"
import { FeaturedNotes } from "@/components/featured-notes"
import { Projects } from "@/components/projects"
import { Socials } from "@/components/social-icons"
import Link from "@/components/ui/link"
import SectionTitle from "@/components/ui/section-title"
import { siteConfig } from "@/config/site"

export default async function Page() {
  return (
    <div className="max-w-4xl mx-auto text-lg">
      <SectionTitle data={null} title="Hey, I'm Yash 👋" />
      <div className="flex flex-row gap-12 mb-16">
        <div className="w-3/5">
          <section className="mb-8">
            <div className="text-lg mb-6 text-text">
              <p>
                Hello! I&apos;m exploring my tiny corner of the internet. I use
                this space to project my ideas and express my obsessions.
              </p>
            </div>
          </section>

          <div className="mb-12">
            <h2 className="uppercase tracking-wider text-gray-500 mb-4">
              Summary
            </h2>
            <ul className="list-disc space-y-3 pl-4 marker:text-gray-500">
              <li>
                Currently I&apos;m a [Sr. Software Engineer] at{" "}
                <Link href="https://netskope.com" target="_blank" underline>
                  Netskope
                </Link>
              </li>
              <li>
                Previously I worked at{" "}
                <Link href="#" className="inline-flex items-center">
                  PreviousCompany <span className="ml-1">↗</span>
                </Link>
              </li>
              <li>I&apos;ve worked on [X] projects since [Year]</li>
              <li>[Your age] years old, based in [Your City]</li>
              <li>I write about tech, design, and productivity</li>
            </ul>
          </div>

          {/* Social links */}
          <div className="flex space-x-4">
            {Socials.map((s) => {
              return (
                <Link
                  href={s.url}
                  key={s.name}
                  aria-label={s.name}
                  noExternalLinkIcon
                  className="hover:text-gray-900 text-gray-500 flex flex-row items-center gap-1 hover:no-underline md:gap-2"
                >
                  <s.icon className="size-5" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right column - Profile Image */}
        <div className="w-2/5 flex flex-row justify-center">
          <div className="relative w-30 h-30 sm:w-75 sm:h-90 rounded-lg overflow-hidden">
            <Image
              src="/images/yash/at-beach.jpeg"
              alt="Yash"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Featured Notes Section */}
        <section className="md:w-1/2">
          <FeaturedNotes count={siteConfig.featuredNotes} />
        </section>

        {/* Projects Section */}
        <section className="md:w-1/2">
          <Projects />
        </section>
      </div>
    </div>
  )
}
