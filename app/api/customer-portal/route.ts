/**
 * Customer Portal API
 *
 * POST /api/customer-portal - Generate Paddle Customer Portal URL
 */

import { NextResponse } from "next/server"
import { getPaddle, isPaddleConfigured } from "@/lib/payments/paddle"
import { createServerSupabase, getUser } from "@/lib/supabase/server"

export async function POST() {
  try {
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's subscription
    const supabase = await createServerSupabase()
    const { data: subscription } = await supabase
      .from("subscriptions")
      .select("paddle_customer_id, paddle_subscription_id")
      .eq("user_id", user.id)
      .single()

    if (!subscription?.paddle_customer_id) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 },
      )
    }

    // Demo mode
    if (!isPaddleConfigured()) {
      return NextResponse.json({
        demo: true,
        message: "Customer portal not available in demo mode",
      })
    }

    const paddle = getPaddle()

    // Create customer portal session
    // SDK v3.5+ uses positional arguments: (customerId, subscriptionIds)
    const portalSession = await paddle.customerPortalSessions.create(
      subscription.paddle_customer_id,
      subscription.paddle_subscription_id
        ? [subscription.paddle_subscription_id]
        : [],
    )

    return NextResponse.json({
      url: portalSession?.urls?.general?.overview,
    })
  } catch (error) {
    console.error("Customer portal error:", error)
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 },
    )
  }
}
