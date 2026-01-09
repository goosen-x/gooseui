/**
 * Pricing Plans Configuration
 */

export type PlanTier = "free" | "pro" | "team" | "enterprise"

export interface PlanLimits {
  projects: number // -1 for unlimited
  exportsPerMonth: number // -1 for unlimited
  teamMembers: number // -1 for unlimited
}

export interface PlanFeatures {
  htmlExport: boolean
  reactExport: boolean
  registryExport: boolean
  removeWatermark: boolean
  customDomain: boolean
  analytics: boolean
  prioritySupport: boolean
  apiAccess: boolean
  whiteLabel: boolean
}

export interface Plan {
  id: PlanTier
  name: string
  description: string
  price: number // in cents, 0 for free
  priceYearly?: number // yearly price in cents (with discount)
  paddlePriceId?: string // Paddle price ID for monthly
  paddlePriceIdYearly?: string // Paddle price ID for yearly
  limits: PlanLimits
  features: PlanFeatures
  popular?: boolean
}

export const plans: Record<PlanTier, Plan> = {
  free: {
    id: "free",
    name: "Free",
    description: "Perfect for trying out the generator",
    price: 0,
    limits: {
      projects: 3,
      exportsPerMonth: 5,
      teamMembers: 1,
    },
    features: {
      htmlExport: true,
      reactExport: false,
      registryExport: false,
      removeWatermark: false,
      customDomain: false,
      analytics: false,
      prioritySupport: false,
      apiAccess: false,
      whiteLabel: false,
    },
  },

  pro: {
    id: "pro",
    name: "Pro",
    description: "For professional developers and freelancers",
    price: 2900, // $29/month
    priceYearly: 24900, // $249/year (~$20.75/month)
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID,
    paddlePriceIdYearly: process.env.NEXT_PUBLIC_PADDLE_PRO_YEARLY_PRICE_ID,
    limits: {
      projects: -1,
      exportsPerMonth: -1,
      teamMembers: 1,
    },
    features: {
      htmlExport: true,
      reactExport: true,
      registryExport: true,
      removeWatermark: true,
      customDomain: true,
      analytics: false,
      prioritySupport: true,
      apiAccess: false,
      whiteLabel: false,
    },
    popular: true,
  },

  team: {
    id: "team",
    name: "Team",
    description: "For teams building multiple projects",
    price: 7900, // $79/month
    priceYearly: 69900, // $699/year (~$58.25/month)
    paddlePriceId: process.env.NEXT_PUBLIC_PADDLE_TEAM_MONTHLY_PRICE_ID,
    paddlePriceIdYearly: process.env.NEXT_PUBLIC_PADDLE_TEAM_YEARLY_PRICE_ID,
    limits: {
      projects: -1,
      exportsPerMonth: -1,
      teamMembers: 5,
    },
    features: {
      htmlExport: true,
      reactExport: true,
      registryExport: true,
      removeWatermark: true,
      customDomain: true,
      analytics: true,
      prioritySupport: true,
      apiAccess: true,
      whiteLabel: false,
    },
  },

  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: -1, // Contact sales
    limits: {
      projects: -1,
      exportsPerMonth: -1,
      teamMembers: -1,
    },
    features: {
      htmlExport: true,
      reactExport: true,
      registryExport: true,
      removeWatermark: true,
      customDomain: true,
      analytics: true,
      prioritySupport: true,
      apiAccess: true,
      whiteLabel: true,
    },
  },
}

/**
 * Get plan by tier
 */
export function getPlan(tier: PlanTier): Plan {
  return plans[tier]
}

/**
 * Get all available plans for display
 */
export function getDisplayPlans(): Plan[] {
  return [plans.free, plans.pro, plans.team, plans.enterprise]
}

/**
 * Format price for display
 */
export function formatPrice(cents: number, yearly = false): string {
  if (cents === 0) return "Free"
  if (cents === -1) return "Contact us"

  const dollars = cents / 100

  if (yearly) {
    return `$${dollars}/year`
  }

  return `$${dollars}/month`
}

/**
 * Check if a feature is available for a plan
 */
export function hasFeature(
  tier: PlanTier,
  feature: keyof PlanFeatures
): boolean {
  return plans[tier]?.features[feature] ?? false
}

/**
 * Check if user has reached project limit
 */
export function isProjectLimitReached(
  tier: PlanTier,
  currentProjects: number
): boolean {
  const limit = plans[tier]?.limits.projects ?? 0
  if (limit === -1) return false
  return currentProjects >= limit
}

/**
 * Check if user has reached export limit
 */
export function isExportLimitReached(
  tier: PlanTier,
  currentExports: number
): boolean {
  const limit = plans[tier]?.limits.exportsPerMonth ?? 0
  if (limit === -1) return false
  return currentExports >= limit
}
