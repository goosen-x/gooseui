import { Play } from "lucide-react"

export default function CardPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute top-4 left-6 h-[58px] w-[92px] overflow-hidden rounded-md border shadow-sm">
        <img
          src="/demo/video-dialog/waves.webp"
          alt=""
          className="h-full w-full object-cover opacity-70"
        />
      </div>
      <div className="absolute right-5 bottom-4 flex h-[78px] w-[138px] items-center justify-center overflow-hidden rounded-lg border bg-background shadow-lg">
        <img
          src="/demo/video-dialog/waves.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="relative flex size-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow">
          <Play className="ml-0.5 size-3.5 fill-current" />
        </span>
      </div>
    </div>
  )
}
