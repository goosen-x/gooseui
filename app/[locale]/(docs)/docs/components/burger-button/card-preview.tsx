import { BurgerButton } from "@/registry/gooseui/ui/burger-button"

export default function CardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4">
      <BurgerButton size="lg" />
      <BurgerButton size="lg" defaultOpen />
    </div>
  )
}
