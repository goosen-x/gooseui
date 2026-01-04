/**
 * Utility functions for GooseUI Blocks (client-safe)
 */

import type { FileTreeItem } from "./declarations"
import { getBlockById } from "./metadata"

/**
 * Registry base path
 */
const REGISTRY_PATH = "registry/new-york/blocks"

/**
 * Get the file path for a block component
 */
export function getBlockFilePath(id: string): string {
  const block = getBlockById(id)
  if (!block) return ""

  // For now, we use a mapping. In the future, this could be automatic.
  const idToFile: Record<string, string> = {
    "header-01": "headers/header-simple.tsx",
    "header-02": "headers/header-with-cta.tsx",
    "header-03": "headers/header-auth.tsx",
    "footer-01": "footers/footer-simple.tsx",
    "footer-02": "footers/footer-columns.tsx",
    "footer-03": "footers/footer-newsletter.tsx",
  }

  const categoryFolder = block.category === "e-commerce" ? "ecommerce" : block.category
  return idToFile[id] || `${categoryFolder}/${id}.tsx`
}

/**
 * Extract clean code from markdown code blocks
 * Removes the ```tsx wrapper if present
 */
export function getCleanCode(code: string): string {
  const codeBlockRegex = /```(?:tsx|typescript|javascript|js|jsx|ts|[a-z]*)\n([\s\S]*?)```/g
  const match = codeBlockRegex.exec(code)
  return match ? match[1].trim() : code.trim()
}

/**
 * Get file extension icon
 */
export function getFileIcon(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || ""
  const icons: Record<string, string> = {
    tsx: "react",
    ts: "typescript",
    js: "javascript",
    jsx: "react",
    css: "css",
    json: "json",
    md: "markdown",
    mdx: "markdown",
  }
  return icons[ext] || "file"
}

/**
 * Find the first file in a file tree (for initial display)
 */
export function findFirstFile(tree: FileTreeItem[]): FileTreeItem | null {
  for (const item of tree) {
    if (item.type === "file") {
      return item
    }
    if (item.type === "folder" && item.children.length > 0) {
      const found = findFirstFile(item.children)
      if (found) return found
    }
  }
  return null
}
