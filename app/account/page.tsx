"use client"

/**
 * Account Page
 *
 * User account management and subscription details
 */

import {
  CreditCard,
  Loader2,
  LogOut,
  RefreshCw,
  Settings,
  Sparkles,
  User,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSubscription, useUser } from "@/hooks/use-subscription"
import { formatPrice, plans } from "@/lib/payments/plans"

export default function AccountPage() {
  const router = useRouter()
  const { user, isLoading: userLoading, signOut } = useUser()
  const {
    subscription,
    plan,
    isLoading: subLoading,
    refresh,
  } = useSubscription()
  const [portalLoading, setPortalLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const currentPlan = plans[plan]
  const isFreePlan = plan === "free"

  const handleManageSubscription = async () => {
    setPortalLoading(true)
    try {
      const response = await fetch("/api/customer-portal", {
        method: "POST",
      })
      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else if (data.demo) {
        alert("Customer portal not available in demo mode")
      } else {
        alert(data.error || "Failed to open customer portal")
      }
    } catch (error) {
      console.error("Portal error:", error)
      alert("Failed to open customer portal")
    } finally {
      setPortalLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  if (userLoading || subLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="container max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Account</h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Manage your account settings and subscription
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="break-all font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="break-all font-mono text-xs sm:text-sm">
                {user?.id}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription
                </CardTitle>
                <CardDescription>
                  Your current plan and billing information
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 cursor-pointer"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold">{currentPlan.name}</h3>
                  <Badge variant={isFreePlan ? "secondary" : "default"}>
                    {subscription?.status || "active"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentPlan.description}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-2xl font-bold">
                  {formatPrice(currentPlan.price)}
                </p>
              </div>
            </div>

            {!isFreePlan && (
              <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                {subscription?.current_period_end && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {subscription.cancel_at_period_end
                        ? "Your subscription will end on"
                        : "Next billing date"}
                    </p>
                    <p className="font-medium">
                      {new Date(
                        subscription.current_period_end,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                )}
                {subscription?.paddle_subscription_id && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Subscription ID
                    </p>
                    <p className="break-all font-mono text-xs">
                      {subscription.paddle_subscription_id}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              {isFreePlan ? (
                <Button
                  className="cursor-pointer"
                  onClick={() => router.push("/generate")}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleManageSubscription}
                  disabled={portalLoading}
                >
                  {portalLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Opening portal...
                    </>
                  ) : (
                    <>
                      <Settings className="mr-2 h-4 w-4" />
                      Manage Subscription
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Plan Features Card */}
        <Card>
          <CardHeader>
            <CardTitle>Plan Features</CardTitle>
            <CardDescription>
              What&apos;s included in your {currentPlan.name} plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              <FeatureItem
                label="Projects"
                value={
                  currentPlan.limits.projects === -1
                    ? "Unlimited"
                    : currentPlan.limits.projects.toString()
                }
              />
              <FeatureItem
                label="Exports per month"
                value={
                  currentPlan.limits.exportsPerMonth === -1
                    ? "Unlimited"
                    : currentPlan.limits.exportsPerMonth.toString()
                }
              />
              <FeatureItem
                label="HTML Export"
                value={currentPlan.features.htmlExport ? "Yes" : "No"}
              />
              <FeatureItem
                label="React Export"
                value={currentPlan.features.reactExport ? "Yes" : "No"}
              />
              <FeatureItem
                label="Registry Export"
                value={currentPlan.features.registryExport ? "Yes" : "No"}
              />
              <FeatureItem
                label="Remove Watermark"
                value={currentPlan.features.removeWatermark ? "Yes" : "No"}
              />
              <FeatureItem
                label="Custom Domain"
                value={currentPlan.features.customDomain ? "Yes" : "No"}
              />
              <FeatureItem
                label="Priority Support"
                value={currentPlan.features.prioritySupport ? "Yes" : "No"}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Card>
          <CardContent className="pt-6">
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FeatureItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-md bg-muted/30 px-3 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
