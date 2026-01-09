/**
 * HTML Export - Generate standalone HTML from page schema
 */

import type { PageSchema, SectionSchema } from "../types"
import { getComponent } from "../registry"

/**
 * Generate inline styles for Tailwind (simplified)
 * In production, you'd use Tailwind's JIT compiler
 */
function getTailwindCDN(): string {
  return '<script src="https://cdn.tailwindcss.com"></script>'
}

/**
 * Generate HTML for a single section
 */
function generateSectionHTML(section: SectionSchema): string {
  // For now, we generate placeholder comments
  // In production, you'd use renderToStaticMarkup from react-dom/server
  return `
    <!-- Section: ${section.type} (variant: ${section.variant}) -->
    <section data-section-id="${section.id}" data-section-type="${section.type}" data-variant="${section.variant}">
      <!-- Component content would be rendered here -->
    </section>
  `
}

/**
 * Add watermark for free tier
 */
function getWatermark(includeWatermark: boolean): string {
  if (!includeWatermark) return ""

  return `
    <!-- GooseUI Watermark -->
    <div style="position: fixed; bottom: 16px; right: 16px; z-index: 9999;">
      <a href="https://gooseui.pro" target="_blank" rel="noopener noreferrer"
         style="display: flex; align-items: center; gap: 8px; padding: 8px 12px;
                background: rgba(0,0,0,0.8); color: white; border-radius: 8px;
                font-size: 12px; text-decoration: none; font-family: system-ui;">
        Built with GooseUI
      </a>
    </div>
  `
}

export interface HTMLExportOptions {
  includeWatermark?: boolean
  minify?: boolean
  includeMetaTags?: boolean
}

/**
 * Export page schema to standalone HTML
 */
export function exportToHTML(
  page: PageSchema,
  options: HTMLExportOptions = {}
): string {
  const {
    includeWatermark = true,
    minify = false,
    includeMetaTags = true,
  } = options

  const sectionsHTML = page.sections
    .map((section) => generateSectionHTML(section))
    .join("\n")

  const metaTags = includeMetaTags
    ? `
    <meta name="description" content="${page.settings.description || ""}">
    <meta property="og:title" content="${page.settings.title}">
    <meta property="og:description" content="${page.settings.description || ""}">
    ${page.settings.ogImage ? `<meta property="og:image" content="${page.settings.ogImage}">` : ""}
  `
    : ""

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.settings.title}</title>
  ${metaTags}
  ${getTailwindCDN()}
  <style>
    /* Custom styles */
    * { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body>
  ${sectionsHTML}
  ${getWatermark(includeWatermark)}
</body>
</html>`

  if (minify) {
    return html
      .replace(/\n\s*/g, "")
      .replace(/>\s+</g, "><")
      .trim()
  }

  return html
}

/**
 * Export to HTML and trigger download
 */
export function downloadHTML(page: PageSchema, options?: HTMLExportOptions): void {
  const html = exportToHTML(page, options)
  const blob = new Blob([html], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${page.name.toLowerCase().replace(/\s+/g, "-")}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
