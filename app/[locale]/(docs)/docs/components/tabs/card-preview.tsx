import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/gooseui/ui/tabs"

export default function CardPreview() {
  return (
    <Tabs defaultValue="profile" className="w-52">
      <TabsList className="w-full">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="text-sm text-muted-foreground">
        Name and email
      </TabsContent>
      <TabsContent value="password" className="text-sm text-muted-foreground">
        Change password
      </TabsContent>
    </Tabs>
  )
}
