/**
 * Paddle Webhook Handler
 *
 * POST /api/webhooks/paddle - Handle Paddle webhook events
 *
 * Handles:
 * - transaction.completed
 * - subscription.created
 * - subscription.updated
 * - subscription.canceled
 * - subscription.paused
 * - subscription.resumed
 */

import type { EventEntity } from "@paddle/paddle-node-sdk"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { getPaddle, getPlanFromPriceId } from "@/lib/payments/paddle"

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("paddle-signature")

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 400 })
    }

    const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error("PADDLE_WEBHOOK_SECRET not configured")
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 },
      )
    }

    const paddle = getPaddle()

    let event: EventEntity
    try {
      // unmarshal returns a Promise in newer SDK versions
      const result = paddle.webhooks.unmarshal(body, webhookSecret, signature)
      event = result instanceof Promise ? await result : result
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("Paddle webhook event:", event.eventType)

    // Type guard for data access
    const eventData = event.data as unknown as Record<string, unknown>

    switch (event.eventType) {
      case "transaction.completed": {
        const customData = (eventData.customData as { userId?: string }) || {}
        const userId = customData.userId
        const customer = eventData.customer as { email?: string } | undefined
        const customerEmail = customer?.email

        console.log("Transaction completed:", {
          transactionId: eventData.id,
          userId,
          customerEmail,
        })

        // Here you would:
        // 1. Create user account if not exists
        // 2. Update subscription status in database
        // 3. Send welcome email
        break
      }

      case "subscription.created": {
        const customData = (eventData.customData as { userId?: string }) || {}
        const userId = customData.userId
        const items = eventData.items as
          | Array<{ price?: { id?: string } }>
          | undefined
        const priceId = items?.[0]?.price?.id
        const plan = priceId ? getPlanFromPriceId(priceId) : "pro"

        console.log("Subscription created:", {
          subscriptionId: eventData.id,
          userId,
          plan,
          status: eventData.status,
        })

        // Update database with subscription info
        break
      }

      case "subscription.updated": {
        const items = eventData.items as
          | Array<{ price?: { id?: string } }>
          | undefined
        const priceId = items?.[0]?.price?.id
        const plan = priceId ? getPlanFromPriceId(priceId) : "pro"

        console.log("Subscription updated:", {
          subscriptionId: eventData.id,
          plan,
          status: eventData.status,
        })
        break
      }

      case "subscription.canceled": {
        console.log("Subscription canceled:", {
          subscriptionId: eventData.id,
          status: eventData.status,
        })
        break
      }

      case "subscription.paused": {
        console.log("Subscription paused:", {
          subscriptionId: eventData.id,
        })
        break
      }

      case "subscription.resumed": {
        console.log("Subscription resumed:", {
          subscriptionId: eventData.id,
        })
        break
      }

      default:
        console.log(`Unhandled event type: ${event.eventType}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    )
  }
}
