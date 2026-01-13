"use client"

import { customToast } from "@/lib/toast"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy a new project in one click</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your new project will be created with a configured environment
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => customToast.info("Cancelled", { description: "Project creation cancelled" })}
        >
          Cancel
        </Button>
        <Button
          onClick={() => customToast.success("Created!", { description: "Your project has been created" })}
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  )
}
