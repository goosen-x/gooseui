// Builds registry/gooseui/lib/phone-countries.ts from libphonenumber metadata.
// Run: node scripts/generate-phone-countries.mjs
// The package is a devDependency of this script only, it never reaches the registry.
// The output is deterministic: same metadata, same bytes.
import { readFileSync, writeFileSync } from "node:fs"
import { gzipSync } from "node:zlib"
import { createRequire } from "node:module"
import path from "node:path"
import { Metadata, getExampleNumber, parsePhoneNumberFromString } from "libphonenumber-js/max"
import metadata from "libphonenumber-js/max/metadata"
import examples from "libphonenumber-js/mobile/examples"

const require = createRequire(import.meta.url)
const version = require("libphonenumber-js/package.json").version
const out = path.join("registry", "gooseui", "lib", "phone-countries.ts")

const meta = new Metadata(metadata)
const plan = (code) => {
  meta.selectNumberingPlan(code)
  return meta.numberingPlan
}

// ---- Mask: the format of the example mobile number, without the domestic prefix

function maskOf(code, nationalPrefix, fallbackLength) {
  const example = getExampleNumber(code, examples)
  if (!example) return "#".repeat(fallbackLength)
  const length = example.nationalNumber.length
  const count = (s) => s.replace(/\D/g, "").length
  let text = example.formatNational()
  if (count(text) !== length && nationalPrefix && text.startsWith(nationalPrefix)) {
    text = text.slice(nationalPrefix.length).replace(/^[\s-]+/, "")
  }
  if (count(text) !== length) {
    text = example.formatInternational().replace(/^\+\d+\s*/, "")
  }
  if (count(text) !== length) return "#".repeat(length)
  return text.replace(/\d/g, "#")
}

// ---- Prefixes: tell apart countries that share a calling code (+1, +7, +44 …)
// The first country of a group is the default one and gets no prefixes.
// The others get the national number starts that libphonenumber resolves to them.

const FILLERS = ["1234567890123", "5555555555555", "0000000000000", "9876543210987", "3141592653589"]

function probe(cc, prefix, lengths) {
  for (const length of lengths) {
    for (const filler of FILLERS) {
      const national = (prefix + filler).slice(0, length)
      if (national.length < length) continue
      const country = parsePhoneNumberFromString(`+${cc}${national}`)?.country
      if (country) return country
    }
  }
  return undefined
}

function prefixesFor(cc, group, lengthsOf) {
  const depth = cc === "1" ? 3 : 4
  const lengths = [...new Set(group.flatMap((c) => lengthsOf[c]))].sort((a, b) => a - b)
  const found = new Map()
  const walk = (prefix) => {
    const country = probe(cc, prefix, lengths.filter((l) => l >= prefix.length))
    if (prefix.length === depth) {
      if (country) found.set(prefix, country)
      return
    }
    for (let d = 0; d < 10; d++) walk(prefix + d)
  }
  for (let d = 0; d < 10; d++) walk(String(d))
  // Merge 10 siblings of one country into their parent, level by level
  for (let size = depth; size > 1; size--) {
    const parents = new Map()
    for (const [p, c] of found) {
      if (p.length !== size) continue
      const key = p.slice(0, -1)
      const kids = parents.get(key) ?? []
      kids.push([p, c])
      parents.set(key, kids)
    }
    for (const [key, kids] of parents) {
      if (kids.length === 10 && kids.every(([, c]) => c === kids[0][1])) {
        for (const [p] of kids) found.delete(p)
        found.set(key, kids[0][1])
      }
    }
  }
  const byCountry = new Map()
  for (const [p, c] of [...found].sort(([a], [b]) => (a < b ? -1 : 1))) {
    byCountry.set(c, [...(byCountry.get(c) ?? []), p])
  }
  return byCountry
}

// ---- Collect

const codes = Object.keys(metadata.countries).sort()
const info = new Map()
for (const code of codes) {
  const np = plan(code)
  const mobile = np.type("MOBILE")?.possibleLengths?.() ?? np.possibleLengths()
  info.set(code, {
    dial: String(np.callingCode()),
    trunk: np.nationalPrefix() ?? "",
    lengths: [...mobile].sort((a, b) => a - b),
  })
}
const lengthsOf = Object.fromEntries([...info].map(([c, i]) => [c, i.lengths]))

const rows = []
const groups = Object.entries(metadata.country_calling_codes).sort(
  ([a], [b]) => Number(a) - Number(b),
)
for (const [cc, group] of groups) {
  const countries = group.filter((c) => info.has(c))
  if (!countries.length) continue // non-geographic codes (+800, +882 …)
  const prefixes = countries.length > 1 ? prefixesFor(cc, countries, lengthsOf) : new Map()
  countries.forEach((code, i) => {
    const { dial, trunk, lengths } = info.get(code)
    const mask = maskOf(code, trunk, lengths[0] ?? 9)
    const digits = (mask.match(/#/g) ?? []).length
    const room = 15 - dial.length
    const min = Math.min(lengths[0] ?? digits, digits)
    const max = Math.min(Math.max(lengths.at(-1) ?? digits, digits), room)
    rows.push({
      code,
      dial,
      mask,
      len: min === digits && max === digits ? "" : `${min}-${max}`,
      trunk,
      // "018" and "18" are the same start once the domestic prefix is dropped
      prefixes:
        i === 0
          ? []
          : (prefixes.get(code) ?? []).filter(
              (p) => !trunk || !p.startsWith(trunk) || p.length === 1,
            ),
    })
  })
}

// ---- Write

const line = (r) => {
  const fields = [r.code, r.dial, r.mask, r.len, r.trunk, r.prefixes.join(",")]
  while (fields.length > 3 && fields.at(-1) === "") fields.pop()
  return fields.join("|")
}
const data = rows.map(line).join("\n")

const file = `// GENERATED by scripts/generate-phone-countries.mjs, do not edit.
// Source: libphonenumber-js ${version} (Google libphonenumber metadata).
// Country names are not stored: the component gets them from Intl.DisplayNames.
// Per country: ISO code | calling code | mask of the most common mobile format
// | min-max national length of mobile numbers (empty: the mask length)
// | domestic prefix | national number starts for codes shared by several countries.
// Countries of one calling code go together, the default one first.

export type PhoneCountry = {
  /** ISO 3166-1 alpha-2 code, e.g. "DE" */
  code: string
  /** Shown when Intl.DisplayNames has no name for \`code\` */
  name?: string
  /** Calling code without "+", e.g. "49" */
  dialCode: string
  /** National number mask, "#" stands for a digit */
  mask: string
  /** Minimum national digits for a valid number. Defaults to the mask length */
  minLength?: number
  /** Maximum national digits. Defaults to the mask length */
  maxLength?: number
  /** National number prefixes that tell apart countries sharing a calling code */
  prefixes?: string[]
  /** Domestic prefix replaced by the calling code on paste, e.g. "0" */
  trunkPrefix?: string
  /** Emoji flag. Built from \`code\` when omitted */
  flag?: string
}

const DATA =
  ${JSON.stringify(data)}

export const PHONE_COUNTRIES: PhoneCountry[] = DATA.split("\\n").map((row) => {
  const [code, dialCode, mask, length, trunkPrefix, prefixes] = row.split("|")
  const [min, max] = length ? length.split("-").map(Number) : []
  return {
    code,
    dialCode,
    mask,
    ...(min ? { minLength: min, maxLength: max } : null),
    ...(trunkPrefix ? { trunkPrefix } : null),
    ...(prefixes ? { prefixes: prefixes.split(",") } : null),
  }
})
`

writeFileSync(out, file)

const size = Buffer.byteLength(file)
const gzip = gzipSync(file, { level: 9 }).length
const withPrefixes = rows.filter((r) => r.prefixes.length).length
console.log(
  `phone-countries: ${rows.length} countries, ${groups.length} calling codes, ${withPrefixes} with prefixes`,
)
console.log(`${out}: ${size} B, gzip ${gzip} B (libphonenumber-js ${version})`)
