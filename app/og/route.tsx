import { ImageResponse } from "next/og"
import { NextRequest } from "next/server"
import { siteConfig } from "@/config/site"
import { decodeParameter } from "@/lib/utils"

export const runtime = "edge"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const noteTitle = decodeParameter(searchParams.get("title"))
  const meta = decodeParameter(searchParams.get("meta"))
  const tags = searchParams.get("tags")?.split("|")
  const hostname = new URL(`${siteConfig.url}`).hostname
  const font = fetch(
    new URL("../../public/assets/fonts/wotfard.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer())
  const fontData = await font

  return new ImageResponse(
    (
      <div
        tw="flex p-10 h-full w-full bg-white flex-col"
        style={{
          fontFamily: "Wotfard",
          backgroundImage:
            "radial-gradient(circle at 50% 50%, lightgray 2%, transparent 0%), radial-gradient(circle at 100% 100%, lightgray 2%, transparent 0%)",
          backgroundSize: "75px 75px",
        }}
      >
        <header tw="flex mt-8 text-[44px] w-full">
          <div tw="font-bold" style={{ fontFamily: "Wotfard" }}>
            {siteConfig.name}
          </div>
          <div tw="grow" />
          <div>{hostname}</div>
        </header>

        <main tw="flex grow pb-3 flex-col items-center justify-center">
          <div tw="flex">
            <div
              tw="rounded-md bg-stone-100 tracking-wide p-4 text-6xl leading-snug font-medium text-center max-w-screen-xl text-slate-500"
              style={{
                fontFamily: "Wotfard",
                boxShadow: "4px 4px 8px 1px rgba(184,182,184,1)",
              }}
            >
              {noteTitle}
            </div>
          </div>
          {meta ? (
            <div
              tw="mt-12 flex items-center justify-center text-4xl text-gray-500"
              style={{ fontFamily: "Wotfard" }}
            >
              {meta}
            </div>
          ) : null}

          {tags && tags.length > 0 ? (
            <div
              tw="text-2xl mt-10 flex flex-row flex-wrap justify-center items-center flex-wrap max-w-screen-xl text-gray-600"
              style={{ fontFamily: "Wotfard" }}
            >
              {tags?.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  tw="mb-4 mr-4 rounded-md border px-3 py-1 text-slate-500 bg-stone-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </main>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Wotfard",
          data: fontData,
          style: "normal",
        },
      ],
    }
  )
}
