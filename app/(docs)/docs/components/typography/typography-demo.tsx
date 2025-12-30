"use client"

import { customToast } from "@/lib/toast"
import { Button } from "@/registry/new-york/ui/button"
import { Typography } from "@/registry/new-york/ui/typography"

export function TypographyDemo() {
  return (
    <div className="space-y-6">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="p">
        This is a paragraph with default styling. It has proper line height for
        readability.
      </Typography>
      <Typography variant="lead">
        This is a lead paragraph, typically used for introductions.
      </Typography>
      <Typography variant="muted">
        This is muted text for secondary information.
      </Typography>
    </div>
  )
}

export function TypographyGradientDemo() {
  return (
    <div className="space-y-4">
      <Typography variant="h1">
        Build with{" "}
        <Typography variant="gradient" as="span">
          GooseUI
        </Typography>
      </Typography>
      <Typography variant="h2">
        <Typography variant="gradient" as="span">
          Gradient
        </Typography>{" "}
        text effect
      </Typography>
    </div>
  )
}

export function TypographyHighlightDemo() {
  return (
    <div className="space-y-4">
      <Typography variant="p">
        This text has a{" "}
        <Typography variant="highlight" as="span">
          highlighted
        </Typography>{" "}
        word.
      </Typography>
      <Typography variant="p">
        You can highlight{" "}
        <Typography variant="highlight" as="span">
          important information
        </Typography>{" "}
        in your content.
      </Typography>
    </div>
  )
}

export function TypographyCodeDemo() {
  return (
    <div className="space-y-4">
      <Typography variant="p">
        Use{" "}
        <Typography variant="code" as="code">
          npm install gooseui
        </Typography>{" "}
        to install.
      </Typography>
      <Typography variant="p">
        The{" "}
        <Typography variant="code" as="code">
          Typography
        </Typography>{" "}
        component supports multiple variants.
      </Typography>
    </div>
  )
}

export function TypographyBlockquoteDemo() {
  return (
    <Typography variant="blockquote">
      {`"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs`}
    </Typography>
  )
}

export function TypographyInteractiveDemo() {
  const handleClick = (variant: string) => {
    customToast.success(`Typography variant: ${variant}`, {
      description: "Click any variant to see this notification",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => handleClick("h1")} variant="outline" size="sm">
          H1
        </Button>
        <Button onClick={() => handleClick("h2")} variant="outline" size="sm">
          H2
        </Button>
        <Button
          onClick={() => handleClick("gradient")}
          variant="outline"
          size="sm"
        >
          Gradient
        </Button>
        <Button
          onClick={() => handleClick("highlight")}
          variant="outline"
          size="sm"
        >
          Highlight
        </Button>
        <Button onClick={() => handleClick("code")} variant="outline" size="sm">
          Code
        </Button>
      </div>
      <Typography variant="muted">
        Click a button to see a toast notification
      </Typography>
    </div>
  )
}

export function TypographyAsDemo() {
  return (
    <div className="space-y-4">
      <Typography variant="h1" as="p">
        This looks like H1 but renders as a paragraph
      </Typography>
      <Typography variant="p" as="span">
        This looks like a paragraph but renders as a span
      </Typography>
    </div>
  )
}

export function TypographyAffectsDemo() {
  return (
    <div className="space-y-4">
      <div>
        <Typography variant="h3">With margin (default)</Typography>
        <Typography variant="p" affects="withPMargin">
          First paragraph with top margin.
        </Typography>
        <Typography variant="p" affects="withPMargin">
          Second paragraph with top margin.
        </Typography>
      </div>
      <div className="pt-4 border-t">
        <Typography variant="h3">Without margin</Typography>
        <Typography variant="p" affects="removePMargin">
          First paragraph without margin.
        </Typography>
        <Typography variant="p" affects="removePMargin">
          Second paragraph without margin.
        </Typography>
      </div>
    </div>
  )
}
