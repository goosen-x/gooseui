import { GenerateCustomizer } from "@/components/generate/generate-customizer"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="flex-1">{children}</main>
      <GenerateCustomizer />
    </div>
  )
}
