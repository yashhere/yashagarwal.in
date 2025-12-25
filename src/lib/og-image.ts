import fs from "fs"
import path from "path"
import { Resvg } from "@resvg/resvg-js"
import satori from "satori"
import sharp from "sharp"

// Cache fonts and background image
const fontPath = path.resolve(
  "node_modules/@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff"
)
const fontData = fs.readFileSync(fontPath)

const fontRegularPath = path.resolve(
  "node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff"
)
const fontRegularData = fs.readFileSync(fontRegularPath)

const bgPath = path.resolve("public/images/og.png")
const bgBuffer = fs.readFileSync(bgPath)
const bgBase64 = `data:image/png;base64,${bgBuffer.toString("base64")}`

function getTitleFontSize(text: string): string {
  if (text.length > 60) return "56px"
  if (text.length > 40) return "64px"
  return "72px"
}

function getDescriptionFontSize(text: string): string {
  if (!text) return "36px"
  if (text.length > 150) return "28px"
  if (text.length > 100) return "32px"
  return "36px"
}

interface OGImageOptions {
  title: string
  description?: string
  date?: string
}

export async function generateOGImage(
  options: OGImageOptions
): Promise<Buffer> {
  const { title, description, date } = options
  const height = 630
  const width = 1200

  const titleFontSize = getTitleFontSize(title)
  const descriptionFontSize = getDescriptionFontSize(description || "")

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          height: "100%",
          width: "100%",
          backgroundImage: `url('${bgBase64}')`,
          backgroundSize: "1200px 630px",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "Geist Sans",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                maxWidth: "900px",
                height: "100%",
              },
              children: [
                date
                  ? {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "24px",
                          color: "#9ca3af",
                          marginBottom: "20px",
                          fontWeight: 400,
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                        },
                        children: date,
                      },
                    }
                  : null,
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: titleFontSize,
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "24px",
                      lineHeight: 1.1,
                      letterSpacing: "-1px",
                    },
                    children: title,
                  },
                },
                description
                  ? {
                      type: "div",
                      props: {
                        style: {
                          fontSize: descriptionFontSize,
                          color: "#d1d5db",
                          lineHeight: 1.4,
                          fontWeight: 400,
                        },
                        children: description,
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "60px",
                left: "80px",
                fontSize: "24px",
                color: "#9ca3af",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
              },
              children: [
                {
                  type: "span",
                  props: {
                    style: { color: "#ffffff" },
                    children: "Yash Agarwal",
                  },
                },
                {
                  type: "span",
                  props: {
                    style: { margin: "0 10px", color: "#4b5563" },
                    children: "/",
                  },
                },
                {
                  type: "span",
                  props: {
                    children: "yashagarwal.in",
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width,
      height,
      fonts: [
        {
          name: "Geist Sans",
          data: fontData,
          weight: 700,
          style: "normal",
        },
        {
          name: "Geist Sans",
          data: fontRegularData,
          weight: 400,
          style: "normal",
        },
      ],
    }
  )

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: width,
    },
  })

  const image = resvg.render()

  const optimizedPng = await sharp(image.asPng())
    .png({ quality: 90, compressionLevel: 9 })
    .toBuffer()

  return optimizedPng
}
