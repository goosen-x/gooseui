"use client"

/**
 * Design Settings Store
 *
 * Manages font, radius, and other design tokens for the landing page generator
 */

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Available fonts
export const fonts = [
  { name: "Inter", value: "Inter" },
  { name: "Geist", value: "Geist" },
  { name: "DM Sans", value: "DM Sans" },
  { name: "Plus Jakarta", value: "Plus Jakarta Sans" },
  { name: "Poppins", value: "Poppins" },
  { name: "Manrope", value: "Manrope" },
  { name: "Space Grotesk", value: "Space Grotesk" },
  { name: "Outfit", value: "Outfit" },
  { name: "Sora", value: "Sora" },
  { name: "Satoshi", value: "Satoshi" },
] as const

export type FontName = (typeof fonts)[number]["name"]

// Radius is now a number (0-20 in pixels)
export const RADIUS_MIN = 0
export const RADIUS_MAX = 20

interface DesignState {
  font: FontName
  radius: number // in pixels (0-20)
}

interface DesignActions {
  setFont: (font: FontName) => void
  setRadius: (radius: number) => void
  reset: () => void
}

type DesignStore = DesignState & DesignActions

const initialState: DesignState = {
  font: "Inter",
  radius: 8, // 0.5rem = 8px default
}

export const useDesignStore = create<DesignStore>()(
  persist(
    (set) => ({
      ...initialState,

      setFont: (font) => set({ font }),
      setRadius: (radius) => set({ radius }),
      reset: () => set(initialState),
    }),
    {
      name: "gooseui-design",
    },
  ),
)

/**
 * Get font family value
 */
export function getFontValue(name: FontName): string {
  return fonts.find((f) => f.name === name)?.value || "Inter"
}

/**
 * Get radius value in pixels
 */
export function getRadiusPixels(radius: number): string {
  return `${radius}px`
}
