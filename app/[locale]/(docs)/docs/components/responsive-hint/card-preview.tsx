export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="max-w-[170px] rounded-lg border bg-card px-3 py-2 text-[10px] leading-snug text-card-foreground shadow-md">
          <p className="font-medium">Shipping</p>
          <p className="text-muted-foreground">Free for orders over 50</p>
        </div>
        <svg
          width="12"
          height="6"
          viewBox="0 0 12 6"
          className="-mt-px fill-card"
          aria-hidden
        >
          <path d="M0 0h12L6 6z" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="mt-1 size-4 text-foreground"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
        </svg>
      </div>
    </div>
  )
}
