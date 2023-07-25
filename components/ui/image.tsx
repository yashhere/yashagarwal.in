"use client"

import { forwardRef, ImgHTMLAttributes, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  title?: string
  alt?: string
  width?: number | string
  height?: number | string
  blurDataURL?: string
  placeholder: "blur" | "empty"
}

const CustomImage = forwardRef<HTMLImageElement, CustomImageProps>(
  ({
    src,
    title,
    alt,
    width,
    height,
    blurDataURL,
    placeholder,
  }: CustomImageProps): JSX.Element => {
    if (!src || !alt) {
      throw new Error("src and alt is required")
    }

    const [blur, setBlur] = useState(true)

    return (
      <figure className="group relative mb-5 block w-full break-inside-avoid-column text-center drop-shadow-xl">
        <Image
          className={cn("rounded-lg", blur ? "img-blur" : "img-unblur")}
          onLoadingComplete={() => setBlur(false)}
          style={{ transform: "translate3d(0, 0, 0)" }}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          src={src}
          alt={alt}
          width={Number(width)}
          height={Number(height)}
          sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
        />
        <figcaption className="z-10 mt-5 text-sm italic text-gray-400">
          {title}
        </figcaption>
      </figure>
    )
  }
)

CustomImage.displayName = "Image"

export default CustomImage
