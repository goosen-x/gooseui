"use client"

import { PartyPopper } from "lucide-react"
import { useLocale } from "next-intl"
import { useEffect, useRef, useState } from "react"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import {
  ConfettiButton,
  type ConfettiPreset,
  prefersReducedMotion,
  useConfetti,
} from "@/registry/gooseui/effects/confetti"
import { Button } from "@/registry/gooseui/ui/button"
import { Checkbox } from "@/registry/gooseui/ui/checkbox"
import { Label } from "@/registry/gooseui/ui/label"

const en = {
  celebrate: "Celebrate",
  presets: { low: "Low", medium: "Medium", high: "High", burst: "Burst" },
  target: "Target",
  fromTarget: "Fire at the target",
  cannons: "Side cannons",
  reduced: "Reduced motion is on, so the effect is skipped.",
  task: "Finish the onboarding",
  done: "Done!",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    celebrate: "Отпраздновать",
    presets: { low: "Слабо", medium: "Средне", high: "Сильно", burst: "Взрыв" },
    target: "Цель",
    fromTarget: "Залп по цели",
    cannons: "Пушки с краёв",
    reduced: "Включено уменьшение движения, поэтому эффект пропускается.",
    task: "Пройти онбординг",
    done: "Готово!",
  },
}

function ReducedNote() {
  const t = content[useLocale() as Locale]
  const [reduced, setReduced] = useState(false)
  useEffect(() => setReduced(prefersReducedMotion()), [])
  if (!reduced) return null
  return <p className="text-xs text-muted-foreground">{t.reduced}</p>
}

export function ConfettiDemo() {
  const t = content[useLocale() as Locale]
  return (
    <div className="flex flex-col items-center gap-3">
      <ConfettiButton className="h-11 px-6 text-base">
        <PartyPopper aria-hidden className="size-5" />
        {t.celebrate}
      </ConfettiButton>
      <ReducedNote />
    </div>
  )
}

export function ConfettiPresetsDemo() {
  const t = content[useLocale() as Locale]
  const { fire } = useConfetti()
  const presets: ConfettiPreset[] = ["low", "medium", "high", "burst"]
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {presets.map((p) => (
        <Button
          key={p}
          variant="outline"
          onClick={(e) => fire({ preset: p, origin: e.currentTarget })}
        >
          {t.presets[p]}
        </Button>
      ))}
    </div>
  )
}

export function ConfettiTargetDemo() {
  const t = content[useLocale() as Locale]
  const target = useRef<HTMLDivElement>(null)
  const { fire } = useConfetti({ origin: target, preset: "burst" })
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-12">
      <Button onClick={() => fire()}>{t.fromTarget}</Button>
      <div
        ref={target}
        className="flex size-24 items-center justify-center rounded-full border-2 border-dashed text-sm text-muted-foreground"
      >
        {t.target}
      </div>
    </div>
  )
}

export function ConfettiCannonsDemo() {
  const t = content[useLocale() as Locale]
  const { fire } = useConfetti({ preset: "high", spread: 55 })
  const shoot = () => {
    const y = window.innerHeight * 0.7
    fire({ origin: { x: 0, y }, angle: 60, particleCount: 90 })
    fire({ origin: { x: window.innerWidth, y }, angle: 120, particleCount: 90 })
  }
  return (
    <Button variant="secondary" onClick={shoot}>
      {t.cannons}
    </Button>
  )
}

export function ConfettiTaskDemo() {
  const t = content[useLocale() as Locale]
  const { fire } = useConfetti({ preset: "low", shapes: ["circle", "strip"] })
  const [done, setDone] = useState(false)
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 text-sm">
      <Checkbox
        id="confetti-task"
        size="sm"
        checked={done}
        onChange={(e) => {
          setDone(e.target.checked)
          if (e.target.checked)
            fire({ origin: e.currentTarget.parentElement ?? e.currentTarget })
        }}
      />
      <Label
        htmlFor="confetti-task"
        className={
          done
            ? "cursor-pointer text-muted-foreground line-through"
            : "cursor-pointer"
        }
      >
        {t.task}
      </Label>
      {done && <span className="font-medium text-primary">{t.done}</span>}
    </div>
  )
}
