"use client"

/**
 * Paddle Checkout Component
 * Opens Paddle overlay checkout for subscription purchases
 */

import { initializePaddle, type Paddle } from "@paddle/paddle-js"
import { useCallback, useEffect, useState } from "react"

interface PaddleCheckoutProps {
  priceId: string
  userEmail?: string
  userId?: string
  onSuccess?: () => void
  onClose?: () => void
}

// Singleton Paddle instance
let paddleInstance: Paddle | null = null

export function usePaddle() {
  const [paddle, setPaddle] = useState<Paddle | null>(paddleInstance)
  const [isReady, setIsReady] = useState(!!paddleInstance)

  useEffect(() => {
    if (paddleInstance) {
      setPaddle(paddleInstance)
      setIsReady(true)
      return
    }

    const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
    if (!clientToken) {
      console.warn("Paddle client token not configured")
      return
    }

    initializePaddle({
      environment:
        (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as
          | "sandbox"
          | "production") || "sandbox",
      token: clientToken,
    }).then((instance) => {
      if (instance) {
        paddleInstance = instance
        setPaddle(instance)
        setIsReady(true)
      }
    })
  }, [])

  const openCheckout = useCallback(
    ({
      priceId,
      userEmail,
      userId,
      onSuccess,
      onClose,
    }: PaddleCheckoutProps) => {
      if (!paddle) {
        console.error("Paddle not initialized")
        return
      }

      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: userEmail ? { email: userEmail } : undefined,
        customData: userId ? { userId } : undefined,
        settings: {
          displayMode: "overlay",
          theme: "light",
          locale: "en",
          allowLogout: !userEmail,
        },
      })

      // Set up event listeners
      const _handleEvent = (event: { name: string }) => {
        if (event.name === "checkout.completed") {
          onSuccess?.()
        }
        if (event.name === "checkout.closed") {
          onClose?.()
        }
      }

      // Note: Paddle event callback is set during initialization
      // For dynamic callbacks, we'd need to reinitialize or use a different approach
    },
    [paddle],
  )

  return { paddle, isReady, openCheckout }
}

/**
 * Initialize Paddle with event callbacks
 */
export async function initPaddleWithCallbacks({
  onSuccess,
  onClose,
}: {
  onSuccess?: () => void
  onClose?: () => void
}): Promise<Paddle | null> {
  const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
  if (!clientToken) {
    console.warn("Paddle client token not configured")
    return null
  }

  const instance = await initializePaddle({
    environment:
      (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as
        | "sandbox"
        | "production") || "sandbox",
    token: clientToken,
    eventCallback: (event) => {
      if (event.name === "checkout.completed") {
        onSuccess?.()
      }
      if (event.name === "checkout.closed") {
        onClose?.()
      }
    },
  })

  return instance || null
}

/**
 * Check if Paddle is configured
 */
export function isPaddleConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
}
