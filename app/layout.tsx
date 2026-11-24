import "./globals.css"

// <html> и <body> рендерят app/[locale]/layout.tsx (сайт) и app/blocks/layout.tsx (превью блоков)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
