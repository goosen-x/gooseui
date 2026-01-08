"use client"

import * as React from "react"
import { SVGDrawable } from "@/registry/new-york/ui/svg-drawable"
import { Button } from "@/components/ui/button"

export function SVGDrawableDemo() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="space-y-8">
      {/* anime.js style logo animation */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground text-center">
          Keyframe Animation with Stagger (anime.js style)
        </p>
        <div className="flex justify-center">
          <SVGDrawable
            key={`logo-${key}`}
            draw={["0 0", "0 1", "1 1"]}
            duration={2000}
            stagger={100}
            ease="ease-in-out"
            loop
          >
            <svg viewBox="0 0 304 112" className="h-24 w-auto">
              <g
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M59 90V56.136C58.66 46.48 51.225 39 42 39c-9.389 0-17 7.611-17 17s7.611 17 17 17h8.5v17H42C23.222 90 8 74.778 8 56s15.222-34 34-34c18.61 0 33.433 14.994 34 33.875V90H59z" />
                <polyline points="59 22.035 59 90 76 90 76 22 59 22" />
                <path d="M59 90V55.74C59.567 36.993 74.39 22 93 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90H59z" />
                <polyline points="127 22.055 127 90 144 90 144 22 127 22" />
                <path d="M127 90V55.74C127.567 36.993 142.39 22 161 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z" />
                <path d="M118.5 22a8.5 8.5 0 1 1-8.477 9.067v-1.134c.283-4.42 3.966-7.933 8.477-7.933z" />
                <path d="M144 73c-9.389 0-17-7.611-17-17v-8.5h-17V56c0 18.778 15.222 34 34 34V73z" />
                <path d="M178 90V55.74C178.567 36.993 193.39 22 212 22c18.778 0 34 15.222 34 34v34h-17V56c0-9.389-7.611-17-17-17-9.225 0-16.66 7.48-17 17.136V90h-17z" />
                <path d="M263 73c-9.389 0-17-7.611-17-17s7.611-17 17-17c9.18 0 16.58 7.4 17 17h-17v17h34V55.875C296.433 36.994 281.61 22 263 22c-18.778 0-34 15.222-34 34s15.222 34 34 34V73z" />
                <path d="M288.477 73A8.5 8.5 0 1 1 280 82.067v-1.134c.295-4.42 3.967-7.933 8.477-7.933z" />
              </g>
            </svg>
          </SVGDrawable>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          draw={`['0 0', '0 1', '1 1']`} + stagger=100
        </p>
      </div>

      {/* Basic examples */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Full draw */}
        <div className="space-y-2 text-center">
          <p className="text-xs font-medium text-muted-foreground">
            draw=&quot;0 1&quot; (full)
          </p>
          <SVGDrawable key={`full-${key}`} draw="0 1" duration={1500}>
            <svg viewBox="0 0 100 50" className="h-16 w-full">
              <path
                d="M10,40 Q30,10 50,25 T90,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </SVGDrawable>
        </div>

        {/* First half */}
        <div className="space-y-2 text-center">
          <p className="text-xs font-medium text-muted-foreground">
            draw=&quot;0 0.5&quot; (first half)
          </p>
          <SVGDrawable key={`half-${key}`} draw="0 0.5" duration={1500}>
            <svg viewBox="0 0 100 50" className="h-16 w-full">
              <path
                d="M10,40 Q30,10 50,25 T90,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </SVGDrawable>
        </div>

        {/* Middle section */}
        <div className="space-y-2 text-center">
          <p className="text-xs font-medium text-muted-foreground">
            draw=&quot;0.25 0.75&quot; (middle)
          </p>
          <SVGDrawable key={`middle-${key}`} draw="0.25 0.75" duration={1500}>
            <svg viewBox="0 0 100 50" className="h-16 w-full">
              <path
                d="M10,40 Q30,10 50,25 T90,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </SVGDrawable>
        </div>
      </div>

      {/* Icon examples */}
      <div className="flex items-center justify-center gap-8">
        <div className="space-y-2 text-center">
          <p className="text-xs font-medium text-muted-foreground">Checkmark</p>
          <SVGDrawable
            key={`check-${key}`}
            draw="0 1"
            duration={600}
            ease="ease-out"
          >
            <svg viewBox="0 0 24 24" className="h-16 w-16 text-green-500">
              <path
                d="M4 12 L10 18 L20 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SVGDrawable>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-xs font-medium text-muted-foreground">Circle</p>
          <SVGDrawable key={`circle-${key}`} draw="0 1" duration={1000}>
            <svg viewBox="0 0 24 24" className="h-16 w-16 text-primary">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </SVGDrawable>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-xs font-medium text-muted-foreground">X mark</p>
          <SVGDrawable
            key={`x-${key}`}
            draw="0 1"
            duration={500}
            ease="ease-out"
          >
            <svg viewBox="0 0 24 24" className="h-16 w-16 text-red-500">
              <path
                d="M6 6 L18 18 M18 6 L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </SVGDrawable>
        </div>
      </div>

      {/* Stagger example with multiple paths */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground text-center">
          Stagger Animation (stagger=200ms)
        </p>
        <div className="flex justify-center">
          <SVGDrawable
            key={`stagger-${key}`}
            draw="0 1"
            duration={800}
            stagger={200}
          >
            <svg viewBox="0 0 100 60" className="h-20 w-48">
              <line
                x1="10"
                y1="10"
                x2="90"
                y2="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="10"
                y1="30"
                x2="90"
                y2="30"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1="10"
                y1="50"
                x2="90"
                y2="50"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </SVGDrawable>
        </div>
      </div>

      {/* Replay button */}
      <div className="flex justify-center">
        <Button variant="outline" onClick={() => setKey((k) => k + 1)}>
          Replay Animation
        </Button>
      </div>
    </div>
  )
}
