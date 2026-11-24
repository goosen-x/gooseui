import { readFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  if (process.env.NODE_ENV !== "development")
    return new NextResponse(null, { status: 404 })
  const { file } = await params
  if (!/^[a-z0-9-]+-(light|dark)\.png$/.test(file))
    return new NextResponse(null, { status: 404 })
  try {
    return new NextResponse(
      Uint8Array.from(
        await readFile(path.join(process.cwd(), "review/shots", file)),
      ).buffer,
      { headers: { "Content-Type": "image/png", "Cache-Control": "no-store" } },
    )
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}
