/**
 * Landing Page Templates
 *
 * Pre-configured page schemas that users can start from
 */

import type { PageSchema, SectionSchema } from "./types"

export interface Template {
  id: string
  name: string
  description: string
  thumbnail?: string
  category: "saas" | "portfolio" | "agency" | "ecommerce" | "startup"
  sections: Omit<SectionSchema, "id">[]
  settings: PageSchema["settings"]
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return crypto.randomUUID()
}

/**
 * Available templates
 */
export const templates: Template[] = [
  {
    id: "saas-classic",
    name: "SaaS Classic",
    description: "Clean and professional template for SaaS products",
    category: "saas",
    sections: [
      { type: "header", variant: "header-cta", props: {}, isRequired: true },
      { type: "hero", variant: "hero-classic", props: {}, isRequired: true },
      { type: "brands", variant: "brands-carousel", props: {} },
      { type: "services", variant: "services-marquee", props: {} },
      { type: "footer", variant: "footer-columns", props: {}, isRequired: true },
    ],
    settings: {
      title: "SaaS Product - Build Better Software",
      description: "The all-in-one platform for modern teams to build, ship, and scale software faster.",
    },
  },

  {
    id: "startup-minimal",
    name: "Startup Minimal",
    description: "Minimalist design for early-stage startups",
    category: "startup",
    sections: [
      { type: "header", variant: "header-simple", props: {}, isRequired: true },
      { type: "hero", variant: "hero-split", props: {}, isRequired: true },
      { type: "footer", variant: "footer-simple", props: {}, isRequired: true },
    ],
    settings: {
      title: "Startup Name - Tagline Here",
      description: "We're building the future of [industry]. Join us on this journey.",
    },
  },

  {
    id: "agency-bold",
    name: "Agency Bold",
    description: "Bold and creative template for digital agencies",
    category: "agency",
    sections: [
      { type: "header", variant: "header-auth", props: {}, isRequired: true },
      { type: "hero", variant: "hero-classic", props: {}, isRequired: true },
      { type: "services", variant: "services-marquee", props: {} },
      { type: "brands", variant: "brands-carousel", props: {} },
      { type: "footer", variant: "footer-newsletter", props: {}, isRequired: true },
    ],
    settings: {
      title: "Creative Agency - We Build Digital Experiences",
      description: "Award-winning digital agency specializing in web design, branding, and marketing.",
    },
  },

  {
    id: "portfolio-simple",
    name: "Portfolio Simple",
    description: "Clean portfolio for freelancers and creators",
    category: "portfolio",
    sections: [
      { type: "header", variant: "header-simple", props: {}, isRequired: true },
      { type: "hero", variant: "hero-split", props: {}, isRequired: true },
      { type: "footer", variant: "footer-simple", props: {}, isRequired: true },
    ],
    settings: {
      title: "John Doe - Designer & Developer",
      description: "I create beautiful digital experiences that help businesses grow.",
    },
  },

  {
    id: "ecommerce-launch",
    name: "Product Launch",
    description: "Perfect for product launches and pre-orders",
    category: "ecommerce",
    sections: [
      { type: "header", variant: "header-cta", props: {}, isRequired: true },
      { type: "hero", variant: "hero-classic", props: {}, isRequired: true },
      { type: "brands", variant: "brands-carousel", props: {} },
      { type: "footer", variant: "footer-newsletter", props: {}, isRequired: true },
    ],
    settings: {
      title: "Product Name - Coming Soon",
      description: "Be the first to know when we launch. Sign up for early access.",
    },
  },
]

/**
 * Get template by ID
 */
export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id)
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: Template["category"]): Template[] {
  return templates.filter((t) => t.category === category)
}

/**
 * Convert template to PageSchema
 */
export function templateToPageSchema(template: Template): PageSchema {
  return {
    id: generateId(),
    name: template.name,
    sections: template.sections.map((section) => ({
      ...section,
      id: generateId(),
    })),
    settings: template.settings,
  }
}

/**
 * Get all template categories
 */
export function getTemplateCategories(): Template["category"][] {
  return ["saas", "startup", "agency", "portfolio", "ecommerce"]
}

/**
 * Category display names
 */
export const categoryNames: Record<Template["category"], string> = {
  saas: "SaaS",
  startup: "Startup",
  agency: "Agency",
  portfolio: "Portfolio",
  ecommerce: "E-commerce",
}
