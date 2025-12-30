"use client"

import { ArchiveIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"

export function ButtonGroupPreview() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center rounded-lg border p-8">
      <ButtonGroup>
        <Button variant="outline">Left</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Right</Button>
      </ButtonGroup>
    </div>
  )
}

export function ButtonGroupRaisedDemo() {
  return (
    <div className="flex min-h-[150px] w-full items-center justify-center rounded-lg border p-8">
      <ButtonGroup variant="raised">
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </ButtonGroup>
    </div>
  )
}

export function ButtonGroupOrientationDemo() {
  return (
    <div className="flex min-h-[200px] w-full items-center justify-center gap-8 rounded-lg border p-8">
      <ButtonGroup orientation="horizontal">
        <Button variant="outline">A</Button>
        <Button variant="outline">B</Button>
        <Button variant="outline">C</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="outline">A</Button>
        <Button variant="outline">B</Button>
        <Button variant="outline">C</Button>
      </ButtonGroup>
    </div>
  )
}

export function ButtonGroupWithSeparatorDemo() {
  return (
    <div className="flex min-h-[150px] w-full items-center justify-center rounded-lg border p-8">
      <ButtonGroup>
        <Button variant="outline">
          <ArchiveIcon className="mr-2 h-4 w-4" />
          Archive
        </Button>
        <ButtonGroupSeparator />
        <Button variant="outline">
          <Trash2Icon className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </ButtonGroup>
    </div>
  )
}

export function ButtonGroupWithTextDemo() {
  return (
    <div className="flex min-h-[150px] w-full items-center justify-center rounded-lg border p-8">
      <ButtonGroup>
        <ButtonGroupText>Actions</ButtonGroupText>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Delete</Button>
      </ButtonGroup>
    </div>
  )
}

export function ButtonGroupNestedDemo() {
  return (
    <div className="flex min-h-[150px] w-full items-center justify-center rounded-lg border p-8">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Report</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Snooze</Button>
          <Button variant="outline" size="icon">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </div>
  )
}

export function ButtonGroupIconsDemo() {
  return (
    <div className="flex min-h-[150px] w-full items-center justify-center rounded-lg border p-8">
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <ArchiveIcon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Trash2Icon className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </ButtonGroup>
    </div>
  )
}
