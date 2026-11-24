import type * as React from "react"
import { cn } from "@/lib/utils"
import {
  PromptInputAttachButton,
  PromptInputAttachments,
  PromptInputCounter,
  PromptInputForm,
  type PromptInputProps,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/registry/gooseui/ui/prompt-input.client"

/**
 * Chat composer. Without children it renders the default layout: attachments,
 * textarea, and a toolbar with the attach button, counter and send button.
 * Pass your own parts as children to change the layout.
 */
function PromptInput({ children, ...props }: PromptInputProps) {
  return (
    <PromptInputForm {...props}>
      {children ?? (
        <>
          <PromptInputAttachments />
          <PromptInputTextarea />
          <PromptInputToolbar>
            <PromptInputAttachButton />
            <PromptInputCounter className="ml-auto" />
            <PromptInputSubmit
              className={props.maxLength === undefined ? "ml-auto" : undefined}
            />
          </PromptInputToolbar>
        </>
      )}
    </PromptInputForm>
  )
}

/** Row under the textarea for the attach button, your own controls, the counter and send */
function PromptInputToolbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="prompt-input-toolbar"
      className={cn("flex items-center gap-1 p-2", className)}
      {...props}
    />
  )
}

export {
  PromptInput,
  PromptInputAttachButton,
  PromptInputAttachments,
  PromptInputCounter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
}
export {
  type PromptInputLabels,
  type PromptInputMessage,
  type PromptInputProps,
  type PromptInputStatus,
  usePromptInput,
} from "@/registry/gooseui/ui/prompt-input.client"
