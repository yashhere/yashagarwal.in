"use client"

import { useState } from "react"
import Image from "next/image"

const photoSources = [
  "/images/yash/at-salong-valley.jpeg",
  "/images/yash/in-ocean.jpeg",
  "/images/yash/at-beach.jpeg",
]

export default function RandomPhoto(props: any) {
  const [currentImage, setCurrentImage] = useState(
    photoSources[Math.floor(Math.random() * photoSources.length)],
  )

  return (
    <Image
      src={currentImage}
      alt="a photo of yash"
      width={800 / 1.5}
      height={1200 / 1.5}
      style={{ objectFit: "cover" }}
      placeholder="blur"
      blurDataURL={currentImage}
      priority={false}
      loading="lazy"
      {...props}
    />
  )
}
