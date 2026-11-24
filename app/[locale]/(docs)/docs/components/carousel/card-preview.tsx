const names = ["clouds", "firs", "boat", "mist", "hills"]

export default function CardPreview() {
  return (
    <div className="flex w-[180px] flex-col gap-1.5">
      <div className="relative h-[86px] overflow-hidden rounded-md bg-muted">
        <img
          src="/demo/carousel/boat.webp"
          alt=""
          draggable={false}
          className="size-full object-cover"
        />
        <span className="absolute right-1 bottom-1 rounded-full bg-background/80 px-1.5 text-[9px] font-medium tabular-nums">
          3 / 5
        </span>
      </div>
      <div className="flex gap-1">
        {names.map((name) => (
          <div
            key={name}
            className={
              name === "boat"
                ? "h-6 flex-1 overflow-hidden rounded-sm border-2 border-primary"
                : "h-6 flex-1 overflow-hidden rounded-sm border-2 border-transparent opacity-60"
            }
          >
            <img
              src={`/demo/carousel/${name}-thumb.webp`}
              alt=""
              draggable={false}
              className="size-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
