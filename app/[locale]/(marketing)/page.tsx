import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { ComponentPreview } from "@/components/landing/component-preview"
import { FAQ } from "@/components/landing/faq"
import { CTA } from "@/components/landing/cta"
import { BackgroundPattern } from "@/components/landing/background-pattern"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        <BackgroundPattern />
        <Hero />
      </div>

      {/* Features */}
      <Features />

      {/* Component Preview */}
      <ComponentPreview />

      {/* FAQ */}
      <FAQ />

      {/* CTA */}
      <CTA />
    </div>
  )
}
