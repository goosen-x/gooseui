import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | GooseUI",
  description: "Terms of Service for GooseUI",
}

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using GooseUI (&quot;Service&quot;), you accept and
            agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            2. Description of Service
          </h2>
          <p>
            GooseUI provides a landing page builder and UI component library.
            The Service allows users to create, customize, and export landing
            pages using pre-built components.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Free tier: Limited projects and exports with watermark</li>
            <li>Pro tier: Unlimited projects, exports, and premium features</li>
            <li>Team tier: Team collaboration features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
          <p>
            To access certain features, you may need to create an account. You
            are responsible for:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">4. Payment Terms</h2>
          <p>
            Paid subscriptions are billed in advance on a monthly or annual
            basis. Payments are processed securely through Paddle, our merchant
            of record.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Prices are in USD and may be subject to local taxes</li>
            <li>Subscriptions automatically renew unless cancelled</li>
            <li>You can cancel your subscription at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">5. Refund Policy</h2>
          <p>
            We offer a 30-day money-back guarantee for all paid subscriptions.
            If you are not satisfied with the Service, contact us within 30 days
            of purchase for a full refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            6. Intellectual Property
          </h2>
          <p>
            The Service and its original content, features, and functionality
            are owned by GooseUI and are protected by international copyright,
            trademark, and other intellectual property laws.
          </p>
          <p className="mt-2">
            Content you create using the Service belongs to you. You grant us a
            license to host and display your content as necessary to provide the
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            7. Prohibited Uses
          </h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights of others</li>
            <li>Distribute malware or harmful code</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Resell or redistribute the Service without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            8. Limitation of Liability
          </h2>
          <p>
            The Service is provided &quot;as is&quot; without warranties of any
            kind. We shall not be liable for any indirect, incidental, special,
            or consequential damages resulting from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">
            9. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. We will
            notify users of significant changes via email or through the
            Service. Continued use after changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact</h2>
          <p>
            If you have questions about these Terms, please contact us at:{" "}
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
