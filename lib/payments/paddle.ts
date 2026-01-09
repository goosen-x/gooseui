/**
 * Paddle Configuration
 */

import { Paddle, Environment } from "@paddle/paddle-node-sdk"

// Lazy-loaded Paddle client (initialized on first use)
let paddleInstance: Paddle | null = null

export function getPaddle(): Paddle {
  if (!paddleInstance) {
    if (!process.env.PADDLE_API_KEY) {
      throw new Error("PADDLE_API_KEY is not set")
    }
    paddleInstance = new Paddle(process.env.PADDLE_API_KEY, {
      environment: (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as Environment) || "sandbox",
    })
  }
  return paddleInstance
}

// Paddle price IDs from environment
export const PADDLE_PRICES = {
  pro: {
    monthly: process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID,
    yearly: process.env.NEXT_PUBLIC_PADDLE_PRO_YEARLY_PRICE_ID,
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
  interval: "monthly" | "yearly"
): string | undefined {
  return PADDLE_PRICES[plan]?.[interval]
}

/**
 * Map Paddle price ID to plan tier
 */
export function getPlanFromPriceId(priceId: string): "pro" | "team" | null {
  if (
    priceId === PADDLE_PRICES.pro.monthly ||
    priceId === PADDLE_PRICES.pro.yearly
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
    process.env.PADDLE_API_KEY &&
    process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
  )
}
