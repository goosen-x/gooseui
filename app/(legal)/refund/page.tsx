import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy | GooseUI",
  description: "Refund Policy for GooseUI",
}

export default function RefundPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            30-Day Money-Back Guarantee
          </h2>
          <p>
            We offer a <strong>30-day money-back guarantee</strong> on all paid
            subscriptions. If you&apos;re not satisfied with GooseUI for any
            reason, simply contact us within 30 days of your purchase for a full
            refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            How to Request a Refund
          </h2>
          <p>To request a refund:</p>
          <ol className="list-decimal pl-6 mt-2 space-y-2">
            <li>
              Email us at{" "}
              <a
                href="mailto:support@gooseui.pro"
                className="text-primary hover:underline"
              >
                support@gooseui.pro
              </a>
            </li>
            <li>Include your account email and reason for refund (optional)</li>
            <li>We&apos;ll process your refund within 5-7 business days</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Refund Conditions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Refund requests must be made within 30 days of purchase</li>
            <li>Refunds are issued to the original payment method</li>
            <li>
              Upon refund, your account will be downgraded to the free tier
            </li>
            <li>
              Exported content created during the subscription period remains
              yours
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Subscription Cancellation
          </h2>
          <p>
            You can cancel your subscription at any time from your account
            settings. When you cancel:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>
              You retain access to paid features until the end of your billing
              period
            </li>
            <li>Your subscription will not renew</li>
            <li>
              No partial refunds for unused time (unless within 30-day guarantee
              period)
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            Payment Processing
          </h2>
          <p>
            All payments are processed by <strong>Paddle</strong>, our merchant
            of record. Refunds are handled through Paddle&apos;s secure payment
            system.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">Contact</h2>
          <p>
            Questions about refunds? Contact us at:{" "}
            <a
              href="mailto:support@gooseui.pro"
              className="text-primary hover:underline"
            >
              support@gooseui.pro
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
