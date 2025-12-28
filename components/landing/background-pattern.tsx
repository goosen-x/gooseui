export function BackgroundPattern() {
  return (
    <div
      className="absolute inset-0 z-0 opacity-50"
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        maskImage: `radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)`,
      }}
    />
  )
}
