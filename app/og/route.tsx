import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { siteConfig } from "@/config/site"
import { decodeParameter } from "@/lib/utils"

export const runtime = "edge"

// Cache font loading
let fontCache: ArrayBuffer | null = null

async function loadFont(): Promise<ArrayBuffer> {
  if (fontCache) {
    return fontCache
  }

  try {
    const response = await fetch(
      new URL("../../public/assets/fonts/inter.ttf", import.meta.url)
    )

    if (!response.ok) {
      throw new Error(`Failed to load font: ${response.status}`)
    }

    fontCache = await response.arrayBuffer()
    return fontCache
  } catch (error) {
    console.error("Font loading failed:", error)
    // Return a minimal font buffer or throw to use system fonts
    throw error
  }
}

// Smart text truncation with word boundaries
function smartTruncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  const truncated = text.slice(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(" ")

  // If we can break at a word boundary, do so
  if (lastSpace > maxLength * 0.7) {
    return truncated.slice(0, lastSpace) + "..."
  }

  return truncated + "..."
}

// Calculate optimal font size based on content length
function calculateFontSize(title: string): number {
  if (title.length > 60) return 48 // Smaller for long titles
  if (title.length > 40) return 56
  return 64 // Default size
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const noteTitle = decodeParameter(searchParams.get("title")) || "Untitled"

  try {
    const meta = decodeParameter(searchParams.get("meta"))
    const tagsParam = searchParams.get("tags")
    const tags = tagsParam
      ? tagsParam
          .split("|")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : []
    const hostname = new URL(siteConfig.url).hostname

    const colors = {
      muted: "#f8fafc",
      border: "#e2e8f0",
      mutedForeground: "#64748b",
      foreground: "#0f172a",
      accent: "#3b82f6",
      shadow: "rgba(15, 23, 42, 0.1)",
    }

    // Smart truncation
    const truncatedTitle = smartTruncate(noteTitle, 85)
    const truncatedMeta = meta ? smartTruncate(meta, 140) : null

    // Dynamic font sizing
    const titleFontSize = calculateFontSize(truncatedTitle)

    let fonts: Array<{
      name: string
      data: ArrayBuffer
      style: "normal" | "italic"
    }> = []

    try {
      const fontData = await loadFont()
      fonts = [
        {
          name: "Inter",
          data: fontData,
          style: "normal" as const,
        },
      ]
    } catch (fontError) {
      console.warn("Font loading failed, using no custom fonts:", fontError)
      // Don't add any fonts to the array - ImageResponse will use system fonts
    }

    return new ImageResponse(
      (
        <div
          tw="flex h-full w-full bg-white flex-col relative"
          style={{
            fontFamily:
              "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
          }}
        >
          <div
            tw="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, #e2e8f0 1px, transparent 1px), radial-gradient(circle at 75% 75%, #e2e8f0 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div tw="flex h-full w-full flex-col relative z-10 p-12">
            <header tw="flex items-center justify-between text-3xl mb-8">
              <div
                tw="font-bold flex items-center"
                style={{
                  color: colors.foreground,
                }}
              >
                <div
                  tw="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: colors.accent }}
                />
                {siteConfig.name}
              </div>
              <div style={{ color: colors.mutedForeground, fontSize: "28px" }}>
                {hostname}
              </div>
            </header>

            <main tw="flex flex-1 flex-col items-center justify-center px-8">
              <div tw="flex w-full justify-center mb-8">
                <div
                  tw="rounded-2xl p-8 text-center max-w-5xl leading-tight font-semibold"
                  style={{
                    fontSize: `${titleFontSize}px`,
                    backgroundColor: colors.muted,
                    color: colors.foreground,
                    boxShadow: `0 10px 25px ${colors.shadow}`,
                    border: `1px solid ${colors.border}`,
                    wordWrap: "break-word",
                  }}
                >
                  {truncatedTitle}
                </div>
              </div>

              {truncatedMeta && (
                <div
                  tw="text-3xl max-w-4xl text-center leading-relaxed mb-8"
                  style={{
                    color: colors.mutedForeground,
                    wordWrap: "break-word",
                  }}
                >
                  {truncatedMeta}
                </div>
              )}

              {tags.length > 0 && (
                <div tw="flex flex-wrap justify-center items-center max-w-4xl">
                  {tags.slice(0, 4).map((tag, index) => (
                    <span
                      key={index}
                      tw="rounded-xl px-4 py-2 mx-2 text-xl font-medium"
                      style={{
                        backgroundColor: colors.muted,
                        border: `1px solid ${colors.border}`,
                        color: colors.foreground,
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                  {tags.length > 4 && (
                    <span
                      tw="rounded-xl px-4 py-2 text-xl font-medium"
                      style={{
                        backgroundColor: colors.accent,
                        color: "white",
                      }}
                    >
                      +{tags.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        ...(fonts.length > 0 && { fonts }),
      }
    )
  } catch (error) {
    console.error("OG Image generation error:", error)

    return new ImageResponse(
      (
        <div tw="flex h-full w-full bg-gradient-to-br from-gray-50 to-white flex-col items-center justify-center p-12">
          <div tw="text-7xl font-bold text-gray-800 mb-6">
            {siteConfig.name}
          </div>
          <div tw="text-4xl text-gray-600 text-center max-w-2xl">
            {noteTitle || "Content Preview"}
          </div>
          <div tw="text-2xl text-gray-500 mt-8">yashagarwal.in</div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}
