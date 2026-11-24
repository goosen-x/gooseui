/**
 * Раздел «Блоки»: в production выключен, локально (dev) работает.
 * Чтобы включить на проде, замените значение на `true`.
 */
export const BLOCKS_ENABLED = process.env.NODE_ENV !== "production"
