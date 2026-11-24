import type { MetadataRoute } from "next"
import {
  BLOCK_CATEGORIES,
  type BlockCategory,
} from "@/lib/config/blocks-categories"
import { BLOCK_ITEMS } from "@/lib/config/blocks-registry"
import {
  docsNavigation,
  filterDraftItems,
  type NavItem,
} from "@/lib/config/docs-navigation"
import { BLOCKS_ENABLED } from "@/lib/config/features"

/** Sections whose items and catalog pages go into the sitemap */
const ITEM_SECTIONS = ["components", "effects", "hooks"]

const BASE_URL = "https://gooseui.pro"

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/docs/installation`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/docs/cli`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]
  if (BLOCKS_ENABLED) {
    staticRoutes.push({
      url: `${BASE_URL}/docs/blocks`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  }

  // Catalog pages and their items: drafts and "coming soon" stay out
  const sections = filterDraftItems(docsNavigation).filter((section) =>
    ITEM_SECTIONS.includes(section.slug),
  )
  const catalogRoutes: MetadataRoute.Sitemap = docsNavigation
    .filter((section) => ITEM_SECTIONS.includes(section.slug) && section.href)
    .map((section) => ({
      url: `${BASE_URL}${section.href}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: section.slug === "components" ? 0.9 : 0.7,
    }))
  const itemRoutes: MetadataRoute.Sitemap = sections.flatMap((section) =>
    section.items
      .filter((item: NavItem) => !item.isComingSoon)
      .map((item: NavItem) => ({
        url: `${BASE_URL}${item.href}`,
        lastModified: currentDate,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
  )

  // Block category pages
  const blockCategoryRoutes: MetadataRoute.Sitemap = (
    BLOCKS_ENABLED ? BLOCK_CATEGORIES : []
  ).map((category: BlockCategory) => ({
    url: `${BASE_URL}/docs/blocks/${category.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Individual block pages
  const blockRoutes: MetadataRoute.Sitemap = (
    BLOCKS_ENABLED ? BLOCK_ITEMS : []
  ).map((block) => ({
    url: `${BASE_URL}/docs/blocks/${block.category}/${block.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const routes: MetadataRoute.Sitemap = [
    ...staticRoutes,
    ...catalogRoutes,
    ...itemRoutes,
    ...blockCategoryRoutes,
    ...blockRoutes,
  ]

  // Каждая страница отдаётся на двух языках: en без префикса, ru с /ru
  return routes.flatMap((route) => {
    const path = route.url.slice(BASE_URL.length)
    const languages = { en: route.url, ru: `${BASE_URL}/ru${path}` }
    return [
      { ...route, alternates: { languages } },
      { ...route, url: languages.ru, alternates: { languages } },
    ]
  })
}
