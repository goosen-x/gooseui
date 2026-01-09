"use client"

/**
 * Feature Access Hook
 *
 * Provides feature gating based on user subscription plan.
 * For now uses a mock implementation - replace with actual user data from Supabase/Auth.
 */

import { useMemo } from "react"
import { type PlanTier, plans, hasFeature } from "@/lib/payments/plans"

// Mock user state - replace with actual auth state
// This would typically come from a context provider with Supabase auth
interface UserSubscription {
  plan: PlanTier
  exportsThisMonth: number
  projectCount: number
}

// Mock hook for user subscription - replace with actual implementation
function useUserSubscription(): UserSubscription | null {
  // TODO: Replace with actual Supabase auth/subscription data
  // For now, return a mock free user
  return {
    plan: "free",
    exportsThisMonth: 0,
    projectCount: 1,
  }
}

export interface FeatureAccess {
  // Current plan
  plan: PlanTier
  planName: string

  // Export features
  canExportHTML: boolean
  canExportReact: boolean
  canExportRegistry: boolean
  canRemoveWatermark: boolean

  // Other features
  canUseCustomDomain: boolean
  canViewAnalytics: boolean
  hasPrioritySupport: boolean
  hasApiAccess: boolean
  canWhiteLabel: boolean

  // Limits
  projectLimit: number // -1 for unlimited
  exportLimit: number // -1 for unlimited
  remainingProjects: number // -1 for unlimited
  remainingExports: number // -1 for unlimited

  // Status checks
  isFreePlan: boolean
  isPaidPlan: boolean
  isProjectLimitReached: boolean
  isExportLimitReached: boolean

  // Actions
  shouldShowUpgrade: (feature: string) => boolean
}

/**
 * Hook to access feature gating based on user subscription
 */
export function useFeatureAccess(): FeatureAccess {
  const subscription = useUserSubscription()

  return useMemo(() => {
    const plan = subscription?.plan ?? "free"
    const currentPlan = plans[plan]
    const exportsThisMonth = subscription?.exportsThisMonth ?? 0
    const projectCount = subscription?.projectCount ?? 0

    const projectLimit = currentPlan.limits.projects
    const exportLimit = currentPlan.limits.exportsPerMonth

    const remainingProjects =
      projectLimit === -1 ? -1 : Math.max(0, projectLimit - projectCount)
    const remainingExports =
      exportLimit === -1 ? -1 : Math.max(0, exportLimit - exportsThisMonth)

    return {
      // Current plan
      plan,
      planName: currentPlan.name,

      // Export features
      canExportHTML: hasFeature(plan, "htmlExport"),
      canExportReact: hasFeature(plan, "reactExport"),
      canExportRegistry: hasFeature(plan, "registryExport"),
      canRemoveWatermark: hasFeature(plan, "removeWatermark"),

      // Other features
      canUseCustomDomain: hasFeature(plan, "customDomain"),
      canViewAnalytics: hasFeature(plan, "analytics"),
      hasPrioritySupport: hasFeature(plan, "prioritySupport"),
      hasApiAccess: hasFeature(plan, "apiAccess"),
      canWhiteLabel: hasFeature(plan, "whiteLabel"),

      // Limits
      projectLimit,
      exportLimit,
      remainingProjects,
      remainingExports,

      // Status checks
      isFreePlan: plan === "free",
      isPaidPlan: plan !== "free",
      isProjectLimitReached: remainingProjects === 0,
      isExportLimitReached: remainingExports === 0,

      // Actions
      shouldShowUpgrade: (feature: string) => {
        switch (feature) {
          case "react":
            return !hasFeature(plan, "reactExport")
          case "registry":
            return !hasFeature(plan, "registryExport")
          case "watermark":
            return !hasFeature(plan, "removeWatermark")
          case "domain":
            return !hasFeature(plan, "customDomain")
          case "analytics":
            return !hasFeature(plan, "analytics")
          case "api":
            return !hasFeature(plan, "apiAccess")
          default:
            return plan === "free"
        }
      },
    }
  }, [subscription])
}

/**
 * Standalone function to check feature access without hook
 * Useful for server-side checks
 */
export function checkFeatureAccess(
  plan: PlanTier,
  feature: keyof typeof plans.free.features
): boolean {
  return hasFeature(plan, feature)
}
