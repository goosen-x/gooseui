import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: false,
  cacheComponents: true,
  // Reduce CPU usage on build
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Optimize output
  output: "standalone",
  experimental: {
    // Reduce build time
    optimizePackageImports: ["lucide-react"],
  },
}

export default nextConfig
