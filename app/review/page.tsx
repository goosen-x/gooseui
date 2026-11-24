import { readFile } from "node:fs/promises"
import path from "node:path"
import { notFound } from "next/navigation"
import { docsNavigation } from "@/lib/config/docs-navigation"
import registry from "@/registry.json"
import { type ReviewRow, ReviewTable } from "./review-table"

export const dynamic = "force-dynamic"

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(
      await readFile(path.join(process.cwd(), "review", file), "utf8"),
    ) as T
  } catch {
    return fallback
  }
}

export default async function ReviewPage() {
  if (process.env.NODE_ENV !== "development") notFound()
  const [results, decisions] = await Promise.all([
    readJson<Record<string, { problems: string[]; js: number | null }>>(
      "results.json",
      {},
    ),
    readJson<{
      items: Record<string, { status: string; comment: string }>
      comment: string
    }>("decisions.json", { items: {}, comment: "" }),
  ])
  const rows: ReviewRow[] = await Promise.all(
    registry.items.map(async (item) => {
      const section = docsNavigation.find((s) =>
        s.items.some((n) => n.slug === item.name && !n.isComingSoon),
      )
      const nav = section?.items.find(
        (n) => n.slug === item.name && !n.isComingSoon,
      )
      const manifest = await readJson<{
        verdict?: string
        jsBefore?: number
        jsAfter?: number
        breaking?: string[]
      }>(`manifests/${item.name}.json`, {})
      return {
        slug: item.name,
        title: item.title || item.name,
        section: section?.title.ru || "Вне навигации",
        group:
          section?.groups?.find((g) => g.id === nav?.category)?.title.ru ||
          nav?.category ||
          "",
        href: nav?.href || null,
        verdict: manifest.verdict || null,
        before: manifest.jsBefore ?? null,
        after: manifest.jsAfter ?? results[item.name]?.js ?? null,
        breaking: manifest.breaking || [],
        problems: results[item.name]?.problems ?? null,
      }
    }),
  )
  return <ReviewTable rows={rows} initialDecisions={decisions} />
}
