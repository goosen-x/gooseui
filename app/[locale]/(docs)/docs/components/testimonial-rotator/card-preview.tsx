const people = [
  { name: "Lena Hart", src: "/demo/testimonial-rotator/lena-hart.webp" },
  { name: "Marco Silva", src: "/demo/testimonial-rotator/marco-silva.webp" },
  { name: "Priya Nair", src: "/demo/testimonial-rotator/priya-nair.webp" },
]

export default function CardPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-4">
      <p className="max-w-48 text-center text-[11px] leading-snug text-foreground">
        “The API does what the docs say, every single time.”
      </p>
      <div className="flex items-center gap-3">
        {people.map((p, i) => (
          <span key={p.name} className="relative size-8">
            <img
              src={p.src}
              alt={p.name}
              width={160}
              height={160}
              loading="lazy"
              decoding="async"
              className={`size-full rounded-full object-cover ${i === 1 ? "" : "opacity-50"}`}
            />
            {i === 1 && (
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                className="absolute -inset-1 size-10 -rotate-90"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray="100"
                  strokeDashoffset="35"
                />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
