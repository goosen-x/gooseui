/**
 * GooseUI Blocks Library
 *
 * Central export for all blocks-related functionality.
 * Inspired by blocks.so structure.
 */

// Types and declarations
export * from "./declarations"

// Block metadata
export {
  blocksMetadata,
  getBlockById,
  getBlocksByCategory,
  getFeaturedBlocks,
  getAvailableBlocks,
  getDisplayBlocks,
  getDisplayBlocksByCategory,
  countAvailableBlocksInCategory,
  countBlocksInCategory,
  isDevelopment,
} from "./metadata"

// Categories
export {
  blocksCategoriesMetadata,
  getCategoryById,
  getAllCategories,
  getCategoriesWithCounts,
  getDisplayCategories,
  getAvailableCategories,
} from "./categories"

// Component registry
export {
  blocksComponents,
  getBlockComponent,
  hasBlockComponent,
  getRegisteredBlockIds,
} from "./components"

// Client-safe utilities
export {
  getBlockFilePath,
  getCleanCode,
  getFileIcon,
  findFirstFile,
} from "./utils"

// Server-only utilities are imported directly from "./utils.server"
// Do not re-export here to prevent client-side import errors
