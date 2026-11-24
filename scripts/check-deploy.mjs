#!/usr/bin/env node
// Smoke test after a deploy: key pages and every registry item answer 200.
// Usage: node scripts/check-deploy.mjs [https://gooseui.pro]

import { readFileSync } from "node:fs"

const base = (process.argv[2] || "https://gooseui.pro").replace(/\/$/, "")
const registry = JSON.parse(readFileSync("registry.json", "utf8"))

const paths = [
  "/",
  "/ru",
  "/docs/components",
  "/ru/docs/components",
  "/sitemap.xml",
  "/r/registry.json",
  ...registry.items.map((item) => `/r/${item.name}.json`),
]

async function check(path, attempt = 1) {
  try {
    const response = await fetch(base + path, { redirect: "manual" })
    if (response.status === 200) return null
    if (attempt < 3 && response.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      return check(path, attempt + 1)
    }
    return `${response.status} ${path}`
  } catch (error) {
    if (attempt < 3) return check(path, attempt + 1)
    return `ERR ${path} ${error.message}`
  }
}

const failures = []
for (let i = 0; i < paths.length; i += 10) {
  const batch = await Promise.all(paths.slice(i, i + 10).map((p) => check(p)))
  failures.push(...batch.filter(Boolean))
}

if (failures.length) {
  console.error(`${failures.length} of ${paths.length} URLs failed on ${base}:`)
  for (const line of failures) console.error(`  ${line}`)
  process.exit(1)
}
console.log(`All ${paths.length} URLs answer 200 on ${base}`)
