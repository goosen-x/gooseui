"use client"

import { useEffect, useState } from "react"

const words = ["Words", "appear", "as", "you", "scroll"]

export default function CardPreview() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = window.setInterval(
      () => setStep((s) => (s + 1) % (words.length + 3)),
      450,
    )
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <p className="text-center text-xl leading-tight font-semibold tracking-tight">
        {words.map((word, i) => (
          <span
            key={word}
            className="inline-block transition-[opacity,filter] duration-500 motion-reduce:transition-none"
            style={{
              opacity: i < step ? 1 : 0.15,
              filter: i < step ? "blur(0px)" : "blur(4px)",
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </div>
  )
}
