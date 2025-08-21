import Image from "next/image"

import { FeaturedNotes } from "@/components/content/featured-notes"
import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"
import Section from "@/components/ui/section"
import { SocialLinks } from "@/components/ui/social-links"
import { siteConfig } from "@/config/site"

export default function Page() {
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <div className="group relative h-14 w-14">
          <Image
            alt="Logo"
            src="/images/yash/at-beach.jpeg"
            className="h-full w-full rounded-full object-cover"
            title="Yash's photo"
            placeholder="blur"
            width={96}
            height={96}
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSI2MyIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjYzIj4KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBmcm9tPSIwIDUwIDUwIiB0bz0iMzYwIDUwIDUwIiBkdXI9IjEuNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPC9jaXJjbGU+Cjwvc3ZnPgo="
            loading="eager"
            priority
          />
          <div className="bg-background group-hover:animate-wobble absolute -right-2 -bottom-2 origin-center cursor-pointer rounded-full px-1 py-0.5 text-sm transition-transform">
            👋🏽
          </div>
        </div>
        <div className="flex flex-col">
          <Heading level="h3" className="text-foreground">
            Yash Agarwal
          </Heading>
          <p className="mt-0">Engineer / Creator / Explorer</p>
        </div>
      </div>

      <div className="text-foreground mt-12 leading-relaxed">
        <p className="text-base leading-relaxed">
          Software Engineer at{" "}
          <Link href="https://netskope.com" target="_blank" variant="text">
            Netskope
          </Link>{" "}
          working on API security, passionate about backend development and
          cybersecurity.
        </p>
      </div>

      <div className="mt-12">
        <SocialLinks />
      </div>

      <div className="mt-16">
        <Section title="Popular Writing">
          <FeaturedNotes count={siteConfig.featuredNotes} />
        </Section>
      </div>
    </>
  )
}
