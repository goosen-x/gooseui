import {
  ArrowUpRight,
  BookOpen,
  Clock,
  Heart,
  Sparkles,
  Star,
  Zap,
} from "lucide-react"
import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/gooseui/ui/badge"
import { Button } from "@/registry/gooseui/ui/button"
import {
  CornerBadge,
  type CornerBadgeCorner,
} from "@/registry/gooseui/ui/corner-badge"

export type CornerBadgeDemoText = {
  cardTitle: string
  cardText: string
  newLabel: string
}

function DemoCard({
  title,
  text,
  className,
  children,
}: {
  title: string
  text: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "relative w-56 border bg-card p-5 pr-16 text-card-foreground shadow-xs",
        className,
      )}
    >
      {children}
      <div className="font-semibold">{title}</div>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

const gradient = {
  "--corner-badge-bg":
    "linear-gradient(135deg, var(--chart-1), var(--chart-4))",
  "--corner-badge-fg": "var(--background)",
} as CSSProperties

export function CornerBadgeDemo({ t }: { t: CornerBadgeDemoText }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 px-4">
      <DemoCard title={t.cardTitle} text={t.cardText} className="rounded-2xl">
        <CornerBadge aria-hidden="true">
          <Sparkles className="size-5" />
        </CornerBadge>
      </DemoCard>
      <DemoCard title={t.cardTitle} text={t.cardText} className="rounded-3xl">
        <CornerBadge size={56} style={gradient} aria-hidden="true">
          <Zap className="size-6" />
        </CornerBadge>
      </DemoCard>
    </div>
  )
}

const corners: { corner: CornerBadgeCorner; icon: ReactNode }[] = [
  { corner: "tl", icon: <Star className="size-4" /> },
  { corner: "tr", icon: <Heart className="size-4" /> },
  { corner: "bl", icon: <Zap className="size-4" /> },
  { corner: "br", icon: <ArrowUpRight className="size-4" /> },
]

export function CornerBadgeCornersDemo() {
  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {corners.map(({ corner, icon }) => (
        <div
          key={corner}
          className="relative flex size-32 items-center justify-center rounded-xl border bg-card font-mono text-sm text-muted-foreground"
        >
          <CornerBadge corner={corner} size={40} aria-hidden="true">
            {icon}
          </CornerBadge>
          {corner}
        </div>
      ))}
    </div>
  )
}

export function CornerBadgeTextDemo({ t }: { t: CornerBadgeDemoText }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 px-4">
      <DemoCard title={t.cardTitle} text={t.cardText} className="rounded-md">
        <CornerBadge color="foreground" size={44} notch={12} radius={10}>
          <span className="text-[11px] tracking-wide uppercase">
            {t.newLabel}
          </span>
        </CornerBadge>
      </DemoCard>
      <DemoCard
        title={t.cardTitle}
        text={t.cardText}
        className="rounded-[2rem]"
      >
        <CornerBadge color="destructive" size={52}>
          <span className="text-xs">-20%</span>
        </CornerBadge>
      </DemoCard>
    </div>
  )
}

export function CornerBadgeLinkDemo({ t }: { t: CornerBadgeDemoText }) {
  return (
    <div className="flex justify-center px-4">
      <DemoCard title={t.cardTitle} text={t.cardText} className="rounded-2xl">
        <CornerBadge color="secondary" size={44}>
          <a
            href="#examples"
            aria-label={t.cardTitle}
            className="flex size-full cursor-pointer items-center justify-center rounded-[inherit] outline-none transition-colors hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <ArrowUpRight className="size-5" />
          </a>
        </CornerBadge>
      </DemoCard>
    </div>
  )
}

export type CornerBadgePhotoText = {
  teacher: {
    name: string
    role: string
    text: string
    stats: string
    cta: string
  }
  author: {
    name: string
    tag: string
    title: string
    excerpt: string
    meta: string
  }
  product: {
    name: string
    text: string
    price: string
    oldPrice: string
    discount: string
    cta: string
  }
  course: {
    name: string
    badge: string
    text: string
    lessons: string
    duration: string
    priceLabel: string
    price: string
  }
}

export type CornerBadgeInitialsText = {
  name: string
  role: string
  initials: string
}

// Cards have a fill and no border or shadow, the mask cuts the corner out.
// Content on the side of the corner is pushed away by photo size + gap.
const card =
  "relative flex min-h-[300px] w-full max-w-[380px] flex-col bg-muted p-6 text-card-foreground"

export function CornerBadgePhotoDemo({ t }: { t: CornerBadgePhotoText }) {
  const { teacher, author, product, course } = t
  return (
    <div className="grid w-full grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2">
      {/* Teacher: round photo, top left */}
      <div className={cn(card, "rounded-3xl")}>
        <CornerBadge
          variant="photo"
          corner="tl"
          size={112}
          gap={6}
          src="/demo/corner-badge/teacher-2.webp"
          alt={teacher.name}
        />
        <div className="ml-[104px] flex min-h-[88px] flex-col justify-center">
          <div className="text-lg font-semibold leading-tight">
            {teacher.name}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{teacher.role}</p>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {teacher.text}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <Star className="size-4 fill-current" aria-hidden="true" />
            {teacher.stats}
          </span>
          <Button size="sm">{teacher.cta}</Button>
        </div>
      </div>

      {/* Article author: round photo, top right */}
      <div className={cn(card, "rounded-2xl")}>
        <CornerBadge
          variant="photo"
          corner="tr"
          size={104}
          gap={8}
          src="/demo/corner-badge/teacher-1.webp"
          alt={author.name}
        />
        <div className="mr-[88px] min-h-[88px]">
          <Badge variant="outline">{author.tag}</Badge>
          <h3 className="mt-3 text-xl font-semibold leading-snug">
            {author.title}
          </h3>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          {author.excerpt}
        </p>
        <p className="mt-auto pt-5 text-sm text-muted-foreground">
          {author.meta}
        </p>
      </div>

      {/* Product: rounded square, bottom right */}
      <div className={cn(card, "rounded-3xl")}>
        <CornerBadge
          variant="photo"
          corner="br"
          shape="rounded"
          size={120}
          gap={6}
          radius={28}
          notch={20}
          src="/demo/corner-badge/product-backpack.webp"
          alt={product.name}
        />
        <Badge variant="destructive" className="mb-3">
          {product.discount}
        </Badge>
        <div className="text-lg font-semibold leading-tight">
          {product.name}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {product.text}
        </p>
        <div className="mt-auto pt-5 pr-[126px]">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="whitespace-nowrap text-3xl font-bold tracking-tight">
              {product.price}
            </span>
            <s className="whitespace-nowrap text-sm text-muted-foreground">
              {product.oldPrice}
            </s>
          </div>
          <Button size="sm" className="mt-3">
            {product.cta}
          </Button>
        </div>
      </div>

      {/* Course: rounded square, bottom left */}
      <div className={cn(card, "rounded-2xl")}>
        <CornerBadge
          variant="photo"
          corner="bl"
          shape="rounded"
          size={112}
          gap={6}
          radius={36}
          src="/demo/corner-badge/course.webp"
          alt={course.name}
        />
        <Badge variant="info" dot>
          {course.badge}
        </Badge>
        <h3 className="mt-3 text-xl font-semibold leading-snug">
          {course.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {course.text}
        </p>
        <div className="mt-auto flex min-h-[112px] flex-col justify-between pt-5 pl-[118px]">
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="size-4" aria-hidden="true" />
              {course.lessons}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">
              {course.priceLabel}
            </div>
            <div className="text-xl font-bold tracking-tight">
              {course.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CornerBadgeInitialsDemo({ t }: { t: CornerBadgeInitialsText }) {
  return (
    <div className="flex justify-center px-4">
      <div className="relative w-full max-w-[320px] rounded-2xl bg-muted p-6 pl-[104px] text-card-foreground">
        <CornerBadge variant="photo" corner="tl" size={80}>
          {t.initials}
        </CornerBadge>
        <div className="min-h-[56px]">
          <div className="font-semibold">{t.name}</div>
          <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  )
}
