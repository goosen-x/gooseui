"use client"

import * as React from "react"
import { Button } from "@/registry/new-york/ui/button"
import { SlidingNumber } from "@/registry/new-york/ui/sliding-number"

export function SlidingNumberDemo() {
  const [value, setValue] = React.useState(1337)

  const increment = () => {
    const delta = Math.floor(Math.random() * 10) + 1
    setValue((prev) => prev + delta)
  }

  const decrement = () => {
    const delta = Math.floor(Math.random() * 10) + 1
    setValue((prev) => Math.max(0, prev - delta))
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold">
        <SlidingNumber value={value} />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={decrement}>
          -
        </Button>
        <Button variant="outline" size="sm" onClick={increment}>
          +
        </Button>
      </div>
    </div>
  )
}

export function SlidingNumberCounterDemo() {
  const [count, setCount] = React.useState(0)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-5xl font-bold tabular-nums">
        <SlidingNumber value={count} padStart={3} />
      </div>
      <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
    </div>
  )
}

export function SlidingNumberTimerDemo() {
  const [seconds, setSeconds] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)

  React.useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold font-mono flex items-center">
        <SlidingNumber value={minutes} padStart={2} />
        <span className="mx-1">:</span>
        <SlidingNumber value={secs} padStart={2} />
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setIsRunning(false)
            setSeconds(0)
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export function SlidingNumberPriceDemo() {
  const [price, setPrice] = React.useState(99)

  const prices = [29, 49, 99, 149, 299]

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl font-bold">
        $<SlidingNumber value={price} />
        <span className="text-lg text-muted-foreground">/mo</span>
      </div>
      <div className="flex gap-2">
        {prices.map((p) => (
          <Button
            key={p}
            variant={price === p ? "default" : "outline"}
            size="sm"
            onClick={() => setPrice(p)}
          >
            ${p}
          </Button>
        ))}
      </div>
    </div>
  )
}

export function SlidingNumberStatsDemo() {
  const [stats, setStats] = React.useState({
    users: 12847,
    downloads: 98432,
    stars: 4521,
  })

  const refresh = () => {
    setStats({
      users: stats.users + Math.floor(Math.random() * 100),
      downloads: stats.downloads + Math.floor(Math.random() * 500),
      stars: stats.stars + Math.floor(Math.random() * 50),
    })
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-2xl font-bold">
            <SlidingNumber value={stats.users} />
          </div>
          <div className="text-sm text-muted-foreground">Users</div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            <SlidingNumber value={stats.downloads} />
          </div>
          <div className="text-sm text-muted-foreground">Downloads</div>
        </div>
        <div>
          <div className="text-2xl font-bold">
            <SlidingNumber value={stats.stars} />
          </div>
          <div className="text-sm text-muted-foreground">Stars</div>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={refresh}>
        Refresh Stats
      </Button>
    </div>
  )
}
