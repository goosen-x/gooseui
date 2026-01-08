"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { SVGDrawable } from "@/registry/new-york/ui/svg-drawable"

export function SVGDrawableDemo() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="space-y-8">
      {/* Keyframe animation example */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground text-center">
          Keyframe Animation (draw → erase → loop)
        </p>
        <div className="flex justify-center">
          <SVGDrawable
            key={`wave-${key}`}
            draw={["0 0", "0 1", "1 1"]}
            duration={2500}
            stagger={150}
            ease="ease-in-out"
            loop
          >
            <svg viewBox="0 0 200 60" className="h-16 w-auto">
              <g
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeWidth="3"
              >
                <path d="M10 30 Q35 10 60 30 T110 30 T160 30 T190 30" />
                <path d="M10 45 Q35 25 60 45 T110 45 T160 45 T190 45" />
                <circle cx="20" cy="15" r="5" />
                <circle cx="180" cy="15" r="5" />
              </g>
            </svg>
          </SVGDrawable>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          draw={`['0 0', '0 1', '1 1']`} + stagger=150
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

      {/* Hover examples */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground text-center">
          Hover Animation (наведи на иконки)
        </p>
        <div className="flex items-center justify-center gap-8">
          <div className="space-y-2 text-center">
            <SVGDrawable trigger="hover" draw="0 1" duration={400}>
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-green-500">
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
            <p className="text-xs text-muted-foreground">Checkmark</p>
          </div>

          <div className="space-y-2 text-center">
            <SVGDrawable trigger="hover" draw="0 1" duration={600}>
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-primary">
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
            <p className="text-xs text-muted-foreground">Circle</p>
          </div>

          <div className="space-y-2 text-center">
            <SVGDrawable trigger="hover" draw="0 1" duration={300} stagger={100}>
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-red-500">
                <path
                  d="M6 6 L18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M18 6 L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </SVGDrawable>
            <p className="text-xs text-muted-foreground">X mark</p>
          </div>

          <div className="space-y-2 text-center">
            <SVGDrawable trigger="hover" draw="0 1" duration={500}>
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-yellow-500">
                <path
                  d="M12 2 L15 8 L22 9 L17 14 L18 21 L12 18 L6 21 L7 14 L2 9 L9 8 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </SVGDrawable>
            <p className="text-xs text-muted-foreground">Star</p>
          </div>

          <div className="space-y-2 text-center">
            <SVGDrawable trigger="hover" draw="0 1" duration={600}>
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-pink-500">
                <path
                  d="M12 21 C12 21 4 14 4 8.5 C4 5.5 6.5 3 9.5 3 C11 3 12 4 12 4 C12 4 13 3 14.5 3 C17.5 3 20 5.5 20 8.5 C20 14 12 21 12 21 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </SVGDrawable>
            <p className="text-xs text-muted-foreground">Heart</p>
          </div>
        </div>
      </div>

      {/* On mount examples */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground text-center">
          On Mount Animation
        </p>
        <div className="flex items-center justify-center gap-8">
          <div className="space-y-2 text-center">
            <SVGDrawable
              key={`check-${key}`}
              draw="0 1"
              duration={600}
              ease="ease-out"
            >
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-green-500">
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
            <p className="text-xs text-muted-foreground">Checkmark</p>
          </div>

          <div className="space-y-2 text-center">
            <SVGDrawable key={`circle-${key}`} draw="0 1" duration={1000}>
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-primary">
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
            <p className="text-xs text-muted-foreground">Circle</p>
          </div>

          <div className="space-y-2 text-center">
            <SVGDrawable
              key={`x-${key}`}
              draw="0 1"
              duration={500}
              ease="ease-out"
            >
              <svg viewBox="0 0 24 24" className="h-12 w-12 text-red-500">
                <path
                  d="M6 6 L18 18 M18 6 L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </SVGDrawable>
            <p className="text-xs text-muted-foreground">X mark</p>
          </div>
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
