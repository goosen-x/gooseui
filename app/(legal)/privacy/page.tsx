import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | GooseUI",
  description: "Privacy Policy for GooseUI",
}

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>
            GooseUI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">2. Information We Collect</h2>

          <h3 className="text-lg font-medium mt-4 mb-2">Information you provide:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Account information (email address, name)</li>
            <li>Payment information (processed by Paddle)</li>
            <li>Content you create using the Service</li>
            <li>Communications with us</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">Information collected automatically:</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Device and browser information</li>
            <li>IP address and location data</li>
            <li>Usage data and analytics</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide and maintain the Service</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send important updates and notifications</li>
            <li>Improve and personalize the Service</li>
            <li>Respond to your requests and support inquiries</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Sharing</h2>
          <p>We may share your information with:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Paddle:</strong> Our payment processor and merchant of record</li>
            <li><strong>Hosting providers:</strong> To deliver the Service (Vercel)</li>
            <li><strong>Analytics services:</strong> To understand usage patterns</li>
            <li><strong>Legal authorities:</strong> When required by law</li>
          </ul>
          <p className="mt-2">
            We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal data, including:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Encryption of data in transit (HTTPS)</li>
            <li>Secure authentication mechanisms</li>
            <li>Regular security assessments</li>
            <li>Limited access to personal data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">6. Data Retention</h2>
          <p>
            We retain your personal data for as long as your account is active or as needed to provide the Service.
            You can request deletion of your account and data at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">7. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your data</li>
            <li>Export your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">8. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience. You can control cookie
            preferences through your browser settings. Essential cookies are required for the Service to function.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">9. International Transfers</h2>
          <p>
            Your data may be transferred to and processed in countries outside your residence.
            We ensure appropriate safeguards are in place for such transfers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">10. Children&apos;s Privacy</h2>
          <p>
            The Service is not intended for children under 16. We do not knowingly collect personal
            data from children. If you believe we have collected data from a child, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant
            changes via email or through the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-4">12. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or your data, contact us at:{" "}
            <a href="mailto:privacy@gooseui.pro" className="text-primary hover:underline">
              privacy@gooseui.pro
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
