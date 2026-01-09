/**
 * Paddle Configuration
 */

import { type Environment, Paddle } from "@paddle/paddle-node-sdk"

// Lazy-loaded Paddle client (initialized on first use)
let paddleInstance: Paddle | null = null

export function getPaddle(): Paddle {
  if (!paddleInstance) {
    if (!process.env.PADDLE_API_KEY) {
      throw new Error("PADDLE_API_KEY is not set")
    }
    paddleInstance = new Paddle(process.env.PADDLE_API_KEY, {
      environment:
        (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environment) ||
        "sandbox",
    })
  }
  return paddleInstance
}

// Paddle price IDs from environment
export const PADDLE_PRICES = {
  pro: {
    monthly: process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID,
    yearly: process.env.NEXT_PUBLIC_PADDLE_PRO_YEARLY_PRICE_ID,
    lifetime: process.env.NEXT_PUBLIC_PADDLE_PRO_LIFETIME_PRICE_ID,
  },
  team: {
    monthly: process.env.NEXT_PUBLIC_PADDLE_TEAM_MONTHLY_PRICE_ID,
    yearly: process.env.NEXT_PUBLIC_PADDLE_TEAM_YEARLY_PRICE_ID,
  },
} as const

/**
 * Get Paddle price ID for a plan
 */
export function getPaddlePriceId(
  plan: "pro" | "team",
  interval: "monthly" | "yearly" | "lifetime",
): string | undefined {
  if (plan === "pro" && interval === "lifetime") {
    return PADDLE_PRICES.pro.lifetime
  }
  if (interval === "lifetime") {
    return undefined // Team doesn't have lifetime
  }
  return PADDLE_PRICES[plan]?.[interval as "monthly" | "yearly"]
}

/**
 * Map Paddle price ID to plan tier
 */
export function getPlanFromPriceId(priceId: string): "pro" | "team" | null {
  if (
    priceId === PADDLE_PRICES.pro.monthly ||
    priceId === PADDLE_PRICES.pro.yearly ||
    priceId === PADDLE_PRICES.pro.lifetime
  ) {
    return "pro"
  }
  if (
    priceId === PADDLE_PRICES.team.monthly ||
    priceId === PADDLE_PRICES.team.yearly
  ) {
    return "team"
  }
  return null
}

/**
 * Check if Paddle is configured
 */
export function isPaddleConfigured(): boolean {
  return !!(
    process.env.PADDLE_API_KEY && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
  )
}
