"use client"

import { Button } from "@/components/ui/button"
import { customToast } from "@/lib/toast"

interface ToastDemoProps {
  labels: {
    showSuccess: string
    showError: string
    showWarning: string
    showInfo: string
    successMessage: string
    errorMessage: string
    warningMessage: string
    infoMessage: string
  }
}

export function ToastDemo({ labels }: ToastDemoProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-950"
        onClick={() =>
          customToast.success(labels.successMessage, {
            description: "Your changes have been saved",
          })
        }
      >
        {labels.showSuccess}
      </Button>
      <Button
        variant="outline"
        className="border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
        onClick={() =>
          customToast.error(labels.errorMessage, {
            description: "Please try again later",
          })
        }
      >
        {labels.showError}
      </Button>
      <Button
        variant="outline"
        className="border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
        onClick={() =>
          customToast.warning(labels.warningMessage, {
            description: "Some fields are missing",
          })
        }
      >
        {labels.showWarning}
      </Button>
      <Button
        variant="outline"
        className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
        onClick={() =>
          customToast.info(labels.infoMessage, {
            description: "Click to update",
          })
        }
      >
        {labels.showInfo}
      </Button>
    </div>
  )
}
