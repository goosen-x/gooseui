import { BackgroundPattern } from "@/components/landing/background-pattern"
import { ComponentPreview } from "@/components/landing/component-preview"
import { CTA } from "@/components/landing/cta"
import { CurvedTextSection } from "@/components/landing/curved-text-section"
import { FAQ } from "@/components/landing/faq"
import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        <BackgroundPattern />
        <Hero />
      </div>

      {/* Curved Text Marquee */}
      <CurvedTextSection />

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
