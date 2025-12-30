"use client"

import { useState } from "react"
import {
  AnimatedToggleGroup,
  AnimatedToggleGroupItem,
} from "@/components/ui/animated-toggle-group"

export function AnimatedToggleGroupPreview() {
  const [value, setValue] = useState("first")

  return (
    <div className="flex items-center justify-center rounded-lg border p-8 bg-background">
      <AnimatedToggleGroup
        type="single"
        value={value}
        onValueChange={(v: string) => v && setValue(v)}
        className="w-[300px]"
      >
        <AnimatedToggleGroupItem value="first">First</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="second">Second</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="third">Third</AnimatedToggleGroupItem>
      </AnimatedToggleGroup>
    </div>
  )
}

export function AnimatedToggleGroupSizesDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-8 bg-background">
      <AnimatedToggleGroup
        type="single"
        defaultValue="a"
        size="sm"
        className="w-[250px]"
      >
        <AnimatedToggleGroupItem value="a">Small</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="b">Size</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="c">Items</AnimatedToggleGroupItem>
      </AnimatedToggleGroup>

      <AnimatedToggleGroup
        type="single"
        defaultValue="a"
        size="default"
        className="w-[300px]"
      >
        <AnimatedToggleGroupItem value="a">Default</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="b">Size</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="c">Items</AnimatedToggleGroupItem>
      </AnimatedToggleGroup>

      <AnimatedToggleGroup
        type="single"
        defaultValue="a"
        size="lg"
        className="w-[350px]"
      >
        <AnimatedToggleGroupItem value="a">Large</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="b">Size</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="c">Items</AnimatedToggleGroupItem>
      </AnimatedToggleGroup>
    </div>
  )
}

export function AnimatedToggleGroupMultipleDemo() {
  return (
    <div className="flex items-center justify-center rounded-lg border p-8 bg-background">
      <AnimatedToggleGroup type="multiple" className="w-[300px]">
        <AnimatedToggleGroupItem value="bold">Bold</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="italic">Italic</AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="underline">
          Underline
        </AnimatedToggleGroupItem>
      </AnimatedToggleGroup>
    </div>
  )
}

export function AnimatedToggleGroupTabsDemo() {
  const [tab, setTab] = useState("overview")

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border p-8 bg-background">
      <AnimatedToggleGroup
        type="single"
        value={tab}
        onValueChange={(v: string) => v && setTab(v)}
        className="w-full max-w-md"
      >
        <AnimatedToggleGroupItem value="overview">
          Overview
        </AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="analytics">
          Analytics
        </AnimatedToggleGroupItem>
        <AnimatedToggleGroupItem value="reports">
          Reports
        </AnimatedToggleGroupItem>
      </AnimatedToggleGroup>

      <div className="mt-4 p-4 border rounded-lg w-full max-w-md text-center text-muted-foreground">
        Content for:{" "}
        <span className="font-semibold text-foreground">{tab}</span>
      </div>
    </div>
  )
}
