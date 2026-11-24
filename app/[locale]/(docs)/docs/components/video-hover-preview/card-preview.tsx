const POSTERS = [
  "/demo/video-hover-preview/louise-brosnan.webp",
  "/demo/video-hover-preview/toni-aarniviita.webp",
  "/demo/video-hover-preview/arto-huhtala.webp",
]

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 px-3">
      {POSTERS.map((poster, index) => (
        <div
          key={poster}
          className={
            index === 1
              ? "relative flex h-[96px] w-[64px] scale-110 items-center justify-center overflow-hidden rounded-md border shadow-md"
              : "relative flex h-[96px] w-[64px] items-center justify-center overflow-hidden rounded-md border opacity-70"
          }
        >
          <img
            src={poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          {index === 1 ? (
            <span className="absolute inset-x-1 bottom-2 rounded bg-black/70 px-1 py-0.5 text-center text-[7px] text-white leading-tight">
              Less waste
            </span>
          ) : null}
          {index === 1 ? (
            <span className="relative flex size-6 items-center justify-center rounded-full bg-background/90 text-foreground">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="ml-px size-3"
                fill="currentColor"
              >
                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
              </svg>
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}
