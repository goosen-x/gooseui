/**
 * GooseUI Blocks Library
 *
 * Central export for all blocks-related functionality.
 * Inspired by blocks.so structure.
 */

// Categories
export {
  blocksCategoriesMetadata,
  getAllCategories,
  getAvailableCategories,
  getCategoriesWithCounts,
  getCategoryById,
  getDisplayCategories,
} from "./categories"
// Component registry
export {
  blocksComponents,
  getBlockComponent,
  getRegisteredBlockIds,
  hasBlockComponent,
} from "./components"
// Types and declarations
export * from "./declarations"
// Block metadata
export {
  blocksMetadata,
  countAvailableBlocksInCategory,
  countBlocksInCategory,
  getAvailableBlocks,
  getBlockById,
  getBlocksByCategory,
  getDisplayBlocks,
  getDisplayBlocksByCategory,
  getFeaturedBlocks,
  isDevelopment,
} from "./metadata"

// Client-safe utilities
export {
  findFirstFile,
  getBlockFilePath,
  getCleanCode,
  getFileIcon,
} from "./utils"

// Server-only utilities are imported directly from "./utils.server"
// Do not re-export here to prevent client-side import errors
