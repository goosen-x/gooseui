import { notFound } from "next/navigation"
import { BLOCKS_ENABLED } from "@/lib/config/features"

export default function BlocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!BLOCKS_ENABLED) notFound()
  return children
}
