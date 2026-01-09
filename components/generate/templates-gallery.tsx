"use client"

/**
 * Templates Gallery - Display and select from pre-built templates
 */

import { Briefcase, Layout, Rocket, ShoppingBag, User } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEditorStore } from "@/lib/generate/store"
import {
  categoryNames,
  getTemplateCategories,
  type Template,
  templates,
  templateToPageSchema,
} from "@/lib/generate/templates"
import { cn } from "@/lib/utils"

const categoryIcons: Record<Template["category"], React.ReactNode> = {
  saas: <Layout className="h-4 w-4" />,
  startup: <Rocket className="h-4 w-4" />,
  agency: <Briefcase className="h-4 w-4" />,
  portfolio: <User className="h-4 w-4" />,
  ecommerce: <ShoppingBag className="h-4 w-4" />,
}

interface TemplateCardProps {
  template: Template
  onSelect: () => void
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <div
      className={cn(
        "group cursor-pointer rounded-lg border bg-card p-4 transition-all",
        "hover:border-primary hover:shadow-md",
      )}
      onClick={onSelect}
    >
      {/* Thumbnail placeholder */}
      <div className="mb-3 aspect-video rounded-md bg-muted/50 flex items-center justify-center">
        <Layout className="h-8 w-8 text-muted-foreground/50" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{template.name}</h3>
          <Badge variant="secondary" className="text-xs">
            {categoryNames[template.category]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {template.sections.length} sections
        </div>
      </div>
    </div>
  )
}

interface TemplatesGalleryProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function TemplatesGallery({
  trigger,
  open,
  onOpenChange,
}: TemplatesGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const fromJSON = useEditorStore((state) => state.fromJSON)

  const handleSelectTemplate = (template: Template) => {
    const pageSchema = templateToPageSchema(template)
    fromJSON(JSON.stringify(pageSchema))
    onOpenChange?.(false)
  }

  const filteredTemplates =
    selectedCategory === "all"
      ? templates
      : templates.filter((t) => t.category === selectedCategory)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Start with a pre-built template or create from scratch.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <TabsList className="w-full justify-start h-auto flex-wrap gap-1 bg-transparent p-0 mb-4">
            <TabsTrigger
              value="all"
              className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              All
            </TabsTrigger>
            {getTemplateCategories().map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="cursor-pointer gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {categoryIcons[category]}
                {categoryNames[category]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value={selectedCategory}
            className="flex-1 overflow-auto mt-0"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Blank template option */}
              <div
                className={cn(
                  "group cursor-pointer rounded-lg border-2 border-dashed p-4 transition-all",
                  "hover:border-primary hover:bg-muted/30",
                )}
                onClick={() => {
                  useEditorStore.getState().reset()
                  onOpenChange?.(false)
                }}
              >
                <div className="mb-3 aspect-video rounded-md bg-muted/30 flex items-center justify-center">
                  <span className="text-4xl text-muted-foreground/30">+</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Blank Canvas</h3>
                  <p className="text-sm text-muted-foreground">
                    Start from scratch with required sections only.
                  </p>
                </div>
              </div>

              {/* Template cards */}
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => handleSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Button that opens templates gallery
 */
export function TemplatesButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <TemplatesGallery
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button
          variant="outline"
          size="sm"
          className={cn("gap-2 cursor-pointer", className)}
        >
          <Layout className="h-4 w-4" />
          Templates
        </Button>
      }
    />
  )
}
