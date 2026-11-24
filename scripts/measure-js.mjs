// Measures how much client JavaScript each registry item ships.
// Run: node scripts/measure-js.mjs [--json out.json]
// own   = minified + gzipped bundle of the item with its imports, without react / react-dom.
// total = the same for the item plus all its registryDependencies (recursively), shared code counted once.
import { createRequire } from "node:module"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { gzipSync } from "node:zlib"
import path from "node:path"

const require = createRequire(import.meta.url)
const tsxDir = path.dirname(require.resolve("tsx/package.json"))
const esbuild = createRequire(path.join(tsxDir, "index.js"))("esbuild")

const root = process.cwd()
const registry = JSON.parse(readFileSync("registry.json", "utf8"))

const alias = {
  name: "alias",
  setup(build) {
    build.onResolve({ filter: /^@\// }, (args) =>
      args.path === "@/lib/utils"
        ? { path: args.path, external: true }
        : build.resolve(`./${args.path.slice(2)}`, {
            resolveDir: root,
            kind: args.kind,
          }),
    )
  },
}

const byName = new Map(registry.items.map((item) => [item.name, item]))
const skipped = new Map() // item -> shadcn dependencies from the official registry (not measured)

const external = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react-dom/client",
  "*/lib/utils",
]

async function bundle(build) {
  const result = await esbuild.build({
    bundle: true,
    minify: true,
    write: false,
    format: "esm",
    platform: "browser",
    target: "es2022",
    jsx: "automatic",
    metafile: true,
    logLevel: "silent",
    // cn() from @/lib/utils (clsx + tailwind-merge, ~8 kB gzip) is shared by the whole app, so it is not counted per item
    external,
    define: { "process.env.NODE_ENV": '"production"' },
    plugins: [alias],
    ...build,
  })
  const code = result.outputFiles[0].contents
  const inputs = result.metafile.outputs[Object.keys(result.metafile.outputs)[0]].inputs
  // Bytes contributed by each npm package (minified, before gzip)
  const packages = {}
  let client = false
  for (const [file, info] of Object.entries(inputs)) {
    const m = file.match(/node_modules\/(?:\.pnpm\/[^/]+\/node_modules\/)?((?:@[^/]+\/)?[^/]+)/)
    if (m) packages[m[1]] = (packages[m[1]] ?? 0) + info.bytesInOutput
    else if (existsSync(file) && /^["']use client["']/m.test(readFileSync(file, "utf8"))) client = true
  }
  const top = Object.entries(packages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, bytes]) => `${name} ${(bytes / 1024).toFixed(1)}k`)
  return { gzip: gzipSync(code).length, client, packages: top }
}

// The item plus all its registryDependencies (recursively), each item once
function closure(item) {
  const seen = new Map()
  const walk = (current) => {
    if (seen.has(current.name)) return
    seen.set(current.name, current)
    for (const dep of current.registryDependencies ?? []) {
      const name = dep.replace(/^@gooseui\//, "")
      const next = byName.get(name)
      if (next) walk(next)
      else if (!dep.startsWith("@gooseui/")) {
        // official shadcn registry item, not measured
        const list = skipped.get(item.name) ?? []
        if (!list.includes(dep)) skipped.set(item.name, [...list, dep])
      }
    }
  }
  walk(item)
  return [...seen.values()]
}

const rows = []
for (const item of registry.items) {
  if (item.type === "registry:block" || item.type === "registry:component") continue
  const entry = item.files[0].path
  let source
  try {
    source = readFileSync(entry, "utf8")
  } catch {
    continue
  }
  const own = await bundle({ entryPoints: [entry] })
  // Hooks always run on the client even without a directive
  const ownClient = own.client || item.type === "registry:hook"
  const group = closure(item)
  let total = own
  let totalClient = ownClient
  if (group.length > 1) {
    const files = group.flatMap((member) => (member.files ?? []).map((f) => f.path)).filter((f) => existsSync(f))
    // One bundle for the whole group, so shared code is counted once
    const contents = files
      .map((f, i) => `import * as m${i} from "./${f}"\nexport { m${i} }`)
      .join("\n")
    total = await bundle({ stdin: { contents, resolveDir: root, loader: "js" } })
    totalClient = total.client || group.some((member) => member.type === "registry:hook")
  }
  rows.push({
    name: item.name,
    file: entry,
    client: ownClient,
    lines: source.split("\n").length,
    gzip: own.gzip,
    // What the browser really downloads: server components ship no JS at all
    shipped: ownClient ? own.gzip : 0,
    // Own code plus every registryDependency, shared code counted once
    total: totalClient ? total.gzip : 0,
    clientTotal: totalClient,
    deps: group.slice(1).map((member) => member.name),
    packages: own.packages,
  })
}

rows.sort((a, b) => b.total - a.total)
const jsonFlag = process.argv.indexOf("--json")
if (jsonFlag > -1) writeFileSync(process.argv[jsonFlag + 1], JSON.stringify(rows, null, 2))

const kb = (n) => `${(n / 1024).toFixed(1)} kB`
console.log(`${"item".padEnd(26)} ${"kind".padEnd(6)} ${"total".padStart(9)} ${"own".padStart(9)}  top packages (own)`)
for (const r of rows) {
  console.log(
    `${r.name.padEnd(26)} ${(r.clientTotal ? "client" : "server").padEnd(6)} ${kb(r.total).padStart(9)} ${kb(r.shipped).padStart(9)}  ${r.packages.join(", ")}`,
  )
}
const client = rows.filter((r) => r.clientTotal)
console.log(
  `\n${rows.length} items, ${client.length} client, ${rows.length - client.length} zero-JS. Sum of own: ${kb(rows.reduce((s, r) => s + r.shipped, 0))}`,
)

if (skipped.size) {
  console.log("\nOfficial shadcn registryDependencies (not measured):")
  for (const [name, list] of skipped) console.log(`  ${name}: ${list.join(", ")}`)
}

// Items that use a component of another registry item without listing it in registryDependencies
const used = /(?:from\s+|import\s*\(\s*)["']@\/(?:components\/ui|registry\/gooseui\/ui)\/([\w-]+)["']/g
const missing = []
for (const item of registry.items) {
  const declared = new Set((item.registryDependencies ?? []).map((d) => d.replace(/^@gooseui\//, "")))
  const own = new Set((item.files ?? []).map((f) => path.basename(f.path).replace(/\.[^.]+$/, "")))
  const need = new Set()
  for (const file of item.files ?? []) {
    if (!existsSync(file.path)) continue
    for (const m of readFileSync(file.path, "utf8").matchAll(used)) {
      const slug = m[1]
      if (slug !== item.name && !own.has(slug) && !declared.has(slug)) need.add(slug)
    }
  }
  if (need.size) missing.push(`  ${item.name}: ${[...need].map((s) => (byName.has(s) ? s : `${s} (нет в registry.json)`)).join(", ")}`)
}
console.log(`\nUsed but missing in registryDependencies (${missing.length}):`)
for (const line of missing) console.log(line)
