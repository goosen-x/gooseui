import { readFileSync } from "node:fs"
const registry = JSON.parse(readFileSync("registry.json", "utf8")).items
const decisions = JSON.parse(readFileSync("review/decisions.json", "utf8")).items ?? {}
let missing = 0
for (const item of registry) {
  const decision = decisions[item.name]?.status
  if (decision !== "accepted") missing++
  console.log(`${decision === "accepted" ? "ПРИНЯТ" : "НЕ ПРИНЯТ"}  ${item.name}${decision ? ` (${decision})` : ""}`)
}
console.log(`Принято: ${registry.length - missing} из ${registry.length}`)
if (process.argv.includes("--strict") && missing) process.exitCode = 1
