import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "GooseUI - Open source component library"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            style={{ filter: "invert(1)" }}
          >
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            marginBottom: 20,
            letterSpacing: "-0.02em",
          }}
        >
          GooseUI
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Open source component library for building modern web applications
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
