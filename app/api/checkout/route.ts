/**
 * Checkout API
 *
 * POST /api/checkout - Create Paddle transaction and return checkout URL
 *
 * Uses Paddle API to create a transaction server-side,
 * then returns the checkout URL for redirect.
 */

import { NextResponse } from "next/server"
import {
  getPaddle,
  getPaddlePriceId,
  isPaddleConfigured,
} from "@/lib/payments/paddle"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { plan, interval = "monthly", email } = body

    if (!plan || !["pro", "team"].includes(plan)) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    if (!["monthly", "yearly", "lifetime"].includes(interval)) {
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
      interval as "monthly" | "yearly" | "lifetime",
    )

    if (!priceId) {
      return NextResponse.json(
        { error: "Price not configured" },
        { status: 500 },
      )
    }

    try {
      // Create transaction via Paddle API
      const paddle = getPaddle()
      const transaction = await paddle.transactions.create({
        items: [{ priceId, quantity: 1 }],
        ...(email && { customer: { email } }),
        checkout: {
          url: `${origin}/account?success=true`, // Redirect here after successful payment
        },
      })

      // Return checkout URL for redirect
      if (transaction.checkout?.url) {
        return NextResponse.json({
          checkoutUrl: transaction.checkout.url,
          transactionId: transaction.id,
        })
      }

      // Fallback to priceId for overlay (shouldn't happen)
      return NextResponse.json({
        priceId,
        plan,
        interval,
      })
    } catch (paddleError) {
      console.error("Paddle API error:", paddleError)
      // Fallback to returning priceId for client-side checkout
      return NextResponse.json({
        priceId,
        plan,
        interval,
        warning: "Server-side transaction failed, using client checkout",
      })
    }
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 },
    )
  }
}
