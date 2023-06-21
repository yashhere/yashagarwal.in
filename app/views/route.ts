import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const data = await db.selectFrom("stats").select(["views"]).execute();
    return NextResponse.json(
      data.reduce((acc, curr) => acc + Number(curr.views), 0),
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
