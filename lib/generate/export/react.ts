/**
 * React Export - Generate React component code from page schema
 */

import { componentRegistry } from "../registry"
import type { PageSchema, SectionSchema } from "../types"

/**
 * Get component import path based on section type and variant
 */
function getImportPath(section: SectionSchema): string {
  const paths: Record<string, Record<string, string>> = {
    header: {
      "header-simple": "@/registry/new-york/blocks/headers/header-simple",
      "header-cta": "@/registry/new-york/blocks/headers/header-with-cta",
      "header-auth": "@/registry/new-york/blocks/headers/header-auth",
    },
    hero: {
      "hero-classic": "@/registry/new-york/blocks/hero/hero-classic",
      "hero-split": "@/registry/new-york/blocks/hero/hero-split",
    },
    brands: {
      "brands-carousel": "@/registry/new-york/blocks/brands/brands-carousel",
    },
    services: {
      "services-marquee":
        "@/registry/new-york/blocks/services/services-marquee",
    },
    footer: {
      "footer-simple": "@/registry/new-york/blocks/footers/footer-simple",
      "footer-columns": "@/registry/new-york/blocks/footers/footer-columns",
      "footer-newsletter":
        "@/registry/new-york/blocks/footers/footer-newsletter",
    },
  }

  return (
    paths[section.type]?.[section.variant] || `@/components/${section.type}`
  )
}

/**
 * Get component name from variant ID
 */
function getComponentName(section: SectionSchema): string {
  const names: Record<string, Record<string, string>> = {
    header: {
      "header-simple": "HeaderSimple",
      "header-cta": "HeaderWithCta",
      "header-auth": "HeaderAuth",
    },
    hero: {
      "hero-classic": "HeroClassic",
      "hero-split": "HeroSplit",
    },
    brands: {
      "brands-carousel": "BrandsCarousel",
    },
    services: {
      "services-marquee": "ServicesMarquee",
    },
    footer: {
      "footer-simple": "FooterSimple",
      "footer-columns": "FooterColumns",
      "footer-newsletter": "FooterNewsletter",
    },
  }

  return names[section.type]?.[section.variant] || `${section.type}Component`
}

/**
 * Generate props string for a component
 */
function generatePropsString(props: Record<string, unknown>): string {
  if (Object.keys(props).length === 0) return ""

  const propsArray = Object.entries(props).map(([key, value]) => {
    if (typeof value === "string") {
      return `${key}="${value}"`
    }
    return `${key}={${JSON.stringify(value)}}`
  })

  return " " + propsArray.join(" ")
}

export interface ReactExportOptions {
  typescript?: boolean
  includeMetadata?: boolean
  componentName?: string
}

/**
 * Export page schema to React component code
 */
export function exportToReact(
  page: PageSchema,
  options: ReactExportOptions = {},
): string {
  const {
    typescript = true,
    includeMetadata = true,
    componentName = "LandingPage",
  } = options

  // Collect unique imports
  const imports = new Map<string, string[]>()

  page.sections.forEach((section) => {
    const path = getImportPath(section)
    const name = getComponentName(section)

    if (!imports.has(path)) {
      imports.set(path, [])
    }
    imports.get(path)!.push(name)
  })

  // Generate import statements
  const importStatements = Array.from(imports.entries())
    .map(([path, names]) => `import { ${names.join(", ")} } from "${path}"`)
    .join("\n")

  // Generate component JSX
  const sectionsJSX = page.sections
    .map((section) => {
      const name = getComponentName(section)
      const props = generatePropsString(section.props)
      return `      <${name}${props} />`
    })
    .join("\n")

  // Generate metadata export for Next.js
  const metadataExport = includeMetadata
    ? `
export const metadata${typescript ? ": Metadata" : ""} = {
  title: "${page.settings.title}",
  description: "${page.settings.description || ""}",
${page.settings.ogImage ? `  openGraph: { images: ["${page.settings.ogImage}"] },` : ""}
}
`
    : ""

  const metadataImport =
    includeMetadata && typescript
      ? 'import type { Metadata } from "next"\n'
      : ""

  const code = `${metadataImport}${importStatements}
${metadataExport}
export default function ${componentName}() {
  return (
    <main>
${sectionsJSX}
    </main>
  )
}
`

  return code
}

/**
 * Export to React and trigger download
 */
export function downloadReact(
  page: PageSchema,
  options?: ReactExportOptions,
): void {
  const code = exportToReact(page, options)
  const ext = options?.typescript !== false ? "tsx" : "jsx"
  const blob = new Blob([code], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${page.name.toLowerCase().replace(/\s+/g, "-")}.${ext}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
