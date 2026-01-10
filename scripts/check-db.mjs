/**
 * Script to check Supabase database for subscriptions
 * Run: node scripts/check-db.mjs
 */

import { createClient } from "@supabase/supabase-js"
import { readFileSync } from "fs"
import { resolve } from "path"

// Load env vars from .env.local
const envPath = resolve(process.cwd(), ".env.local")
const envContent = readFileSync(envPath, "utf-8")
const envVars = {}
envContent.split("\n").forEach((line) => {
  const match = line.match(/^([^#=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = envVars.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables")
  console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "set" : "missing")
  console.log("SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "set" : "missing")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function checkDatabase() {
  console.log("\n=== SUPABASE DATABASE CHECK ===\n")

  // 1. Check all subscriptions
  console.log("📋 SUBSCRIPTIONS TABLE:")
  const { data: subscriptions, error: subError } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  if (subError) {
    console.error("Error fetching subscriptions:", subError.message)
  } else if (subscriptions?.length === 0) {
    console.log("  No subscriptions found")
  } else {
    subscriptions?.forEach((sub, i) => {
      console.log(`\n  [${i + 1}] User ID: ${sub.user_id}`)
      console.log(`      Plan: ${sub.plan}`)
      console.log(`      Status: ${sub.status}`)
      console.log(`      Paddle Customer ID: ${sub.paddle_customer_id || "null"}`)
      console.log(`      Paddle Subscription ID: ${sub.paddle_subscription_id || "null"}`)
      console.log(`      Created: ${sub.created_at}`)
    })
  }

  // 2. Check all profiles
  console.log("\n\n👤 PROFILES TABLE:")
  const { data: profiles, error: profError } = await supabase
    .from("profiles")
    .select("id, email, full_name, created_at")
    .order("created_at", { ascending: false })
    .limit(10)

  if (profError) {
    console.error("Error fetching profiles:", profError.message)
  } else if (profiles?.length === 0) {
    console.log("  No profiles found")
  } else {
    profiles?.forEach((profile, i) => {
      console.log(`\n  [${i + 1}] ID: ${profile.id}`)
      console.log(`      Email: ${profile.email || "null"}`)
      console.log(`      Name: ${profile.full_name || "null"}`)
      console.log(`      Created: ${profile.created_at}`)
    })
  }

  // 3. Check auth.users (if accessible)
  console.log("\n\n🔐 AUTH USERS (via admin API):")
  const { data: authData, error: authError } = await supabase.auth.admin.listUsers()

  if (authError) {
    console.error("Error fetching auth users:", authError.message)
  } else if (authData?.users?.length === 0) {
    console.log("  No auth users found")
  } else {
    authData?.users?.slice(0, 10).forEach((user, i) => {
      console.log(`\n  [${i + 1}] ID: ${user.id}`)
      console.log(`      Email: ${user.email}`)
      console.log(`      Created: ${user.created_at}`)
    })
  }

  // 4. Summary
  console.log("\n\n📊 SUMMARY:")
  console.log(`  Total subscriptions: ${subscriptions?.length || 0}`)
  console.log(`  Total profiles: ${profiles?.length || 0}`)
  console.log(`  Total auth users: ${authData?.users?.length || 0}`)

  // 5. Check for mismatches
  console.log("\n\n⚠️ POTENTIAL ISSUES:")

  // Profiles without email
  const profilesWithoutEmail = profiles?.filter(p => !p.email) || []
  if (profilesWithoutEmail.length > 0) {
    console.log(`  - ${profilesWithoutEmail.length} profile(s) without email (webhook lookup will fail)`)
  }

  // Subscriptions still on free
  const freeSubscriptions = subscriptions?.filter(s => s.plan === "free") || []
  if (freeSubscriptions.length > 0) {
    console.log(`  - ${freeSubscriptions.length} subscription(s) still on 'free' plan`)
  }

  // Subscriptions without paddle_customer_id
  const subsWithoutPaddle = subscriptions?.filter(s => !s.paddle_customer_id) || []
  if (subsWithoutPaddle.length > 0) {
    console.log(`  - ${subsWithoutPaddle.length} subscription(s) without Paddle customer ID`)
  }

  console.log("\n=== END OF CHECK ===\n")
}

checkDatabase().catch(console.error)
