import { RotatingText } from "@/registry/gooseui/effects/rotating-text"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="text-xl font-semibold tracking-tight">
        Ship{" "}
        <RotatingText
          words={["faster", "better", "today"]}
          interval={1800}
          className="text-primary"
        />
      </p>
    </div>
  )
}
