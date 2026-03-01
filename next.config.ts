import type { NextConfig } from "next"

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

  experimental: {
    // Reduce build time
    optimizePackageImports: ["lucide-react"],
  },
}

export default nextConfig
