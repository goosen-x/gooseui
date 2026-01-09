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
import { createClient } from "@supabase/supabase-js"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { getPaddle, getPlanFromPriceId } from "@/lib/payments/paddle"

// Admin client for webhook operations (bypasses RLS)
function getAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

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
      // In sandbox mode, we might not have webhook secret configured
      // Continue processing but log warning
      console.warn(
        "Processing webhook without signature verification (sandbox mode)",
      )
    }

    const paddle = getPaddle()
    let event: EventEntity

    try {
      if (webhookSecret) {
        const result = paddle.webhooks.unmarshal(body, webhookSecret, signature)
        event = result instanceof Promise ? await result : result
      } else {
        // Sandbox mode - parse body directly
        event = JSON.parse(body) as EventEntity
      }
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    console.log("Paddle webhook event:", event.eventType)

    const supabase = getAdminSupabase()
    const eventData = event.data as unknown as Record<string, unknown>

    switch (event.eventType) {
      case "transaction.completed": {
        const customerId = eventData.customerId as string | undefined
        const customer = eventData.customer as { email?: string } | undefined
        const customerEmail = customer?.email
        const subscriptionId = eventData.subscriptionId as string | undefined
        const items = eventData.items as
          | Array<{ price?: { id?: string } }>
          | undefined
        const priceId = items?.[0]?.price?.id
        const plan = priceId ? getPlanFromPriceId(priceId) : "pro"

        console.log("Transaction completed:", {
          customerId,
          customerEmail,
          subscriptionId,
          plan,
        })

        if (customerEmail) {
          // Find user by email
          const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("email", customerEmail)
            .single()

          if (profile) {
            // Update or create subscription
            const { error: upsertError } = await supabase
              .from("subscriptions")
              .upsert(
                {
                  user_id: profile.id,
                  paddle_customer_id: customerId,
                  paddle_subscription_id: subscriptionId,
                  plan: plan || "pro",
                  status: "active",
                },
                { onConflict: "user_id" },
              )

            if (upsertError) {
              console.error("Failed to update subscription:", upsertError)
            } else {
              console.log("Subscription updated for user:", profile.id)
            }
          } else {
            console.log("User not found for email:", customerEmail)
            // Store pending purchase for later (when user signs up)
            // Could save to a pending_purchases table
          }
        }
        break
      }

      case "subscription.created": {
        const customerId = eventData.customerId as string | undefined
        const subscriptionId = eventData.id as string | undefined
        const status = eventData.status as string | undefined
        const items = eventData.items as
          | Array<{ price?: { id?: string } }>
          | undefined
        const priceId = items?.[0]?.price?.id
        const plan = priceId ? getPlanFromPriceId(priceId) : "pro"
        const currentPeriod = eventData.currentBillingPeriod as
          | {
              startsAt?: string
              endsAt?: string
            }
          | undefined

        console.log("Subscription created:", {
          subscriptionId,
          customerId,
          plan,
          status,
        })

        // Find subscription by paddle_customer_id and update
        if (customerId) {
          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({
              paddle_subscription_id: subscriptionId,
              plan: plan || "pro",
              status: status === "active" ? "active" : "trialing",
              current_period_start: currentPeriod?.startsAt,
              current_period_end: currentPeriod?.endsAt,
            })
            .eq("paddle_customer_id", customerId)

          if (updateError) {
            console.error("Failed to update subscription:", updateError)
          }
        }
        break
      }

      case "subscription.updated": {
        const subscriptionId = eventData.id as string | undefined
        const status = eventData.status as string | undefined
        const items = eventData.items as
          | Array<{ price?: { id?: string } }>
          | undefined
        const priceId = items?.[0]?.price?.id
        const plan = priceId ? getPlanFromPriceId(priceId) : undefined
        const currentPeriod = eventData.currentBillingPeriod as
          | {
              startsAt?: string
              endsAt?: string
            }
          | undefined
        const scheduledChange = eventData.scheduledChange as
          | {
              action?: string
            }
          | undefined

        console.log("Subscription updated:", {
          subscriptionId,
          plan,
          status,
        })

        if (subscriptionId) {
          const updateData: Record<string, unknown> = {
            status: mapPaddleStatus(status),
            current_period_start: currentPeriod?.startsAt,
            current_period_end: currentPeriod?.endsAt,
            cancel_at_period_end: scheduledChange?.action === "cancel",
          }

          if (plan) {
            updateData.plan = plan
          }

          const { error: updateError } = await supabase
            .from("subscriptions")
            .update(updateData)
            .eq("paddle_subscription_id", subscriptionId)

          if (updateError) {
            console.error("Failed to update subscription:", updateError)
          }
        }
        break
      }

      case "subscription.canceled": {
        const subscriptionId = eventData.id as string | undefined

        console.log("Subscription canceled:", { subscriptionId })

        if (subscriptionId) {
          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({
              status: "canceled",
              plan: "free",
            })
            .eq("paddle_subscription_id", subscriptionId)

          if (updateError) {
            console.error("Failed to update subscription:", updateError)
          }
        }
        break
      }

      case "subscription.paused": {
        const subscriptionId = eventData.id as string | undefined

        console.log("Subscription paused:", { subscriptionId })

        if (subscriptionId) {
          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({ status: "past_due" })
            .eq("paddle_subscription_id", subscriptionId)

          if (updateError) {
            console.error("Failed to update subscription:", updateError)
          }
        }
        break
      }

      case "subscription.resumed": {
        const subscriptionId = eventData.id as string | undefined

        console.log("Subscription resumed:", { subscriptionId })

        if (subscriptionId) {
          const { error: updateError } = await supabase
            .from("subscriptions")
            .update({ status: "active" })
            .eq("paddle_subscription_id", subscriptionId)

          if (updateError) {
            console.error("Failed to update subscription:", updateError)
          }
        }
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

/**
 * Map Paddle subscription status to our status
 */
function mapPaddleStatus(
  paddleStatus: string | undefined,
): "active" | "canceled" | "past_due" | "trialing" {
  switch (paddleStatus) {
    case "active":
      return "active"
    case "canceled":
      return "canceled"
    case "past_due":
      return "past_due"
    case "paused":
      return "past_due"
    case "trialing":
      return "trialing"
    default:
      return "active"
  }
}
