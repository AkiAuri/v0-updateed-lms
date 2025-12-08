"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function InboxPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-md px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Inbox</h1>
        <p className="text-sm text-muted-foreground">Your messages and notifications</p>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>Inbox (0 messages)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">No messages yet</p>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
