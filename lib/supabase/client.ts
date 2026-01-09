/**
 * Supabase Client
 *
 * Browser-side Supabase client for the GooseUI Generator
 */

import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

// Export singleton for client-side use
let clientInstance: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (!clientInstance) {
    clientInstance = createClient()
  }
  return clientInstance
}
