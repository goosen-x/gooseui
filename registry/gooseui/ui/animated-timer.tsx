import { useId } from "react"
import { cn } from "@/lib/utils"
import { AnimatedTimerTicker } from "@/registry/gooseui/ui/animated-timer.client"

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// The ticker only writes data-v="0..9" on every slot; CSS moves the strip
// and enlarges the current digit, so React never re-renders on a tick
const css = `[data-gooseui-animated-timer] [data-strip]{transition:translate .2s ease-out}
[data-gooseui-animated-timer] [data-digit]>span{font-size:var(--timer-small);opacity:.05;transition:font-size .3s,opacity .3s}
[data-gooseui-animated-timer]:not([data-ready]) [data-v]>[data-strip]>[data-digit="0"]>span{font-size:var(--timer-big);opacity:.2}
${DIGITS.map(
  (d) =>
    `[data-gooseui-animated-timer][data-ready] [data-v="${d}"]>[data-strip]{translate:0 -${d * 10}%}
[data-gooseui-animated-timer][data-ready] [data-v="${d}"]>[data-strip]>[data-digit="${d}"]>span{font-size:var(--timer-big);opacity:1}`,
).join("\n")}
@media (prefers-reduced-motion:reduce){[data-gooseui-animated-timer] [data-strip],[data-gooseui-animated-timer] [data-digit]>span{transition:none}}`

const ROW = "h-[60px] md:h-[100px] lg:h-[150px]"

interface AnimatedTimerProps {
  className?: string
  showSeconds?: boolean
  use24Hour?: boolean
}

export function AnimatedTimer({
  className,
  showSeconds = true,
  use24Hour = true,
}: AnimatedTimerProps) {
  const id = useId()
  const pattern = showSeconds ? "00:00:00" : "00:00"

  return (
    <div
      id={id}
      data-gooseui-animated-timer=""
      className={cn(
        "rounded-xl md:rounded-2xl lg:rounded-[22px] bg-gradient-to-br from-blue-600 to-red-500 p-1",
        "[--timer-big:2.25rem] [--timer-small:1.5rem] md:[--timer-big:3.75rem] md:[--timer-small:1.875rem] lg:[--timer-big:6rem] lg:[--timer-small:2.25rem]",
        className,
      )}
    >
      <style href="gooseui-animated-timer" precedence="default">
        {css}
      </style>
      <span className="sr-only" data-text="" />
      <div
        aria-hidden="true"
        className="flex items-center bg-zinc-900 rounded-lg md:rounded-xl lg:rounded-[20px] px-3 md:px-4 lg:px-5"
      >
        {pattern.split("").map((char, index) =>
          char === ":" ? (
            <div
              key={index}
              className={cn(
                "flex items-center justify-center w-5 md:w-10 lg:w-12",
                ROW,
              )}
            >
              <span className="text-white text-4xl md:text-6xl lg:text-8xl">
                :
              </span>
            </div>
          ) : (
            <div
              key={index}
              data-v=""
              className={cn(
                "relative overflow-hidden w-[30px] md:w-[50px] lg:w-[80px]",
                ROW,
              )}
            >
              <div data-strip="" className="flex flex-col w-full">
                {DIGITS.map((digit) => (
                  <div
                    key={digit}
                    data-digit={digit}
                    className={cn(
                      "flex shrink-0 items-center justify-center w-full",
                      ROW,
                    )}
                  >
                    <span className="text-white">{digit}</span>
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
      <AnimatedTimerTicker
        targetId={id}
        showSeconds={showSeconds}
        use24Hour={use24Hour}
      />
    </div>
  )
}
