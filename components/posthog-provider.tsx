"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init("phc_dLUVA0HjR87bVBIES1ybm5AxevxV0UriQ5pgv8upGTO", {
      api_host: "https://eu.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false, // We'll capture manually for SPA
      capture_pageleave: true,
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
