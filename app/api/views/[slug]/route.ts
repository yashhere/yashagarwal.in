import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const path = req.nextUrl.pathname
  const slug = path.replace("/api/views/", "")
  try {
    const stat = await prisma.stats.upsert({
      where: { slug },
      create: { slug, views: 1 },
      update: { views: { increment: 1 } },
    })
    return NextResponse.json(stat?.views || 0, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: err }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const path = req.nextUrl.pathname
  const slug = path.replace("/api/views/", "")
  try {
    const stat = await prisma.stats.findUnique({
      where: { slug },
    })
    return NextResponse.json(stat?.views || 0, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: err }, { status: 500 })
  }
}
