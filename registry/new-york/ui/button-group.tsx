import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const buttonGroupVariants = cva(
  [
    "flex w-fit items-stretch",
    // Focus handling
    "[&>*]:focus-visible:z-10 [&>*]:focus-visible:relative",
    // Select trigger width
    "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
    // Input flex
    "[&>input]:flex-1",
    // Nested groups gap
    "has-[>[data-slot=button-group]]:gap-2",
  ],
  {
    variants: {
      orientation: {
        horizontal: [
          // Remove inner border-radius
          "[&>*:not(:first-child)]:rounded-l-none",
          "[&>*:not(:last-child)]:rounded-r-none",
          // Remove duplicate borders
          "[&>*:not(:first-child)]:border-l-0",
        ],
        vertical: [
          "flex-col",
          "[&>*:not(:first-child)]:rounded-t-none",
          "[&>*:not(:last-child)]:rounded-b-none",
          "[&>*:not(:first-child)]:border-t-0",
        ],
      },
      variant: {
        default: "",
        // 3D raised effect (like the reference)
        raised: [
          // Light theme
          "[&>button]:bg-[#f0f0f0] [&>button]:text-[#242424] [&>button]:border-0",
          "[&>button]:shadow-[inset_0_1px_0_0_#f4f4f4,0_1px_0_0_#efefef,0_2px_0_0_#ececec,0_4px_0_0_#e0e0e0,0_5px_0_0_#dedede,0_6px_0_0_#dcdcdc,0_7px_0_0_#cacaca,0_7px_8px_0_#cecece]",
          "[&>button:active]:translate-y-[3px]",
          "[&>button:active]:shadow-[inset_0_0.5px_0_0_#f4f4f4,0_0.5px_0_0_#efefef,0_1px_0_0_#ececec,0_2px_0_0_#e0e0e0,0_2px_0_0_#dedede,0_3px_0_0_#dcdcdc,0_3.5px_0_0_#cacaca,0_3.5px_6px_0_#cecece]",
          "[&>button:active]:tracking-wider [&>button:active]:text-sky-500",
          "[&>button:hover]:text-sky-600 [&>button:focus]:text-sky-500",
          // Dark theme
          "dark:[&>button]:bg-[#2a2a2a] dark:[&>button]:text-[#e0e0e0]",
          "dark:[&>button]:shadow-[inset_0_1px_0_0_#3a3a3a,0_1px_0_0_#252525,0_2px_0_0_#222222,0_4px_0_0_#1a1a1a,0_5px_0_0_#181818,0_6px_0_0_#151515,0_7px_0_0_#121212,0_7px_8px_0_#0a0a0a]",
          "dark:[&>button:active]:shadow-[inset_0_0.5px_0_0_#3a3a3a,0_0.5px_0_0_#252525,0_1px_0_0_#222222,0_2px_0_0_#1a1a1a,0_2px_0_0_#181818,0_3px_0_0_#151515,0_3.5px_0_0_#121212,0_3.5px_6px_0_#0a0a0a]",
          "dark:[&>button:hover]:text-sky-400 dark:[&>button:focus]:text-sky-400 dark:[&>button:active]:text-sky-400",
        ],
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
    },
  },
)

function ButtonGroup({
  className,
  orientation,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      data-variant={variant}
      className={cn(buttonGroupVariants({ orientation, variant }), className)}
      {...props}
    />
  )
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="button-group-text"
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs",
        "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto",
        className,
      )}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}
