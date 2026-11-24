import { Marquee } from "@/registry/gooseui/ui/marquee"

const shapes = [
  <circle key="c" cx="12" cy="12" r="9" />,
  <rect key="r" x="3" y="3" width="18" height="18" rx="4" />,
  <path key="t" d="M12 3 L21 20 H3 Z" />,
  <path key="d" d="M12 2 L22 12 L12 22 L2 12 Z" />,
  <path key="h" d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" />,
]

export default function CardPreview() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-3">
      {[false, true].map((reverse) => (
        <Marquee
          key={String(reverse)}
          reverse={reverse}
          duration={12}
          repeat={3}
          gap={20}
          fade={32}
        >
          {shapes.map((shape) => (
            <svg
              key={shape.key}
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="size-7 fill-muted-foreground/60"
            >
              {shape}
            </svg>
          ))}
        </Marquee>
      ))}
    </div>
  )
}
