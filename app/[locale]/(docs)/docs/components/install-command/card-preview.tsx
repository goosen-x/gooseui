import { InstallCommand } from "@/registry/gooseui/ui/install-command"

export default function CardPreview() {
  return (
    <div className="flex h-full items-center justify-center px-3">
      <InstallCommand
        packageName="@gooseui/button"
        className="w-full max-w-[230px] [&_code]:text-xs"
      />
    </div>
  )
}
