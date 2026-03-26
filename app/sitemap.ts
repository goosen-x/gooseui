import type { MetadataRoute } from "next"
import {
  BLOCK_CATEGORIES,
  type BlockCategory,
} from "@/lib/config/blocks-categories"
import { BLOCK_ITEMS } from "@/lib/config/blocks-registry"
import {
  docsNavigation,
  getAvailableComponents,
  type NavItem,
  type NavSection,
} from "@/lib/config/docs-navigation"

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
    {
      url: `${BASE_URL}/docs/blocks`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/docs/experimental`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ]

  // Component pages from navigation
  const components = getAvailableComponents()
  const componentRoutes: MetadataRoute.Sitemap = components.map(
    (component) => ({
      url: `${BASE_URL}${component.href}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  )

  // Block category pages
  const blockCategoryRoutes: MetadataRoute.Sitemap = BLOCK_CATEGORIES.map(
    (category: BlockCategory) => ({
      url: `${BASE_URL}/docs/blocks/${category.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  )

  // Individual block pages
  const blockRoutes: MetadataRoute.Sitemap = BLOCK_ITEMS.map((block) => ({
    url: `${BASE_URL}/docs/blocks/${block.category}/${block.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Experimental pages from navigation
  const experimentalSection = docsNavigation.find(
    (section: NavSection) => section.slug === "experimental",
  )
  const experimentalRoutes: MetadataRoute.Sitemap =
    experimentalSection?.items.map((item: NavItem) => ({
      url: `${BASE_URL}${item.href}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })) || []

  return [
    ...staticRoutes,
    ...componentRoutes,
    ...blockCategoryRoutes,
    ...blockRoutes,
    ...experimentalRoutes,
  ]
}
