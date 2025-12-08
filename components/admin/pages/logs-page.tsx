"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Edit2, Trash2, Plus, CheckCircle } from "lucide-react"

interface LogEntry {
  id: string
  action: string
  description: string
  adminName: string
  timestamp: Date
  type: "create" | "update" | "delete"
  target: string
}

// Mock log data for demonstration
const mockLogs: LogEntry[] = [
  {
    id: "1",
    action: "Created",
    description: "Created new school year 2025-2026",
    adminName: "Admin User",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    type: "create",
    target: "School Year",
  },
  {
    id: "2",
    action: "Updated",
    description: "Edited semester name from First Semester to Sem 1",
    adminName: "Admin User",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    type: "update",
    target: "Semester",
  },
  {
    id: "3",
    action: "Assigned",
    description: "Assigned instructor Mr. Johnson to Mathematics subject",
    adminName: "Admin User",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    type: "create",
    target: "Instructor Assignment",
  },
  {
    id: "4",
    action: "Deleted",
    description: "Deleted section Section C from Grade 2",
    adminName: "Admin User",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    type: "delete",
    target: "Section",
  },
  {
    id: "5",
    action: "Created",
    description: "Added student John Doe to Mathematics class",
    adminName: "Admin User",
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    type: "create",
    target: "Student Assignment",
  },
  {
    id: "6",
    action: "Updated",
    description: "Updated admin account credentials",
    adminName: "Admin User",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    type: "update",
    target: "Admin Account",
  },
  {
    id: "7",
    action: "Created",
    description: "Created new grade level Grade 11",
    adminName: "Admin User",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    type: "create",
    target: "Grade Level",
  },
  {
    id: "8",
    action: "Assigned",
    description: "Assigned instructor Ms. Smith to English subject",
    adminName: "Admin User",
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
    type: "create",
    target: "Instructor Assignment",
  },
]

const getActionIcon = (type: string) => {
  switch (type) {
    case "create":
      return <Plus className="w-4 h-4" />
    case "update":
      return <Edit2 className="w-4 h-4" />
    case "delete":
      return <Trash2 className="w-4 h-4" />
    default:
      return <CheckCircle className="w-4 h-4" />
  }
}

const getActionColor = (type: string) => {
  switch (type) {
    case "create":
      return "bg-green-500/20 text-green-400"
    case "update":
      return "bg-blue-500/20 text-blue-400"
    case "delete":
      return "bg-red-500/20 text-red-400"
    default:
      return "bg-slate-500/20 text-slate-400"
  }
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor(diff / (1000 * 60))

  if (hours > 24) return date.toLocaleDateString()
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return "Just now"
}

export default function LogsPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/75 backdrop-blur-md px-6 py-4 shadow-sm">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-400" />
            Activity Logs
          </h1>
          <p className="text-slate-400 mt-1">Track all changes and activities performed by administrators</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 md:p-8">
        <div className="space-y-4">
          {mockLogs.map((log) => (
            <div
              key={log.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-lg p-5 hover:border-slate-600/80 transition-all hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`p-2.5 rounded-lg ${getActionColor(log.type)} flex-shrink-0`}>
                  {getActionIcon(log.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold">{log.action}</h3>
                    <Badge variant="outline" className="bg-slate-700/50 border-slate-600 text-slate-300 text-xs">
                      {log.target}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm">{log.description}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                    <User className="w-3 h-3" />
                    <span>{log.adminName}</span>
                    <span>•</span>
                    <span>{formatTime(log.timestamp)}</span>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="text-right flex-shrink-0">
                  <p className="text-slate-400 text-sm">
                    {log.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <p className="text-slate-500 text-xs">{log.timestamp.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {mockLogs.length === 0 && (
          <Card className="border-slate-700 bg-slate-800">
            <CardContent className="pt-6">
              <p className="text-center text-slate-400">No activities logged yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
