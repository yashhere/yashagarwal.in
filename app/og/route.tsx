import { ImageResponse } from "next/server"

export const runtime = "edge"

// fonts
const fontRegular = fetch(
  new URL("../../public/assets/fonts/wotfard.ttf", import.meta.url),
).then((res) => res.arrayBuffer())

export async function GET(req: Request) {
  try {
    console.log(req.url)
    const { searchParams } = new URL(`${req.url}`)
    const title = searchParams.get("title")
    const publishedDate = searchParams.get("published")
    return new ImageResponse(
      (
        <div
          tw="flex p-10 h-full w-full bg-white flex-col"
          style={{ fontFamily: "Wotfard" }}
        >
          <header tw="flex text-[36px] w-full">
            <div tw="font-bold" style={{ fontFamily: "Wotfard" }}>
              Yash Agarwal
            </div>
            <div tw="grow" />
            <div tw="text-[28px]">yashagarwal.in</div>
          </header>

          <main tw="flex grow pb-3 flex-col items-center justify-center">
            <div tw="flex">
              <div
                tw="bg-gray-100 p-8 text-7xl font-medium rounded-md text-center"
                style={{ fontFamily: "Wotfard" }}
              >
                {title}
              </div>
            </div>

            <div
              tw="mt-5 flex text-3xl text-gray-500"
              style={{ fontFamily: "Wotfard" }}
            >
              {publishedDate} - some views
            </div>
          </main>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Wotfard",
            data: await fontRegular,
            style: "normal",
          },
        ],
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response("Failed to generate the image", {
      status: 500,
    })
  }
}
