import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
import { BLOCKS_ENABLED } from "./lib/config/features"

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

// Pages moved from Components/Effects to Blocks.
// While the blocks section is off (production), send the old URLs to the
// catalog of the source section instead of a 404 page. Follows BLOCKS_ENABLED.
const movedToBlocks = (
  slug: string,
  block: string,
  category = "headers",
  from: "components" | "effects" = "components",
) => {
  const destination = (prefix: string) =>
    BLOCKS_ENABLED
      ? `${prefix}/docs/blocks/${category}/${block}`
      : `${prefix}/docs/${from}`
  return [
    {
      source: `/docs/${from}/${slug}`,
      destination: destination(""),
      permanent: true,
    },
    {
      source: `/ru/docs/${from}/${slug}`,
      destination: destination("/ru"),
      permanent: true,
    },
  ]
}

const nextConfig: NextConfig = {
  devIndicators: false,
  // DISABLED: cacheComponents causes CPU usage on static routes in Next.js 16
  // See: https://github.com/vercel/next.js/discussions/85931
  // cacheComponents: true,

  // Reduce CPU usage on build
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Optimize output
  output: "standalone",

  // Reduce response headers
  poweredByHeader: false,

  // Async Autocomplete was renamed to Searchbar
  // Thumbnail Gallery was merged into Carousel (CarouselThumbnails);
  // Install Prompt (PWA) became Notification Prompt
  async redirects() {
    return [
      {
        source: "/docs/experimental/anchor-tooltip",
        destination: "/docs/components/tooltip",
        permanent: true,
      },
      {
        source: "/ru/docs/experimental/anchor-tooltip",
        destination: "/ru/docs/components/tooltip",
        permanent: true,
      },
      {
        source: "/docs/experimental/corner-shape",
        destination: "/docs/components/card",
        permanent: true,
      },
      {
        source: "/ru/docs/experimental/corner-shape",
        destination: "/ru/docs/components/card",
        permanent: true,
      },
      {
        source: "/docs/experimental",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/ru/docs/experimental",
        destination: "/ru/docs/components",
        permanent: true,
      },
      {
        source: "/docs/components/async-autocomplete",
        destination: "/docs/components/searchbar",
        permanent: true,
      },
      {
        source: "/ru/docs/components/async-autocomplete",
        destination: "/ru/docs/components/searchbar",
        permanent: true,
      },
      {
        source: "/docs/components/install-prompt",
        destination: "/docs/components/notification-prompt",
        permanent: true,
      },
      {
        source: "/ru/docs/components/install-prompt",
        destination: "/ru/docs/components/notification-prompt",
        permanent: true,
      },
      {
        source: "/docs/hooks/use-pwa-install",
        destination: "/docs/hooks/use-notification-permission",
        permanent: true,
      },
      {
        source: "/ru/docs/hooks/use-pwa-install",
        destination: "/ru/docs/hooks/use-notification-permission",
        permanent: true,
      },
      {
        source: "/docs/components/thumbnail-gallery",
        destination: "/docs/components/carousel#thumbnails",
        permanent: true,
      },
      {
        source: "/ru/docs/components/thumbnail-gallery",
        destination: "/ru/docs/components/carousel#thumbnails",
        permanent: true,
      },
      // SVG Drawable was removed
      {
        source: "/docs/components/svg-drawable",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/ru/docs/components/svg-drawable",
        destination: "/ru/docs/components",
        permanent: true,
      },
      // Moon Phase was removed
      {
        source: "/docs/components/moon-phase",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/ru/docs/components/moon-phase",
        destination: "/ru/docs/components",
        permanent: true,
      },
      // Orbit was removed
      {
        source: "/docs/components/orbit",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/ru/docs/components/orbit",
        destination: "/ru/docs/components",
        permanent: true,
      },
      // Prize Wheel was removed
      {
        source: "/docs/components/prize-wheel",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/ru/docs/components/prize-wheel",
        destination: "/ru/docs/components",
        permanent: true,
      },
      // Typing Test was removed
      {
        source: "/docs/components/typing-test",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/ru/docs/components/typing-test",
        destination: "/ru/docs/components",
        permanent: true,
      },
      // Parallax Cards was removed
      {
        source: "/docs/effects/parallax-cards",
        destination: "/docs/effects",
        permanent: true,
      },
      {
        source: "/ru/docs/effects/parallax-cards",
        destination: "/ru/docs/effects",
        permanent: true,
      },
      // Card Pattern was removed
      {
        source: "/docs/effects/card-pattern",
        destination: "/docs/effects",
        permanent: true,
      },
      {
        source: "/ru/docs/effects/card-pattern",
        destination: "/ru/docs/effects",
        permanent: true,
      },
      // useKeySequence was removed
      {
        source: "/docs/hooks/use-key-sequence",
        destination: "/docs/hooks",
        permanent: true,
      },
      {
        source: "/ru/docs/hooks/use-key-sequence",
        destination: "/ru/docs/hooks",
        permanent: true,
      },
      // Variant Switcher was removed
      {
        source: "/docs/components/variant-switcher",
        destination: "/docs/components",
        permanent: true,
      },
      {
        source: "/ru/docs/components/variant-switcher",
        destination: "/ru/docs/components",
        permanent: true,
      },
      // Section Dock was replaced by ScrollSpy
      {
        source: "/docs/components/section-dock",
        destination: "/docs/components/scroll-spy",
        permanent: true,
      },
      {
        source: "/ru/docs/components/section-dock",
        destination: "/ru/docs/components/scroll-spy",
        permanent: true,
      },
      // Native Toast became the Toast
      {
        source: "/docs/components/native-toast",
        destination: "/docs/components/toast",
        permanent: true,
      },
      {
        source: "/ru/docs/components/native-toast",
        destination: "/ru/docs/components/toast",
        permanent: true,
      },
      ...movedToBlocks("mega-menu", "header-mega-menu"),
      ...movedToBlocks("morphing-header", "header-morphing"),
      ...movedToBlocks("tap-coin", "tap-coin", "web3", "effects"),
    ]
  },

  experimental: {
    // Reduce build time
    optimizePackageImports: ["lucide-react"],
  },
}

export default withNextIntl(nextConfig)
