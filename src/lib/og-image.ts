import fs from "fs"
import path from "path"
import { Resvg } from "@resvg/resvg-js"
import satori from "satori"
import sharp from "sharp"

const fontPath = path.resolve(
  "node_modules/@fontsource/geist-sans/files/geist-sans-latin-700-normal.woff"
)
const fontData = fs.readFileSync(fontPath)

const fontRegularPath = path.resolve(
  "node_modules/@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff"
)
const fontRegularData = fs.readFileSync(fontRegularPath)

function getTitleFontSize(text: string): string {
  if (text.length > 60) return "56px"
  if (text.length > 40) return "64px"
  return "72px"
}

function getDescriptionFontSize(text: string): string {
  if (!text) return "32px"
  if (text.length > 150) return "28px"
  if (text.length > 100) return "30px"
  return "32px"
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
          background: "#ffffff",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 80px 70px",
          fontFamily: "Geist Sans",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
              },
              children: [
                date
                  ? {
                      type: "div",
                      props: {
                        style: {
                          fontSize: "22px",
                          color: "#999999",
                          marginBottom: "16px",
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
                      color: "#1a1a1a",
                      marginBottom: description ? "20px" : "0",
                      lineHeight: 1.15,
                      letterSpacing: "-0.5px",
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
                          color: "#666666",
                          lineHeight: 1.4,
                          maxWidth: "900px",
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
                fontSize: "22px",
                color: "#999999",
              },
              children: "yashagarwal.in",
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
    },
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
