"use client"

import { useLocale } from "next-intl"
import type { Dict } from "@/i18n/dict"
import type { Locale } from "@/i18n/routing"
import { GlitchText } from "@/registry/gooseui/effects/glitch-text"

const en = {
  componentLibrary: "Component Library",
}

const content: Dict<typeof en> = {
  en,
  ru: {
    componentLibrary: "Библиотека компонентов",
  },
}

function useT() {
  return content[useLocale() as Locale]
}

export function GlitchTextDemo() {
  return (
    <div className="flex flex-col items-center gap-8 w-full py-8">
      <GlitchText text="GLITCH" className="text-6xl text-foreground" />
    </div>
  )
}

export function GlitchTextIntensityDemo() {
  return (
    <div className="flex flex-col items-center gap-8 w-full py-8 bg-muted/30 rounded-lg">
      <div className="text-center">
        <span className="text-xs text-muted-foreground mb-2 block">Low</span>
        <GlitchText
          text="SUBTLE"
          intensity="low"
          className="text-4xl text-foreground"
        />
      </div>
      <div className="text-center">
        <span className="text-xs text-muted-foreground mb-2 block">Medium</span>
        <GlitchText
          text="DEFAULT"
          intensity="medium"
          className="text-4xl text-foreground"
        />
      </div>
      <div className="text-center">
        <span className="text-xs text-muted-foreground mb-2 block">High</span>
        <GlitchText
          text="INTENSE"
          intensity="high"
          className="text-4xl text-foreground"
        />
      </div>
    </div>
  )
}

export function GlitchTextColorDemo() {
  return (
    <div className="flex flex-col items-center gap-8 w-full py-8 bg-muted/30 rounded-lg">
      <GlitchText text="NEON" color="#00b36b" className="text-5xl" />
      <GlitchText text="CYBER" color="#e6006e" className="text-5xl" />
      <GlitchText text="PUNK" color="#d99a00" className="text-5xl" />
    </div>
  )
}

export function GlitchTextMinimalDemo() {
  return (
    <div className="flex flex-col items-center gap-8 w-full py-8 bg-muted/30 rounded-lg">
      <GlitchText
        text="CLEAN"
        showScanlines={false}
        showGlow={false}
        className="text-5xl text-foreground"
      />
    </div>
  )
}

export function GlitchTextHeroDemo() {
  const t = useT()
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-16 bg-muted/30 rounded-lg overflow-hidden">
      <GlitchText
        text="GOOSEUI"
        intensity="medium"
        className="text-7xl md:text-8xl text-foreground font-black tracking-tight"
      />
      <p className="mt-4 text-muted-foreground text-sm tracking-[0.3em] uppercase">
        {t.componentLibrary}
      </p>
    </div>
  )
}
