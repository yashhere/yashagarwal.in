import { Metadata } from "next"

import { generatePageMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = generatePageMetadata({
  title: "Work Experience",
  description:
    "Explore my backend engineering journey across cyber security industry, building secure, scalable systems with Golang, Python, C++, and cloud-native tools.",
  canonicalUrl: "/work",
})

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
