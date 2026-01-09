"use client"

/**
 * Subscription Hook
 *
 * Provides subscription data and feature access checks
 */

import { useEffect, useState } from "react"
import { getSupabase } from "@/lib/supabase/client"
import { hasFeature, type PlanTier, type PlanFeatures } from "@/lib/payments/plans"
import type { Subscription } from "@/lib/supabase/types"

interface UseSubscriptionReturn {
  subscription: Subscription | null
  plan: PlanTier
  isLoading: boolean
  error: Error | null
  // Feature checks
  canExportHtml: boolean
  canExportReact: boolean
  canExportRegistry: boolean
  canRemoveWatermark: boolean
  canUseCustomDomain: boolean
  hasFeature: (feature: keyof PlanFeatures) => boolean
  // Refresh
  refresh: () => Promise<void>
}

export function useSubscription(): UseSubscriptionReturn {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchSubscription = async () => {
    try {
      const supabase = getSupabase()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setSubscription(null)
        setIsLoading(false)
        return
      }

      const { data, error: subError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (subError && subError.code !== "PGRST116") {
        throw subError
      }

      setSubscription(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch subscription"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscription()

    // Listen for auth changes
    const supabase = getSupabase()
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          fetchSubscription()
        } else {
          setSubscription(null)
        }
      }
    )

    return () => {
      authSubscription.unsubscribe()
    }
  }, [])

  const plan: PlanTier = (subscription?.plan as PlanTier) || "free"

  const checkFeature = (feature: keyof PlanFeatures): boolean => {
    return hasFeature(plan, feature)
  }

  return {
    subscription,
    plan,
    isLoading,
    error,
    canExportHtml: checkFeature("htmlExport"),
    canExportReact: checkFeature("reactExport"),
    canExportRegistry: checkFeature("registryExport"),
    canRemoveWatermark: checkFeature("removeWatermark"),
    canUseCustomDomain: checkFeature("customDomain"),
    hasFeature: checkFeature,
    refresh: fetchSubscription,
  }
}

/**
 * Hook to get current user
 */
export function useUser() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabase()

    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ? { id: user.id, email: user.email } : null)
      setIsLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ? { id: session.user.id, email: session.user.email } : null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const supabase = getSupabase()
    await supabase.auth.signOut()
  }

  return { user, isLoading, signOut }
}
