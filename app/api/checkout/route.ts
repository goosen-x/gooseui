/**
 * Checkout API
 *
 * POST /api/checkout - Get Paddle price ID for checkout
 *
 * Note: Paddle checkout happens client-side via Paddle.js overlay.
 * This endpoint returns the price ID to open the checkout.
 */

import { NextResponse } from "next/server"
import { getPaddlePriceId, isPaddleConfigured } from "@/lib/payments/paddle"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { plan, interval = "monthly" } = body

    if (!plan || !["pro", "team"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    if (!["monthly", "yearly"].includes(interval)) {
      return NextResponse.json({ error: "Invalid interval" }, { status: 400 })
    }

    const origin = request.headers.get("origin") || "http://localhost:3000"

    // Demo mode - Paddle not configured
    if (!isPaddleConfigured()) {
      return NextResponse.json({
        demo: true,
        redirectUrl: `${origin}/generate?demo=true&plan=${plan}`,
      })
    }

    // Get Paddle price ID
    const priceId = getPaddlePriceId(
      plan as "pro" | "team",
      interval as "monthly" | "yearly"
    )

    if (!priceId) {
      return NextResponse.json(
        { error: "Price not configured" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      priceId,
      plan,
      interval,
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    )
  }
}
