"use client"

import { forwardRef, useState, type JSX } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface CustomImageProps extends ImageProps {
  title: string
}

const CustomImage = forwardRef<HTMLImageElement, CustomImageProps>(
  (
    {
      src,
      title,
      alt,
      width,
      height,
      blurDataURL,
      placeholder,
      ...otherProps
    }: CustomImageProps,
    ref
  ): JSX.Element => {
    if (!src || !alt) {
      throw new Error("src and alt is required")
    }

    const [isLoading, setLoading] = useState(true)

    return (
      <figure className="group relative mb-8 block w-full break-inside-avoid-column text-center drop-shadow-xl">
        <Image
          className={cn("rounded-lg", isLoading ? "img-blur" : "img-unblur")}
          onLoad={() => setLoading(false)}
          style={{ transform: "translate3d(0, 0, 0)" }}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          src={src}
          alt={alt}
          width={Number(width)}
          height={Number(height)}
          ref={ref}
          sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
          {...otherProps}
        />
        {title && (
          <figcaption className="z-10 mt-5 text-sm italic text-muted-foreground">
            {title}
          </figcaption>
        )}
      </figure>
    )
  }
)

CustomImage.displayName = "Image"

export default CustomImage
