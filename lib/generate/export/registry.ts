/**
 * Registry Export - Generate shadcn CLI compatible registry JSON
 */

import type { PageSchema, SectionSchema } from "../types"
import { exportToReact } from "./react"

/**
 * Get registry dependencies for a section
 */
function getRegistryDependencies(section: SectionSchema): string[] {
  const deps: Record<string, string[]> = {
    header: ["button", "navigation-menu"],
    hero: ["button"],
    brands: ["marquee"],
    services: ["card", "marquee"],
    footer: ["button", "input"],
  }

  return deps[section.type] || []
}

/**
 * Get npm dependencies for a section
 */
function getNpmDependencies(section: SectionSchema): string[] {
  const deps: Record<string, string[]> = {
    header: ["lucide-react"],
    hero: ["lucide-react"],
    brands: [],
    services: ["lucide-react"],
    footer: ["lucide-react"],
  }

  return deps[section.type] || []
}

export interface RegistryItem {
  name: string
  type: "registry:block"
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: {
    path: string
    content: string
    type: "registry:block"
  }[]
}

export interface RegistryExportOptions {
  name?: string
  description?: string
}

/**
 * Export page schema to shadcn registry format
 */
export function exportToRegistry(
  page: PageSchema,
  options: RegistryExportOptions = {},
): RegistryItem {
  const name = options.name || page.name.toLowerCase().replace(/\s+/g, "-")
  const description =
    options.description ||
    page.settings.description ||
    `Landing page: ${page.name}`

  // Collect all dependencies
  const allRegistryDeps = new Set<string>()
  const allNpmDeps = new Set<string>(["react"])

  page.sections.forEach((section) => {
    getRegistryDependencies(section).forEach((dep) => allRegistryDeps.add(dep))
    getNpmDependencies(section).forEach((dep) => allNpmDeps.add(dep))
  })

  // Generate the main component code
  const componentCode = exportToReact(page, {
    typescript: true,
    includeMetadata: false,
    componentName: "Page",
  })

  const registryItem: RegistryItem = {
    name,
    type: "registry:block",
    description,
    dependencies: Array.from(allNpmDeps),
    registryDependencies: Array.from(allRegistryDeps),
    files: [
      {
        path: `blocks/${name}/page.tsx`,
        content: componentCode,
        type: "registry:block",
      },
    ],
  }

  return registryItem
}

/**
 * Export to registry JSON and trigger download
 */
export function downloadRegistry(
  page: PageSchema,
  options?: RegistryExportOptions,
): void {
  const registry = exportToRegistry(page, options)
  const json = JSON.stringify(registry, null, 2)
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${registry.name}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Generate CLI command for installing the exported registry
 */
export function getInstallCommand(registryUrl: string): string {
  return `npx shadcn@latest add ${registryUrl}`
}
