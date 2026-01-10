"use client"

import { Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { AnimatedCopyButton } from "@/components/docs/animated-copy-button"
import { customToast } from "@/lib/toast"
import { cn } from "@/lib/utils"
import { BorderBeam } from "@/registry/new-york/effects/border-beam"
import { Button } from "@/registry/new-york/ui/button"
import { Checkbox } from "@/registry/new-york/ui/checkbox"
import { Input } from "@/registry/new-york/ui/input"
import { SlidingNumber } from "@/registry/new-york/ui/sliding-number"
import { ThemeCustomizerPill } from "@/registry/new-york/ui/theme-customizer"

const cliCommand = "npx shadcn@latest add https://gooseui.pro/r/button.json"

export function Hero() {
  const [counter, setCounter] = useState(1337)
  const [inputValue, setInputValue] = useState("")
  const [inputError, setInputError] = useState(false)

  const incrementCounter = () => {
    const increment = Math.floor(Math.random() * 10) + 1
    setCounter((prev) => prev + increment)
    customToast.info(`+${increment}`, {
      description: "Counter incremented",
    })
  }

  return (
    <div className="relative min-h-[calc(100svh-3.5rem)] flex items-center">
      {/* Dot background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient fade */}
      <div className="pointer-events-none absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div className="relative z-10 py-8 sm:py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 items-center lg:items-start w-full">
          {/* Left side - Text content */}
          <div className="flex-1">
            <div className="inline-flex items-center rounded-full border px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium mb-4 sm:mb-6 backdrop-blur-[1px] bg-background/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="size-4 mr-2"
              >
                <rect width="256" height="256" fill="none" />
                <line
                  x1="208"
                  y1="128"
                  x2="128"
                  y2="208"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
                <line
                  x1="192"
                  y1="40"
                  x2="40"
                  y2="192"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>
              <span>Custom shadcn/ui Registry</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-bold tracking-tight text-balance">
              Build Modern Interfaces Faster
            </h1>

            <p className="mt-3 sm:mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-muted-foreground text-balance max-w-xl">
              A collection of beautiful components and effects for React. Copy
              the code, customize it, ship to production.
            </p>

            <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button squircle size="default" className="sm:h-11 sm:px-8" asChild>
                <Link href="/docs">Get Started</Link>
              </Button>
              <Button
                squircle
                variant="outline"
                size="default"
                className="sm:h-11 sm:px-8 backdrop-blur-[2px] bg-background/20 hover:bg-background/20 hover:backdrop-blur-md transition-all"
                asChild
              >
                <Link href="/docs/components">Components</Link>
              </Button>
            </div>

            {/* Tech stack */}
            <div className="mt-10 hidden items-center gap-4 text-xs font-medium uppercase tracking-widest text-muted-foreground sm:flex">
              <span className="group flex items-center gap-1.5 transition-colors hover:text-foreground">
                <svg
                  aria-hidden="true"
                  className="h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.001 13.5001C11.1725 13.5001 10.501 12.8285 10.501 12.0001C10.501 11.1716 11.1725 10.5001 12.001 10.5001C12.8294 10.5001 13.501 11.1716 13.501 12.0001C13.501 12.8285 12.8294 13.5001 12.001 13.5001ZM11.4733 16.4945C11.6479 16.705 11.8239 16.908 12.001 17.103C12.178 16.908 12.3541 16.705 12.5286 16.4945C12.3538 16.4982 12.1779 16.5001 12.001 16.5001C11.824 16.5001 11.6481 16.4982 11.4733 16.4945ZM9.47837 16.3694C8.6762 16.2846 7.91035 16.1603 7.19268 16.0016C7.11832 16.3512 7.06134 16.6904 7.02243 17.0166C6.83358 18.6 7.09805 19.5617 7.50098 19.7943C7.9039 20.0269 8.86893 19.7751 10.1458 18.8199C10.4088 18.6231 10.6741 18.4042 10.9397 18.1649C10.4434 17.6228 9.95287 17.0217 9.47837 16.3694ZM16.8093 16.0016C16.0916 16.1603 15.3257 16.2846 14.5236 16.3694C14.0491 17.0217 13.5585 17.6228 13.0622 18.1649C13.3279 18.4042 13.5931 18.6231 13.8562 18.8199C15.133 19.7751 16.0981 20.0269 16.501 19.7943C16.9039 19.5617 17.1684 18.6 16.9795 17.0166C16.9406 16.6904 16.8836 16.3512 16.8093 16.0016ZM18.2598 15.6136C18.8364 18.2526 18.5328 20.3533 17.251 21.0933C15.9691 21.8334 13.9981 21.046 12.001 19.2271C10.0038 21.046 8.03282 21.8334 6.75098 21.0933C5.46913 20.3533 5.16555 18.2526 5.74217 15.6136C3.16842 14.7935 1.50098 13.4802 1.50098 12.0001C1.50098 10.5199 3.16842 9.20668 5.74217 8.38654C5.16555 5.74754 5.46913 3.64687 6.75098 2.9068C8.03282 2.16673 10.0038 2.95415 12.001 4.77302C13.9981 2.95415 15.9691 2.16673 17.251 2.9068C18.5328 3.64687 18.8364 5.74754 18.2598 8.38654C20.8335 9.20668 22.501 10.5199 22.501 12.0001C22.501 13.4802 20.8335 14.7935 18.2598 15.6136ZM10.9397 5.83521C10.6741 5.59597 10.4088 5.37703 10.1458 5.18024C8.86893 4.22499 7.9039 3.97321 7.50098 4.20584C7.09805 4.43847 6.83358 5.4001 7.02243 6.9835C7.06134 7.30969 7.11832 7.6489 7.19268 7.99857C7.91035 7.83985 8.6762 7.71556 9.47837 7.63078C9.95287 6.97848 10.4434 6.37737 10.9397 5.83521ZM14.5236 7.63078C15.3257 7.71556 16.0916 7.83985 16.8093 7.99857C16.8836 7.6489 16.9406 7.30969 16.9795 6.9835C17.1684 5.4001 16.9039 4.43847 16.501 4.20584C16.0981 3.97321 15.133 4.22499 13.8562 5.18024C13.5931 5.37703 13.3279 5.59597 13.0622 5.83521C13.5585 6.37737 14.0491 6.97848 14.5236 7.63078ZM12.5286 7.50565C12.3541 7.29515 12.178 7.09211 12.001 6.89711C11.8239 7.09211 11.6479 7.29515 11.4733 7.50565C11.6481 7.50194 11.824 7.50007 12.001 7.50007C12.1779 7.50007 12.3538 7.50194 12.5286 7.50565ZM8.37252 14.7042C8.28191 14.5547 8.19233 14.4033 8.10386 14.2501C8.01539 14.0968 7.92906 13.9435 7.84488 13.7903C7.74985 14.0467 7.66205 14.3007 7.58169 14.5515C7.83908 14.6074 8.10295 14.6583 8.37252 14.7042ZM10.3049 14.9377C10.8579 14.9788 11.4251 15.0001 12.001 15.0001C12.5769 15.0001 13.144 14.9788 13.697 14.9377C14.0091 14.4793 14.3111 13.9988 14.5991 13.5001C14.887 13.0013 15.1522 12.4995 15.393 12.0001C15.1522 11.5006 14.887 10.9988 14.5991 10.5001C14.3111 10.0013 14.0091 9.52081 13.697 9.06246C13.144 9.02133 12.5769 9.00007 12.001 9.00007C11.4251 9.00007 10.8579 9.02133 10.3049 9.06246C9.99283 9.52081 9.69086 10.0013 9.4029 10.5001C9.11494 10.9988 8.8498 11.5006 8.60892 12.0001C8.8498 12.4995 9.11494 13.0013 9.4029 13.5001C9.69086 13.9988 9.99283 14.4793 10.3049 14.9377ZM16.1571 10.2098C16.2521 9.9534 16.3399 9.6994 16.4203 9.44859C16.1629 9.39278 15.899 9.34182 15.6294 9.29591C15.72 9.44543 15.8096 9.59683 15.8981 9.75007C15.9866 9.9033 16.0729 10.0566 16.1571 10.2098ZM6.13143 9.83671C5.79142 9.94714 5.46917 10.0674 5.16723 10.1968C3.70154 10.825 3.00098 11.5348 3.00098 12.0001C3.00098 12.4653 3.70154 13.1752 5.16723 13.8033C5.46917 13.9327 5.79142 14.053 6.13143 14.1634C6.35281 13.4625 6.6281 12.7371 6.95576 12.0001C6.6281 11.263 6.35281 10.5376 6.13143 9.83671ZM7.58169 9.44859C7.66205 9.6994 7.74985 9.9534 7.84488 10.2098C7.92906 10.0566 8.01539 9.9033 8.10386 9.75007C8.19233 9.59683 8.28191 9.44543 8.37252 9.29591C8.10295 9.34182 7.83908 9.39278 7.58169 9.44859ZM17.8705 14.1634C18.2105 14.053 18.5328 13.9327 18.8347 13.8033C20.3004 13.1752 21.001 12.4653 21.001 12.0001C21.001 11.5348 20.3004 10.825 18.8347 10.1968C18.5328 10.0674 18.2105 9.94714 17.8705 9.83671C17.6491 10.5376 17.3739 11.263 17.0462 12.0001C17.3739 12.7371 17.6491 13.4625 17.8705 14.1634ZM16.4203 14.5515C16.3399 14.3007 16.2521 14.0467 16.1571 13.7903C16.0729 13.9435 15.9866 14.0968 15.8981 14.2501C15.8096 14.4033 15.72 14.5547 15.6294 14.7042C15.899 14.6583 16.1629 14.6074 16.4203 14.5515Z" />
                </svg>
                <span>React</span>
              </span>
              <span className="group flex items-center gap-1.5 transition-colors hover:text-foreground">
                <svg
                  aria-hidden="true"
                  className="h-4"
                  fill="currentColor"
                  viewBox="0 0 133 80"
                >
                  <path d="M66.5 0C48.7668 0 37.6832 8.86684 33.25 26.6C39.9 17.7332 47.6582 14.4082 56.525 16.625C61.5837 17.8895 65.1996 21.56 69.2021 25.6222C75.7222 32.2406 83.2679 39.9 99.75 39.9C117.483 39.9 128.567 31.0332 133 13.3C126.35 22.1668 118.592 25.4918 109.725 23.275C104.666 22.0105 101.05 18.34 97.0479 14.2778C90.5278 7.65945 82.9821 0 66.5 0ZM33.25 39.9C15.5168 39.9 4.43316 48.7668 0 66.5C6.65 57.6332 14.4082 54.3082 23.275 56.525C28.3337 57.7895 31.9496 61.46 35.9521 65.5222C42.4722 72.1405 50.0179 79.8 66.5 79.8C84.2332 79.8 95.3168 70.9332 99.75 53.2C93.1 62.0668 85.3418 65.3918 76.475 63.175C71.4163 61.9105 67.8004 58.24 63.7979 54.1778C57.2778 47.5594 49.7321 39.9 33.25 39.9Z" />
                </svg>
                <span>Tailwind CSS</span>
              </span>
              <span className="group flex items-center gap-1.5 transition-colors hover:text-foreground">
                <svg
                  aria-hidden="true"
                  className="h-3.5"
                  fill="currentColor"
                  viewBox="0 0 1103 386"
                >
                  <path d="M416.473 0 198.54 385.66H0L170.17 84.522C196.549 37.842 262.377 0 317.203 0Zm486.875 96.415c0-53.249 44.444-96.415 99.27-96.415 54.826 0 99.27 43.166 99.27 96.415 0 53.248-44.444 96.415-99.27 96.415-54.826 0-99.27-43.167-99.27-96.415ZM453.699 0h198.54L434.306 385.66h-198.54Zm234.492 0h198.542L716.56 301.138c-26.378 46.68-92.207 84.522-147.032 84.522h-99.27Z" />
                </svg>
                <span>Motion</span>
              </span>
              <span className="group flex items-center gap-1.5 transition-colors hover:text-foreground">
                <svg
                  aria-hidden="true"
                  className="h-4"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M0 0h256v256H0z" fill="none" />
                  <path
                    d="M208 128l-80 80M192 40L40 192"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="25"
                  />
                </svg>
                <span>shadcn/ui</span>
              </span>
            </div>
          </div>

          {/* Right side - Grid preview */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none">
            <div className="grid grid-cols-2 gap-3 grid-flow-dense">
              {/* Buttons Card - Spans 2 columns */}
              <div
                className="group relative col-span-2 overflow-hidden border border-border/50 border-dashed p-2 transition-all hover:border-border"
                style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
              >
                <div
                  className="border bg-background overflow-hidden"
                  style={{ cornerShape: "squircle", borderRadius: "1rem" } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
                    <code className="text-xs text-muted-foreground">
                      {cliCommand}
                    </code>
                    <AnimatedCopyButton text={cliCommand} />
                  </div>
                  <div className="p-3 sm:p-6 md:p-8 grid grid-cols-2 sm:flex items-center justify-center gap-2 sm:gap-4">
                    <Button
                      squircle
                      size="sm"
                      className="sm:h-9 sm:px-4 text-xs sm:text-sm"
                      onClick={() =>
                        customToast.success("Primary Button", {
                          description: "Default button style",
                        })
                      }
                    >
                      Primary
                    </Button>
                    <Button
                      squircle
                      variant="secondary"
                      size="sm"
                      className="sm:h-9 sm:px-4 text-xs sm:text-sm"
                      onClick={() =>
                        customToast.info("Secondary Button", {
                          description: "Secondary button style",
                        })
                      }
                    >
                      Secondary
                    </Button>
                    <Button
                      squircle
                      variant="outline"
                      size="sm"
                      className="sm:h-9 sm:px-4 text-xs sm:text-sm backdrop-blur-[2px] bg-background/20 hover:bg-background/40"
                      onClick={() =>
                        customToast.warning("Outline Button", {
                          description: "Outline button style",
                        })
                      }
                    >
                      Outline
                    </Button>
                    <Button
                      squircle
                      variant="ghost"
                      size="sm"
                      className="sm:h-9 sm:px-4 text-xs sm:text-sm"
                      onClick={() =>
                        customToast.error("Ghost Button", {
                          description: "Ghost button style",
                        })
                      }
                    >
                      Ghost
                    </Button>
                  </div>
                </div>
                <BorderBeam
                  duration={8}
                  colorFrom="#10b981"
                  colorTo="#3b82f6"
                  squircle
                />
              </div>

              {/* Input Card - hidden on mobile */}
              <div
                className="hidden sm:block group border border-border/50 border-dashed p-2 transition-all hover:border-border"
                style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
              >
                <div
                  className="h-full border bg-background overflow-hidden flex flex-col"
                  style={{ cornerShape: "squircle", borderRadius: "1rem" } as React.CSSProperties}
                >
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                    <code className="text-xs text-muted-foreground">
                      input.tsx
                    </code>
                  </div>
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <div className="flex gap-2 w-full">
                      <Input
                        placeholder="Type here..."
                        className={cn(
                          "h-8 text-sm",
                          inputError && "border-red-500 ring-2 ring-red-500/30",
                        )}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <Button
                        squircle
                        size="sm"
                        className="h-8 px-3"
                        onClick={() => {
                          if (inputValue.trim()) {
                            customToast.success("Message sent!", {
                              description: inputValue,
                            })
                            setInputValue("")
                          } else {
                            setInputError(true)
                            setTimeout(() => setInputError(false), 500)
                          }
                        }}
                      >
                        <Send className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Customizer Card */}
              <div
                className="group border border-border/50 border-dashed p-2 transition-all hover:border-border"
                style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
              >
                <div
                  className="h-full border bg-background flex flex-col"
                  style={{ cornerShape: "squircle", borderRadius: "1rem" } as React.CSSProperties}
                >
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                    <code className="text-xs text-muted-foreground">
                      theme.tsx
                    </code>
                  </div>
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <ThemeCustomizerPill className="static left-auto translate-x-0 shadow-none" />
                  </div>
                </div>
              </div>

              {/* Sliding Number Card */}
              <div
                className="col-span-2 sm:col-span-1 group border border-border/50 border-dashed p-2 transition-all hover:border-border"
                style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
              >
                <div
                  className="h-full border bg-background overflow-hidden flex flex-col"
                  style={{ cornerShape: "squircle", borderRadius: "1rem" } as React.CSSProperties}
                >
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                    <code className="text-xs text-muted-foreground">
                      sliding-number.tsx
                    </code>
                  </div>
                  <button
                    onClick={incrementCounter}
                    className="p-4 flex-1 w-full flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-muted/30 transition-colors"
                  >
                    <span className="text-xs text-muted-foreground">
                      Click to increment
                    </span>
                    <SlidingNumber
                      value={counter}
                      className="text-2xl font-bold"
                    />
                  </button>
                </div>
              </div>

              {/* Checkbox Card */}
              <div
                className="group border border-border/50 border-dashed p-2 transition-all hover:border-border"
                style={{ cornerShape: "squircle", borderRadius: "1.5rem" } as React.CSSProperties}
              >
                <div
                  className="h-full border bg-background overflow-hidden flex flex-col"
                  style={{ cornerShape: "squircle", borderRadius: "1rem" } as React.CSSProperties}
                >
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                    <code className="text-xs text-muted-foreground">
                      checkbox.tsx
                    </code>
                  </div>
                  <div className="p-4 flex-1 flex items-center justify-center">
                    <Checkbox
                      label="Animated checkbox"
                      defaultChecked
                      onChange={(e) =>
                        e.target.checked
                          ? customToast.success("Checked!", {
                              description: "Checkbox state changed",
                            })
                          : customToast.error("Unchecked", {
                              description: "Checkbox state changed",
                            })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
