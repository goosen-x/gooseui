import { CompareSlider } from "@/registry/gooseui/ui/compare-slider"

function Scene({ muted }: { muted?: boolean }) {
  return (
    <div
      className={
        muted
          ? "relative h-full w-full bg-gradient-to-b from-zinc-400 to-zinc-200"
          : "relative h-full w-full bg-gradient-to-b from-sky-400 to-amber-200"
      }
    >
      <div
        className={
          muted
            ? "absolute top-4 right-8 size-7 rounded-full bg-zinc-100"
            : "absolute top-4 right-8 size-7 rounded-full bg-orange-400"
        }
      />
      <div
        className={
          muted
            ? "absolute inset-x-0 bottom-0 h-1/3 rounded-t-[50%] bg-zinc-600"
            : "absolute inset-x-0 bottom-0 h-1/3 rounded-t-[50%] bg-teal-700"
        }
      />
    </div>
  )
}

export default function CardPreview() {
  return (
    <div
      inert
      className="pointer-events-none flex h-full w-full items-center justify-center p-3"
    >
      <CompareSlider
        className="aspect-auto h-[116px] w-[200px] rounded-md"
        defaultPosition={45}
        before={<Scene muted />}
        after={<Scene />}
      />
    </div>
  )
}
