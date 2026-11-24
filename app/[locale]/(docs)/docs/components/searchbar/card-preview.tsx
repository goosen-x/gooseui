const options = ["Barcelona", "Berlin", "Bern"]

export default function CardPreview() {
  return (
    <div className="flex size-full items-center justify-center p-3">
      <div className="w-[190px]">
        <div className="relative flex h-8 items-center rounded-md border bg-background px-2 text-xs shadow-xs ring-[3px] ring-ring/30">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mr-1.5 size-3 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <span>Ber</span>
          <span className="ml-px h-3.5 w-px bg-foreground" />
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="ml-auto size-3 text-muted-foreground motion-safe:animate-spin"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 12a9 9 0 1 1-6.22-8.56" />
          </svg>
        </div>
        <div className="mt-1 rounded-md border bg-popover p-1 shadow-md">
          {options.map((option, index) => (
            <div
              key={option}
              className={
                index === 1
                  ? "rounded-sm bg-accent px-2 py-1 text-[11px] text-accent-foreground"
                  : "px-2 py-1 text-[11px] text-muted-foreground"
              }
            >
              <span className="font-medium text-foreground">
                {option.slice(0, 3)}
              </span>
              {option.slice(3)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
