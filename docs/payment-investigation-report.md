# Payment Integration Investigation Report

**Date**: 2026-01-10
**Issue**: Account page shows "Free" plan after successful Paddle test payment

---

## Executive Summary

After investigating the payment flow, I identified **two potential root causes** why the subscription isn't updated after payment:

1. **Webhook configuration** - Paddle webhooks may not be configured to hit the correct endpoint
2. **Email matching logic** - The webhook relies on matching customer email with `profiles` table, which may fail if profile doesn't have email stored

---

## Payment Flow Analysis

### Current Architecture

```
User clicks "Upgrade"
       │
       ▼
/api/checkout (creates Paddle transaction)
       │
       ▼
Paddle Checkout (overlay or redirect)
       │
       ▼
User completes payment
       │
       ▼
Paddle sends webhook to /api/webhooks/paddle  ← ❌ POTENTIAL FAILURE POINT
       │
       ▼
Webhook updates `subscriptions` table
       │
       ▼
Account page reads from `subscriptions` table
```

### File Locations

| Component | File |
|-----------|------|
| Checkout API | `app/api/checkout/route.ts` |
| Webhook Handler | `app/api/webhooks/paddle/route.ts` |
| Subscription Hook | `hooks/use-subscription.ts` |
| Account Page | `app/account/page.tsx` |
| Plans Config | `lib/payments/plans.ts` |
| Paddle Config | `lib/payments/paddle.ts` |

---

## Issue 1: Webhook Configuration

### Problem

The webhook handler at `/api/webhooks/paddle` expects Paddle to send events when:
- `transaction.completed` - Payment successful
- `subscription.created` - Subscription created
- `subscription.updated` - Subscription changed

**If webhooks aren't configured in Paddle Dashboard**, these events never reach the server.

### Verification Steps

1. Go to Paddle Dashboard → Webhooks
2. Check if webhook URL is configured: `https://gooseui.pro/api/webhooks/paddle`
3. Verify webhook secret matches `PADDLE_WEBHOOK_SECRET` env var
4. Check webhook event types include:
   - `transaction.completed`
   - `subscription.created`
   - `subscription.updated`
   - `subscription.canceled`

### Environment Variables Required

```env
PADDLE_API_KEY=           # Server-side API key
PADDLE_WEBHOOK_SECRET=    # For signature verification
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=  # Client-side token
NEXT_PUBLIC_PADDLE_ENVIRONMENT=sandbox  # or 'production'
NEXT_PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID=  # Price IDs from Paddle
```

---

## Issue 2: Email Matching Logic

### Problem

The webhook handler in `transaction.completed` uses this logic:

```typescript
// Find user by email
const { data: profile } = await supabase
  .from("profiles")
  .select("id")
  .eq("email", customerEmail)  // ← Requires profiles.email to match
  .single()
```

**If the `profiles` table doesn't have the user's email**, the lookup fails silently:

```typescript
if (profile) {
  // Update subscription
} else {
  console.log("User not found for email:", customerEmail)
  // No action taken - subscription stays "free"
}
```

### Root Cause

The `profiles` table is populated by a trigger `handle_new_user()` on user creation. This trigger may not be copying email from `auth.users` to `profiles`.

### Database Schema Check

From `lib/supabase/schema.sql`:

```sql
create table profiles (
  id uuid references auth.users primary key,
  email text,  -- ← Must match Paddle customer email
  full_name text,
  avatar_url text,
  ...
);
```

---

## Recommended Fixes

### Fix 1: Verify Webhook Configuration

1. Log into Paddle Dashboard (Sandbox or Production)
2. Navigate to Developer Tools → Webhooks
3. Create/update webhook with:
   - **URL**: `https://gooseui.pro/api/webhooks/paddle`
   - **Events**: Select all subscription and transaction events
   - **Secret**: Copy and save to `PADDLE_WEBHOOK_SECRET`

### Fix 2: Improve User Lookup in Webhook

Instead of relying only on `profiles.email`, also try `auth.users`:

```typescript
// Current: profiles.email lookup (may fail)
// Improved: Try auth.users if profiles fails

// Option A: Query auth.users directly (requires service role)
const { data: authUser } = await supabase.auth.admin.getUserByEmail(customerEmail)

// Option B: Store Paddle customer ID during checkout
// Then lookup by customer ID instead of email
```

### Fix 3: Add Webhook Logging/Debugging

Add more verbose logging to track webhook flow:

```typescript
console.log("Webhook received:", {
  eventType: event.eventType,
  customerEmail,
  customerId,
  profileFound: !!profile,
})
```

### Fix 4: Manual Subscription Update (Temporary)

For immediate resolution, manually update the subscription in Supabase:

```sql
UPDATE subscriptions
SET plan = 'pro', status = 'active', paddle_customer_id = 'ctm_xxx'
WHERE user_id = 'user-uuid-here';
```

---

## Account Page Analysis

The account page (`app/account/page.tsx`) correctly:
- Fetches subscription from `useSubscription()` hook
- Defaults to "free" plan if no subscription found
- Displays plan features based on current plan

**The page itself is working correctly** - the issue is upstream (webhook not updating database).

---

## Testing Checklist

- [ ] Verify Paddle webhook URL is configured
- [ ] Check Paddle webhook logs for delivery status
- [ ] Verify `PADDLE_WEBHOOK_SECRET` matches Paddle Dashboard
- [ ] Check if `profiles.email` is populated for test user
- [ ] Review server logs for webhook processing errors
- [ ] Test webhook manually with Paddle's "Resend" feature

---

## Conclusion

The most likely cause is **missing webhook configuration** in Paddle Dashboard. The code is correctly written to handle webhooks, but if Paddle doesn't know where to send them, the subscription will never update.

Secondary possibility is email mismatch between Paddle customer and `profiles` table.

**Next Steps**:
1. Configure webhooks in Paddle Dashboard
2. Resend the test transaction webhook
3. Monitor server logs for webhook processing
4. Verify subscription update in database
