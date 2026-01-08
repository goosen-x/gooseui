import { notFound } from "next/navigation"
import {
  blocksMetadata,
  getBlockById,
  getBlockComponent,
  hasBlockComponent,
} from "@/lib/blocks"

interface PreviewPageProps {
  params: Promise<{ blockId: string }>
}

export async function generateStaticParams() {
  return blocksMetadata
    .filter((block) => !block.isComingSoon)
    .map((block) => ({ blockId: block.id }))
}

export async function generateMetadata({ params }: PreviewPageProps) {
  const { blockId } = await params
  const block = getBlockById(blockId)

  if (!block) {
    return { title: "Block Not Found" }
  }

  return {
    title: `${block.name} - GooseUI Blocks`,
    description: block.description,
    robots: { index: false },
  }
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { blockId } = await params
  const block = getBlockById(blockId)

  if (!block || !hasBlockComponent(blockId)) {
    notFound()
  }

  const BlockComponent = getBlockComponent(blockId)

  if (!BlockComponent) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <BlockComponent />
    </div>
  )
}
