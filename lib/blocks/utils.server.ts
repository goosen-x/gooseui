/**
 * Server-only utility functions for GooseUI Blocks
 * These functions use Node.js fs module and can only run on the server.
 */

import "server-only"
import fs from "fs"
import path from "path"
import type { BlockMetadata, BlockWithCode, FileTreeItem } from "./declarations"
import { getBlockById } from "./metadata"
import { getBlockFilePath } from "./utils"

/**
 * Registry base path
 */
const REGISTRY_PATH = "registry/new-york/blocks"

/**
 * Read block source code from file
 * Note: This function should only be used server-side
 */
export async function getBlockCode(id: string): Promise<string | null> {
  try {
    const filePath = getBlockFilePath(id)
    if (!filePath) return null

    const fullPath = path.join(process.cwd(), REGISTRY_PATH, filePath)

    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, "utf-8")
    }

    return null
  } catch {
    return null
  }
}

/**
 * Generate file tree for directory-type blocks
 */
export function generateFileTree(
  folderPath: string,
  baseFolder?: string,
): FileTreeItem[] {
  const result: FileTreeItem[] = []
  const basePath = baseFolder || folderPath

  try {
    const items = fs.readdirSync(folderPath)

    for (const item of items) {
      const itemPath = path.join(folderPath, item)
      const relativePath = path.relative(basePath, itemPath)
      const stat = fs.statSync(itemPath)

      if (stat.isDirectory()) {
        result.push({
          type: "folder",
          name: item,
          path: relativePath,
          children: generateFileTree(itemPath, basePath),
        })
      } else {
        result.push({
          type: "file",
          name: item,
          path: relativePath,
          content: fs.readFileSync(itemPath, "utf-8"),
        })
      }
    }
  } catch {
    // Folder doesn't exist or can't be read
  }

  return result
}

/**
 * Get block with source code
 */
export async function getBlockWithCode(
  id: string,
): Promise<BlockWithCode | null> {
  const block = getBlockById(id)
  if (!block) return null

  if (block.type === "file") {
    const code = await getBlockCode(id)
    return { ...block, code: code || undefined }
  }

  // For directory-type blocks, get file tree
  const categoryFolder =
    block.category === "e-commerce" ? "ecommerce" : block.category
  const folderPath = path.join(process.cwd(), REGISTRY_PATH, categoryFolder, id)
  const files = generateFileTree(folderPath)

  return { ...block, files }
}

/**
 * Get blocks data for a category (with code)
 */
export async function getBlocksWithCode(
  blocks: BlockMetadata[],
): Promise<BlockWithCode[]> {
  const results = await Promise.all(
    blocks.map(async (block) => {
      const blockWithCode = await getBlockWithCode(block.id)
      return blockWithCode || { ...block }
    }),
  )
  return results
}
