"use client"

import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: string
  speed?: number
  enableShadows?: boolean
  className?: string
}

export function GlitchText({
  children,
  speed = 1,
  enableShadows = true,
  className,
}: GlitchTextProps) {
  const beforeDuration = 2 / speed
  const afterDuration = 3 / speed

  return (
    <span
      className={cn(
        "glitch-wrapper relative inline-block select-none",
        className
      )}
      data-text={children}
      style={
        {
          "--before-duration": `${beforeDuration}s`,
          "--after-duration": `${afterDuration}s`,
          "--before-shadow": enableShadows ? "5px 0 cyan" : "none",
          "--after-shadow": enableShadows ? "-5px 0 red" : "none",
        } as React.CSSProperties
      }
    >
      {children}
      <style>{`
        .glitch-wrapper {
          position: relative;
        }

        .glitch-wrapper::before,
        .glitch-wrapper::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background: hsl(var(--background));
          overflow: hidden;
          clip-path: inset(0 0 0 0);
        }

        .glitch-wrapper::before {
          left: -10px;
          text-shadow: var(--before-shadow);
          animation: glitch-before var(--before-duration) infinite linear alternate-reverse;
        }

        .glitch-wrapper::after {
          left: 10px;
          text-shadow: var(--after-shadow);
          animation: glitch-after var(--after-duration) infinite linear alternate-reverse;
        }

        @keyframes glitch-before {
          0% { clip-path: inset(36% 0 22% 0); }
          5% { clip-path: inset(92% 0 6% 0); }
          10% { clip-path: inset(18% 0 70% 0); }
          15% { clip-path: inset(50% 0 38% 0); }
          20% { clip-path: inset(4% 0 88% 0); }
          25% { clip-path: inset(75% 0 12% 0); }
          30% { clip-path: inset(28% 0 58% 0); }
          35% { clip-path: inset(82% 0 8% 0); }
          40% { clip-path: inset(10% 0 78% 0); }
          45% { clip-path: inset(64% 0 24% 0); }
          50% { clip-path: inset(42% 0 44% 0); }
          55% { clip-path: inset(88% 0 2% 0); }
          60% { clip-path: inset(15% 0 72% 0); }
          65% { clip-path: inset(55% 0 30% 0); }
          70% { clip-path: inset(8% 0 85% 0); }
          75% { clip-path: inset(70% 0 18% 0); }
          80% { clip-path: inset(25% 0 62% 0); }
          85% { clip-path: inset(95% 0 3% 0); }
          90% { clip-path: inset(45% 0 40% 0); }
          95% { clip-path: inset(12% 0 80% 0); }
          100% { clip-path: inset(60% 0 28% 0); }
        }

        @keyframes glitch-after {
          0% { clip-path: inset(78% 0 12% 0); }
          5% { clip-path: inset(14% 0 74% 0); }
          10% { clip-path: inset(56% 0 32% 0); }
          15% { clip-path: inset(8% 0 84% 0); }
          20% { clip-path: inset(68% 0 20% 0); }
          25% { clip-path: inset(26% 0 62% 0); }
          30% { clip-path: inset(90% 0 4% 0); }
          35% { clip-path: inset(38% 0 48% 0); }
          40% { clip-path: inset(72% 0 18% 0); }
          45% { clip-path: inset(16% 0 70% 0); }
          50% { clip-path: inset(54% 0 34% 0); }
          55% { clip-path: inset(5% 0 90% 0); }
          60% { clip-path: inset(82% 0 10% 0); }
          65% { clip-path: inset(30% 0 58% 0); }
          70% { clip-path: inset(65% 0 25% 0); }
          75% { clip-path: inset(18% 0 75% 0); }
          80% { clip-path: inset(48% 0 42% 0); }
          85% { clip-path: inset(85% 0 8% 0); }
          90% { clip-path: inset(22% 0 68% 0); }
          95% { clip-path: inset(62% 0 28% 0); }
          100% { clip-path: inset(40% 0 50% 0); }
        }
      `}</style>
    </span>
  )
}
