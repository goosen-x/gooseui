/**
 * Navigation consistency validation script
 *
 * Validates that:
 * 1. All navigation items have corresponding pages
 * 2. No duplicate slugs or hrefs
 * 3. All hrefs are valid paths
 *
 * Run with: pnpm tsx scripts/validate-navigation.ts
 */

import * as fs from "fs"
import * as path from "path"
import {
  docsNavigation,
  getAllNavItems,
  type NavGroup,
  navTitle,
} from "../lib/config/docs-navigation"

// Support both structures:
// - app/(docs)/docs/... (current)
// - app/[locale]/(docs)/docs/... (i18n)
const APP_DIRS = [
  path.join(process.cwd(), "app/(docs)"),
  path.join(process.cwd(), "app/[locale]/(docs)"),
]

function getAppDir(): string {
  for (const dir of APP_DIRS) {
    if (fs.existsSync(dir)) {
      return dir
    }
  }
  return APP_DIRS[0]
}

const APP_DIR = getAppDir()

interface ValidationError {
  type:
    | "missing_page"
    | "duplicate_slug"
    | "duplicate_href"
    | "invalid_href"
    | "unknown_category"
  message: string
  item?: string
}

const errors: ValidationError[] = []

// 1. Check for duplicate slugs
function checkDuplicateSlugs() {
  const allItems = getAllNavItems()
  const slugs = new Map<string, string>()

  for (const item of allItems) {
    if (slugs.has(item.slug)) {
      errors.push({
        type: "duplicate_slug",
        message: `Duplicate slug "${item.slug}" found in "${navTitle(item, "en")}" and "${slugs.get(item.slug)}"`,
        item: item.slug,
      })
    } else {
      slugs.set(item.slug, navTitle(item, "en"))
    }
  }
}

// 2. Check for duplicate hrefs
function checkDuplicateHrefs() {
  const allItems = getAllNavItems()
  const hrefs = new Map<string, string>()

  for (const item of allItems) {
    if (hrefs.has(item.href)) {
      errors.push({
        type: "duplicate_href",
        message: `Duplicate href "${item.href}" found in "${navTitle(item, "en")}" and "${hrefs.get(item.href)}"`,
        item: item.href,
      })
    } else {
      hrefs.set(item.href, navTitle(item, "en"))
    }
  }
}

// 3. Check that all navigation items have corresponding pages
function checkPagesExist() {
  const allItems = getAllNavItems()

  for (const item of allItems) {
    // "Coming soon" items are shown disabled and have no page yet
    if (item.isComingSoon) continue
    // Convert href to file path
    // /docs -> app/[locale]/(docs)/docs/page.tsx
    // /docs/components/button -> app/[locale]/(docs)/docs/components/button/page.tsx
    const relativePath = item.href.replace(/^\//, "")
    const pagePath = path.join(APP_DIR, relativePath, "page.tsx")
    const mdxPath = path.join(APP_DIR, relativePath, "page.mdx")

    if (!fs.existsSync(pagePath) && !fs.existsSync(mdxPath)) {
      errors.push({
        type: "missing_page",
        message: `Missing page for "${navTitle(item, "en")}" (${item.href})`,
        item: item.href,
      })
    }
  }
}

// 4. Check that all hrefs start with /docs
function checkValidHrefs() {
  const allItems = getAllNavItems()

  for (const item of allItems) {
    if (!item.href.startsWith("/docs")) {
      errors.push({
        type: "invalid_href",
        message: `Invalid href "${item.href}" for "${navTitle(item, "en")}" - must start with /docs`,
        item: item.href,
      })
    }
  }
}

// 5. Validate section structure
function validateSectionStructure() {
  for (const section of docsNavigation) {
    if (!section.title.en || section.title.en.trim() === "") {
      errors.push({
        type: "invalid_href",
        message: `Section has empty title`,
        item: section.slug,
      })
    }

    if (!section.slug || section.slug.trim() === "") {
      errors.push({
        type: "invalid_href",
        message: `Section "${section.title.en}" has empty slug`,
        item: section.title.en,
      })
    }

    // A section with its own catalog page may be empty (filled later)
    if (section.items.length === 0 && !section.href) {
      errors.push({
        type: "invalid_href",
        message: `Section "${section.title.en}" has no items`,
        item: section.slug,
      })
    }

    // Catalog page of the section must exist
    if (section.href) {
      const pagePath = path.join(
        APP_DIR,
        section.href.replace(/^\//, ""),
        "page.tsx",
      )
      if (!fs.existsSync(pagePath)) {
        errors.push({
          type: "missing_page",
          message: `Missing catalog page for section "${section.title.en}" (${section.href})`,
          item: section.href,
        })
      }
    }

    // Items of grouped sections must use one of the section groups
    if (section.groups) {
      const ids = new Set(section.groups.map((g: NavGroup) => g.id))
      for (const item of section.items) {
        if (!item.category || !ids.has(item.category)) {
          errors.push({
            type: "unknown_category",
            message: `"${navTitle(item, "en")}" in "${section.title.en}" has category "${item.category ?? "none"}", expected one of: ${[...ids].join(", ")}`,
            item: item.slug,
          })
        }
      }
    }
  }
}

// Run all validations
console.log("Validating navigation configuration...\n")

checkDuplicateSlugs()
checkDuplicateHrefs()
checkPagesExist()
checkValidHrefs()
validateSectionStructure()

// Output results
if (errors.length === 0) {
  console.log("✅ All navigation validations passed!\n")
  console.log(`Checked ${getAllNavItems().length} items across ${docsNavigation.length} sections.`)
  process.exit(0)
} else {
  console.log(`❌ Found ${errors.length} error(s):\n`)

  for (const error of errors) {
    const icon =
      error.type === "missing_page"
        ? "📄"
        : error.type === "duplicate_slug"
          ? "🔁"
          : error.type === "duplicate_href"
            ? "🔗"
            : "⚠️"
    console.log(`  ${icon} ${error.message}`)
  }

  console.log("")
  process.exit(1)
}
