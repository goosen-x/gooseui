import { toast } from "@/registry/gooseui/ui/toast"

/**
 * Short calls for the demos: customToast.success("Saved", { description }).
 * Same toasts as `toast` from the registry, so one Toaster shows them all.
 */
export const customToast = {
  success: toast.success,
  error: toast.error,
  warning: toast.warning,
  info: toast.info,
}
