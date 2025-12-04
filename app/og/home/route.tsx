import { ImageResponse } from "next/og"

import { siteConfig } from "@/lib/seo/default"

export const dynamic = "force-static"

// Smart text truncation with word boundaries
function smartTruncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  const truncated = text.slice(0, maxLength - 3)
  const lastSpace = truncated.lastIndexOf(" ")

  if (lastSpace > maxLength * 0.7) {
    return truncated.slice(0, lastSpace) + "..."
  }

  return truncated + "..."
}

export async function GET() {
  const hostname = new URL(siteConfig.url).hostname
  const tags = siteConfig.keywords

  return new ImageResponse(
    <div
      tw="flex h-full w-full flex-col p-16 relative overflow-hidden"
      style={{
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        backgroundColor: "#020617",
        backgroundImage:
          "radial-gradient(circle at 100% 0%, rgba(59,130,246,0.15) 0%, transparent 40%), radial-gradient(circle at 0% 100%, rgba(236,72,153,0.15) 0%, transparent 40%)",
      }}
    >
      {/* Content Container */}
      <div tw="flex flex-col justify-between h-full w-full">
        {/* Header */}
        <div tw="flex items-center justify-between w-full">
          <div tw="flex items-center">
            <div tw="flex w-8 h-8 rounded-full bg-white/10 items-center justify-center border border-white/20 mr-3">
              <div tw="w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <span tw="text-xl font-medium text-slate-300 tracking-wide uppercase">
              {siteConfig.name}
            </span>
          </div>
          <div tw="text-slate-500 text-lg">{hostname}</div>
        </div>

        {/* Main Content */}
        <div tw="flex flex-col max-w-4xl">
          <h1
            tw="text-7xl font-bold leading-tight tracking-tight text-white mb-6"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            {siteConfig.title}
          </h1>
          <p tw="text-3xl text-slate-400 leading-relaxed font-light m-0">
            {smartTruncate(siteConfig.description, 160)}
          </p>
        </div>

        {/* Footer / Tags */}
        <div tw="flex items-center">
          {tags.slice(0, 3).map((tag, i) => (
            <div
              key={i}
              tw="flex px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-lg font-medium mr-4"
            >
              #{tag}
            </div>
          ))}
          {tags.length > 3 && (
            <div tw="flex px-4 py-2 text-slate-500 text-lg">
              +{tags.length - 3} more
            </div>
          )}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  )
}
