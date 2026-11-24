const STYLES = `
@keyframes gooseui-hss-card { 0%, 12% { transform: translateY(0) } 88%, 100% { transform: translateY(calc(-100% + 112px)) } }
.gooseui-hss-card { animation: gooseui-hss-card 7s ease-in-out infinite alternate }
@media (prefers-reduced-motion: reduce) { .gooseui-hss-card { animation: none } }
`

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <style href="gooseui-hss-card" precedence="default">
        {STYLES}
      </style>
      <div className="relative h-[112px] w-[150px] overflow-hidden rounded-md border bg-background shadow-sm">
        <img
          src="/demo/hover-scroll-screenshot/landing.svg"
          alt=""
          className="gooseui-hss-card block h-auto w-full"
        />
      </div>
    </div>
  )
}
