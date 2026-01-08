"use client"

import * as React from "react"
import { customToast } from "@/lib/toast"
import { cn } from "@/lib/utils"

interface AnimatedCopyButtonProps {
  text: string
  className?: string
  onCopy?: () => void
}

export function AnimatedCopyButton({
  text,
  className,
  onCopy,
}: AnimatedCopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopy?.()
      customToast.success("Copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      onCopy?.()
      customToast.success("Copied to clipboard")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex size-7 cursor-pointer items-center justify-center rounded-md",
        "opacity-70 transition-opacity hover:opacity-100 hover:bg-accent",
        className,
      )}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4 overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Copy icon - front rectangle */}
        <rect
          x="9"
          y="9"
          width="13"
          height="13"
          rx="2"
          ry="2"
          className={cn(
            "transition-all duration-300 ease-out origin-center",
            copied && "opacity-0 scale-50",
          )}
        />
        {/* Copy icon - back rectangle */}
        <path
          d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
          className={cn(
            "transition-all duration-300 ease-out origin-center",
            copied && "opacity-0 scale-50",
          )}
        />

        {/* Check icon - animated stroke */}
        <path
          d="M6 12 L10 16 L18 8"
          className={cn(
            "stroke-green-500 transition-all duration-300 ease-out",
            "[stroke-dasharray:24] [stroke-dashoffset:24]",
            copied && "[stroke-dashoffset:0]",
          )}
        />
      </svg>
    </button>
  )
}
