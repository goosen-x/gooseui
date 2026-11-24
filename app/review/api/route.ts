import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { NextResponse } from "next/server"
import { docsNavigation } from "@/lib/config/docs-navigation"
import registry from "@/registry.json"

export async function GET() {
  if (process.env.NODE_ENV !== "development")
    return new NextResponse(null, { status: 404 })
  const read = async (file: string, fallback: unknown) => {
    try {
      return JSON.parse(
        await readFile(path.join(process.cwd(), "review", file), "utf8"),
      )
    } catch {
      return fallback
    }
  }
  const [decisions, results] = await Promise.all([
    read("decisions.json", { items: {}, comment: "" }),
    read("results.json", {}),
  ])
  const manifests = Object.fromEntries(
    await Promise.all(
      registry.items.map(async (item) => [
        item.name,
        await read(`manifests/${item.name}.json`, {}),
      ]),
    ),
  )
  return NextResponse.json(
    { decisions, results, manifests },
    { headers: { "Cache-Control": "no-store" } },
  )
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development")
    return new NextResponse(null, { status: 404 })
  try {
    const body = await request.json()
    if (
      !body ||
      typeof body.comment !== "string" ||
      !body.items ||
      typeof body.items !== "object" ||
      Array.isArray(body.items)
    )
      return new NextResponse("Invalid data", { status: 400 })
    const slugs = new Set([
      ...registry.items.map((item) => item.name),
      ...docsNavigation
        .filter((section) =>
          ["components", "effects", "hooks"].includes(section.slug),
        )
        .flatMap((section) => section.items.map((item) => item.slug)),
    ])
    for (const [slug, value] of Object.entries(body.items)) {
      const entry = value as { status?: unknown; comment?: unknown } | null
      if (
        !slugs.has(slug) ||
        !entry ||
        typeof entry.comment !== "string" ||
        !["", "accepted", "revise", "delete"].includes(String(entry.status))
      )
        return new NextResponse("Invalid decision", { status: 400 })
    }
    await writeFile(
      path.join(process.cwd(), "review/decisions.json"),
      `${JSON.stringify(body, null, 2)}\n`,
      "utf8",
    )
    return NextResponse.json({ ok: true })
  } catch {
    return new NextResponse("Unable to save", { status: 400 })
  }
}
