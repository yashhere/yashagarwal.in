"use client"

import Image from "@/components/ui/image"

const photoSources = [
  "/images/yash/at-salong-valley.jpeg",
  // "/images/yash/in-ocean.jpeg",
  // "/images/yash/at-beach.jpeg",
]

export default function RandomPhoto(props: any) {
  return (
    <Image
      src={photoSources[0]}
      alt="a photo of yash"
      width={800 / 1.5}
      height={1200 / 1.5}
      style={{ objectFit: "cover" }}
      placeholder="blur"
      blurDataURL={photoSources[0]}
      priority={false}
      loading="eager"
      {...props}
    />
  )
}
