"use client"

import { useCopyToast } from "@/hooks/use-copy-toast"
import {
  InstallCommand as RegistryInstallCommand,
  type InstallCommandProps as RegistryProps,
} from "@/registry/gooseui/ui/install-command"

type InstallCommandProps = Pick<
  RegistryProps,
  "packageName" | "commands" | "defaultPm" | "className"
>

/**
 * Site wrapper around the registry InstallCommand: adds the copy toast,
 * localized labels and the shared manager choice for every block on the site.
 */
export function InstallCommand(props: InstallCommandProps) {
  const toast = useCopyToast()()
  return (
    <RegistryInstallCommand
      storageKey="gooseui-package-manager"
      labels={toast.labels}
      onCopy={toast.onCopy}
      onCopyError={toast.onCopyError}
      {...props}
    />
  )
}
