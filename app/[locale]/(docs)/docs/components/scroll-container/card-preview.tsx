import { ScrollContainer } from "@/registry/gooseui/ui/scroll-container"

const rows = ["Anna", "Max", "Olga", "Ivan", "Nina", "Oleg", "Vera", "Egor"]

export default function CardPreview() {
  return (
    <ScrollContainer
      height="7rem"
      variant="primary"
      className="w-48 rounded-lg border bg-background"
    >
      <ul className="divide-y text-sm">
        {rows.map((name) => (
          <li key={name} className="px-3 py-1.5">
            {name}
          </li>
        ))}
      </ul>
    </ScrollContainer>
  )
}
