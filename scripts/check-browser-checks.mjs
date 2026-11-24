// Fails when a docs page lists a Baseline feature that has no browser check.
// A feature is exempt when its object has `browserCheck: false`.
// Run: pnpm check:browser
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const root = process.cwd()
const checksSource = readFileSync(
  join(root, "registry/gooseui/lib/baseline-checks.ts"),
  "utf8",
)
const start = checksSource.indexOf("export const BASELINE_CHECKS")
const end = checksSource.indexOf("} as const satisfies", start)
const table = checksSource.slice(start, end)
const known = new Set(
  [...table.matchAll(/^ {2}(?:"([\w-]+)"|([\w]+)):\s*\{/gm)].map(
    (m) => m[1] ?? m[2],
  ),
)

function* pages(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) yield* pages(path)
    else if (name === "page.tsx") yield path
  }
}

const missing = []
for (const file of pages(join(root, "app"))) {
  const src = readFileSync(file, "utf8")
  // BrowserSupport form: { featureId: "x", ..., browserCheck: false }
  for (const m of src.matchAll(/featureId:\s*"([^"]+)"/g)) {
    const rest = src.slice(m.index + m[0].length)
    const body = rest.slice(0, rest.search(/\n\s*\},?\s*\n/) + 1 || undefined)
    if (/browserCheck:\s*false/.test(body)) continue
    if (!known.has(m[1])) missing.push([m[1], file])
  }
  // BaselineStatus form: shows a check only with a bare/true `browserCheck`
  for (const m of src.matchAll(/<BaselineStatus\b[^>]*?\/?>/gs)) {
    const id = /featureId="([^"]+)"/.exec(m[0])?.[1]
    if (!id || !/\sbrowserCheck(\s|\/|>|=\{true\})/.test(m[0])) continue
    if (!known.has(id)) missing.push([id, file])
  }
}

if (missing.length) {
  console.error(
    "Features without a browser check in registry/gooseui/lib/baseline-checks.ts.",
  )
  console.error("Add a check or set `browserCheck: false` on the feature:\n")
  for (const [id, file] of missing) {
    console.error(`  ${id} -> ${relative(root, file)}`)
  }
  process.exit(1)
}
console.log(`browser checks ok (${known.size} known features)`)
