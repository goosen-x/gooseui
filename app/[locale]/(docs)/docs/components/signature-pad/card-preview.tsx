export default function CardPreview() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="relative h-[100px] w-[200px] rounded-lg border border-dashed bg-background text-foreground">
        <svg
          viewBox="0 0 200 100"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          <path
            d="M24 66c10-22 20-40 26-38 7 2-8 40-2 42 6 2 14-30 22-30s-2 26 4 26 10-18 16-18 2 16 8 16 12-22 20-22c6 0-6 22 2 22 10 0 26-14 40-18"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute inset-x-4 bottom-5 border-b border-border" />
      </div>
    </div>
  )
}
