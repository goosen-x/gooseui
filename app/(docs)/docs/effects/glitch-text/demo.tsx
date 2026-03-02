"use client"

import { GlitchText } from "@/registry/new-york/effects/glitch-text"

export function GlitchTextDemo() {
  return (
    <div className="flex flex-col items-center gap-8 py-8 bg-black rounded-lg">
      <GlitchText text="GLITCH" className="text-6xl text-white" />
    </div>
  )
}

export function GlitchTextIntensityDemo() {
  return (
    <div className="flex flex-col items-center gap-8 py-8 bg-black rounded-lg">
      <div className="text-center">
        <span className="text-xs text-zinc-500 mb-2 block">Low</span>
        <GlitchText
          text="SUBTLE"
          intensity="low"
          className="text-4xl text-white"
        />
      </div>
      <div className="text-center">
        <span className="text-xs text-zinc-500 mb-2 block">Medium</span>
        <GlitchText
          text="DEFAULT"
          intensity="medium"
          className="text-4xl text-white"
        />
      </div>
      <div className="text-center">
        <span className="text-xs text-zinc-500 mb-2 block">High</span>
        <GlitchText
          text="INTENSE"
          intensity="high"
          className="text-4xl text-white"
        />
      </div>
    </div>
  )
}

export function GlitchTextColorDemo() {
  return (
    <div className="flex flex-col items-center gap-8 py-8 bg-black rounded-lg">
      <GlitchText text="NEON" color="#00ff88" className="text-5xl" />
      <GlitchText text="CYBER" color="#ff0080" className="text-5xl" />
      <GlitchText text="PUNK" color="#ffcc00" className="text-5xl" />
    </div>
  )
}

export function GlitchTextMinimalDemo() {
  return (
    <div className="flex flex-col items-center gap-8 py-8 bg-black rounded-lg">
      <GlitchText
        text="CLEAN"
        showScanlines={false}
        showGlow={false}
        className="text-5xl text-white"
      />
    </div>
  )
}

export function GlitchTextHeroDemo() {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 bg-black rounded-lg overflow-hidden">
      <GlitchText
        text="GOOSEUI"
        intensity="medium"
        className="text-7xl md:text-8xl text-white font-black tracking-tight"
      />
      <p className="mt-4 text-zinc-500 text-sm tracking-[0.3em] uppercase">
        Component Library
      </p>
    </div>
  )
}
