import { toast } from "sonner"
import { CustomToast } from "@/components/ui/custom-toast"
import { createElement } from "react"

interface ToastOptions {
  description?: string
  duration?: number
}

export const customToast = {
  success: (message: string, options?: ToastOptions) => {
    toast.custom(
      (id) =>
        createElement(CustomToast, {
          id,
          type: "success",
          message,
          description: options?.description,
          duration: options?.duration,
        }),
      { duration: Infinity }
    )
  },

  error: (message: string, options?: ToastOptions) => {
    toast.custom(
      (id) =>
        createElement(CustomToast, {
          id,
          type: "error",
          message,
          description: options?.description,
          duration: options?.duration,
        }),
      { duration: Infinity }
    )
  },

  warning: (message: string, options?: ToastOptions) => {
    toast.custom(
      (id) =>
        createElement(CustomToast, {
          id,
          type: "warning",
          message,
          description: options?.description,
          duration: options?.duration,
        }),
      { duration: Infinity }
    )
  },

  info: (message: string, options?: ToastOptions) => {
    toast.custom(
      (id) =>
        createElement(CustomToast, {
          id,
          type: "info",
          message,
          description: options?.description,
          duration: options?.duration,
        }),
      { duration: Infinity }
    )
  },
}
