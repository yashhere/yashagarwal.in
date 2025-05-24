import Image from "next/image"
import { FeaturedNotes } from "@/components/content/featured-notes"
import { Heading } from "@/components/ui/heading"
import Link from "@/components/ui/link"
import Section from "@/components/ui/section"
import { siteConfig } from "@/config/site"

export default function Page() {
  return (
    <>
      <div className="flex flex-row items-center gap-4">
        <div className="relative h-14 w-14 group">
          <Image
            alt="Logo"
            src="/images/yash/at-beach.jpeg"
            className="rounded-full w-full h-full object-cover"
            title="Yash's photo"
            placeholder="blur"
            width={96}
            height={96}
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSI2MyIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjYzIj4KICAgIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBmcm9tPSIwIDUwIDUwIiB0bz0iMzYwIDUwIDUwIiBkdXI9IjEuNXMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPC9jaXJjbGU+Cjwvc3ZnPgo="
            loading="eager"
            priority
          />
          <div className="absolute -bottom-2 -right-2 rounded-full bg-background px-1 py-0.5 text-sm group-hover:animate-wobble transition-transform origin-center cursor-pointer">
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
        <p className="text-base leading-relaxed mb-4">
          I&apos;m a Software Engineer with a passion for backend development
          and cybersecurity. Currently working as a Sr. Software Engineer at{" "}
          <Link href="https://netskope.com" target="_blank" variant="text">
            Netskope
          </Link>{" "}
          on the CASB API security product, with expertise in Python, Golang,
          and C++.
        </p>
        <p className="text-base leading-relaxed">
          This domain is my little digital nest where I write about my
          experiments with tech, homelab experiments, and life adventures. What
          sets me apart is my relentless commitment to continuous learning and
          turning challenges into victories.
        </p>
      </div>

      <Section title="Popular Writing">
        <FeaturedNotes count={siteConfig.featuredNotes} />
      </Section>
    </>
  )
}
