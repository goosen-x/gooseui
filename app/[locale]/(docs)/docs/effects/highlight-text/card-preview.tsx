import { HighlightText } from "@/registry/gooseui/effects/highlight-text"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 px-5 text-sm">
      <div className="flex h-7 items-center rounded-md border bg-background px-2 text-xs text-muted-foreground">
        tea
      </div>
      <p className="leading-snug">
        <HighlightText
          text="Green tea, mint tea and a cup of cocoa"
          query="tea"
          animate
        />
      </p>
    </div>
  )
}
