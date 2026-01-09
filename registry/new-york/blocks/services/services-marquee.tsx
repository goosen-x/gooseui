"use client"

import {
  Code2,
  Cpu,
  Globe,
  Layers,
  Palette,
  Rocket,
  Shield,
  Zap,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Service {
  title: string
  description: string
  icon: LucideIcon
  gradient: string
}

const services: Service[] = [
  {
    title: "Web Development",
    description: "Build modern, responsive websites with cutting-edge technologies",
    icon: Globe,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "UI/UX Design",
    description: "Create beautiful interfaces that users love to interact with",
    icon: Palette,
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "API Integration",
    description: "Connect your services with robust and scalable APIs",
    icon: Code2,
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Cloud Solutions",
    description: "Deploy and scale your applications in the cloud",
    icon: Layers,
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    title: "Performance",
    description: "Optimize your apps for lightning-fast load times",
    icon: Zap,
    gradient: "from-yellow-500/20 to-lime-500/20",
  },
  {
    title: "Security",
    description: "Protect your data with enterprise-grade security",
    icon: Shield,
    gradient: "from-emerald-500/20 to-green-500/20",
  },
  {
    title: "AI & Automation",
    description: "Leverage AI to automate and enhance your workflows",
    icon: Cpu,
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
  {
    title: "Launch Support",
    description: "Get expert help launching your product to market",
    icon: Rocket,
    gradient: "from-red-500/20 to-orange-500/20",
  },
]

interface ServicesMarqueeProps {
  className?: string
  speed?: "slow" | "normal" | "fast"
}

export function ServicesMarquee({
  className,
  speed = "normal",
}: ServicesMarqueeProps) {
  const speedMap = {
    slow: "60s",
    normal: "40s",
    fast: "25s",
  }

  return (
    <section className={cn("py-16 sm:py-24", className)}>
      <div className="container px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to succeed
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive solutions designed to help your business grow and thrive
            in the digital age.
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

        {/* Marquee Track */}
        <div
          className="flex gap-6 w-fit animate-marquee"
          style={{ "--duration": speedMap[speed] } as React.CSSProperties}
        >
          {/* First set */}
          {services.map((service, i) => (
            <ServiceCard key={`service-1-${i}`} service={service} />
          ))}
          {/* Duplicate for seamless loop */}
          {services.map((service, i) => (
            <ServiceCard key={`service-2-${i}`} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon

  return (
    <div className="group relative w-80 shrink-0 rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1">
      {/* Gradient Background */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100",
          service.gradient,
        )}
      />

      {/* Content */}
      <div className="relative space-y-4">
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{service.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Learn More Link */}
        <div className="pt-2">
          <span className="text-sm font-medium text-primary cursor-pointer hover:underline">
            Learn more →
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Static grid variant (no animation)
 */
export function ServicesGrid({ className }: { className?: string }) {
  return (
    <section className={cn("py-16 sm:py-24", className)}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive solutions designed to help your business grow.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
