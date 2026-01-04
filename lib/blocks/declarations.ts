/**
 * Type declarations for GooseUI Blocks system
 * Inspired by blocks.so structure
 */

import type { LucideIcon } from "lucide-react"

/**
 * Block type - determines how the block is displayed in code view
 * - "file": Single-file component (simple code view)
 * - "directory": Multi-file component (file tree + code view)
 */
export type BlockType = "file" | "directory"

/**
 * Block metadata interface
 */
export interface BlockMetadata {
  /** Unique block identifier (e.g., "header-01", "stats-01") */
  id: string
  /** Category slug this block belongs to */
  category: string
  /** Display name */
  name: string
  /** Short description */
  description: string
  /** Block type: single file or directory with multiple files */
  type: BlockType
  /** Height for iframe preview (px) */
  iframeHeight?: number
  /** Is this a featured block? */
  isFeatured?: boolean
  /** Is this new? */
  isNew?: boolean
  /** Coming soon? */
  isComingSoon?: boolean
  /** Dependencies required */
  dependencies?: string[]
}

/**
 * Category metadata interface
 */
export interface CategoryMetadata {
  /** URL slug (e.g., "headers", "stats") */
  id: string
  /** Display name */
  name: string
  /** Short description */
  description: string
  /** Icon component */
  icon: LucideIcon
  /** Optional thumbnail SVG */
  thumbnail?: string
  /** Custom CSS classes for thumbnail */
  thumbnailCustomClasses?: string
  /** Number of blocks in category (computed) */
  count?: number
  /** Has chart components? */
  hasCharts?: boolean
  /** Coming soon? */
  isComingSoon?: boolean
}

/**
 * File tree item for directory-type blocks
 */
export type FileTreeItem = FileItem | FolderItem

export interface FileItem {
  type: "file"
  name: string
  path: string
  content: string
}

export interface FolderItem {
  type: "folder"
  name: string
  path: string
  children: FileTreeItem[]
}

/**
 * Block with code content
 */
export interface BlockWithCode extends BlockMetadata {
  /** Source code (for single-file blocks) */
  code?: string
  /** File tree (for directory blocks) */
  files?: FileTreeItem[]
}

/**
 * Category IDs mapping for type safety
 */
export const categoryIds = {
  headers: "headers",
  footers: "footers",
  hero: "hero",
  stats: "stats",
  login: "login",
  dashboard: "dashboard",
  marketing: "marketing",
  "e-commerce": "e-commerce",
  forms: "forms",
  ai: "ai",
  authentication: "authentication",
  "data-display": "data-display",
  feedback: "feedback",
  web3: "web3",
} as const

export type CategoryId = keyof typeof categoryIds
