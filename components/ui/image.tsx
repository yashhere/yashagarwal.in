"use client"

import { forwardRef, useEffect, useState, type JSX } from "react"
import Image, { ImageProps } from "next/image"

import { cn } from "@/lib/utils"

interface CustomImageProps extends ImageProps {
  title?: string
  showSkeleton?: boolean
  expandable?: boolean
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
      placeholder = "blur",
      showSkeleton = true,
      expandable = true,
      className,
      ...otherProps
    }: CustomImageProps,
    ref
  ): JSX.Element => {
    if (!src || !alt) {
      throw new Error("src and alt are required")
    }

    const [isLoading, setLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [isExpandedLoading, setIsExpandedLoading] = useState(false)

    const handleLoad = () => {
      setLoading(false)
      setHasError(false)
    }

    const handleError = () => {
      setLoading(false)
      setHasError(true)
    }

    const handleImageClick = () => {
      if (expandable && !hasError && !isLoading) {
        setIsExpanded(true)
        setIsExpandedLoading(true)
      }
    }

    const handleExpandedLoad = () => {
      setIsExpandedLoading(false)
    }

    const handleExpandedError = () => {
      setIsExpandedLoading(false)
      setHasError(true)
    }

    const handleCloseModal = () => {
      setIsExpanded(false)
    }

    // Handle escape key to close modal
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isExpanded) {
          setIsExpanded(false)
        }
      }

      if (isExpanded) {
        document.addEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "hidden" // Prevent background scroll
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        document.body.style.overflow = "unset"
      }
    }, [isExpanded])

    const defaultBlurDataURL =
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="

    // Calculate aspect ratio for consistent sizing
    const aspectRatio =
      width && height ? `${Number(width)}/${Number(height)}` : "16/9"

    return (
      <>
        <figure className="group my-6 w-full">
          <div
            className="relative rounded-md shadow-sm shadow-black/5 dark:shadow-white/5"
            style={{
              aspectRatio,
            }}
          >
            {/* Loading skeleton */}
            {isLoading && showSkeleton && (
              <div className="bg-muted/20 absolute inset-0 flex items-center justify-center rounded-md">
                <div className="flex flex-col items-center gap-3">
                  <div className="border-muted-foreground/30 border-t-muted-foreground h-8 w-8 animate-spin rounded-full border-2" />
                  <span className="text-muted-foreground text-sm">
                    Loading image...
                  </span>
                </div>
              </div>
            )}

            {/* Error fallback */}
            {hasError && (
              <div className="bg-muted/20 text-muted-foreground absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg
                    className="mx-auto mb-2 h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs">Image unavailable</p>
                </div>
              </div>
            )}

            {/* Main image */}
            {!hasError && (
              <Image
                className={cn(
                  "h-full w-full rounded-md object-cover transition-all duration-300",
                  "will-change-auto",
                  expandable &&
                    !isLoading &&
                    "cursor-zoom-in hover:brightness-110",
                  isLoading ? "opacity-0" : "opacity-100",
                  className
                )}
                onLoad={handleLoad}
                onError={handleError}
                onClick={handleImageClick}
                placeholder={
                  blurDataURL || defaultBlurDataURL ? placeholder : "empty"
                }
                blurDataURL={blurDataURL || defaultBlurDataURL}
                src={src}
                alt={alt}
                width={Number(width)}
                height={Number(height)}
                ref={ref}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1280px) 60vw, 50vw"
                {...otherProps}
              />
            )}

            {/* Expand icon hint */}
            {expandable && !isLoading && !hasError && (
              <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="rounded-md bg-black/50 p-1.5 text-white backdrop-blur-sm">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Caption */}
          {title && !hasError && (
            <figcaption className="mt-3 text-center">
              <span className="text-muted-foreground/80 text-sm">{title}</span>
            </figcaption>
          )}
        </figure>

        {/* Modal for expanded image */}
        {isExpanded && (
          <div
            className="bg-background/50 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            {isExpandedLoading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                  className="flex items-center justify-center rounded-lg"
                  style={{
                    maxWidth: "95vw",
                    maxHeight: "85vh",
                    aspectRatio: aspectRatio,
                    minWidth: "300px",
                    minHeight: "200px",
                  }}
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="border-foreground/30 border-t-foreground/80 h-8 w-8 animate-spin rounded-full border-2"></div>
                    <p className="text-foreground/80 text-sm">
                      Loading image...
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="relative">
              {/* Close button */}
              {!isExpandedLoading && (
                <button
                  onClick={handleCloseModal}
                  className="bg-background/90 hover:bg-background text-foreground border-border absolute top-10 right-2 z-30 rounded-full border p-2 shadow-lg transition-colors"
                  aria-label="Close expanded image"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              {/* Expanded image */}
              <Image
                src={src}
                alt={alt}
                width={Number(width)}
                height={Number(height)}
                className={cn(
                  "max-h-[85vh] max-w-[95vw] cursor-zoom-out rounded-md object-contain transition-opacity duration-300",
                  isExpandedLoading ? "opacity-0" : "opacity-100"
                )}
                onClick={handleCloseModal}
                quality={95}
                priority
                onLoad={handleExpandedLoad}
                onError={handleExpandedError}
              />

              {/* Caption in modal */}
              {/* {title && (
                <div className="absolute -bottom-10 left-4 right-4 p-3 text-white">
                  <p className="text-center text-sm">{title}</p>
                </div>
              )} */}
              {title && !isExpandedLoading && (
                <div className="absolute right-4 -bottom-12 left-4 p-3">
                  <p className="text-center text-sm">{title}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    )
  }
)

CustomImage.displayName = "CustomImage"

export default CustomImage
