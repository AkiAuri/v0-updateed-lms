"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Bell, AlertCircle } from "lucide-react"

interface SubjectForRedirect {
  id: string
  name: string
  code: string
  section: string
  dayTime: string
  totalStudents: number
  color: string
}

interface InstructorInboxProps {
  onItemClick?: (subject: SubjectForRedirect, type: "grades") => void
}

export default function InstructorInbox({ onItemClick }: InstructorInboxProps) {
  const inboxItems = [
    {
      id: "1",
      type: "submission",
      message: "10 students submitted assignments",
      subject: "Data Structures",
      subjectCode: "CS 201",
      section: "Section A",
      dayTime: "Mon & Wed, 10:00 AM",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: "2",
      type: "attendance",
      message: "Attendance session created for Web Development",
      subject: "Web Development",
      subjectCode: "CS 203",
      section: "Section A",
      dayTime: "Mon & Wed, 1:00 PM",
      time: "1 day ago",
      priority: "medium",
    },
    {
      id: "3",
      type: "grades",
      message: "5 submissions graded and returned",
      subject: "Database Systems",
      subjectCode: "CS 202",
      section: "Section A",
      dayTime: "Tue & Thu, 2:00 PM",
      time: "2 days ago",
      priority: "low",
    },
    {
      id: "4",
      type: "notification",
      message: "Class roster updated",
      subject: "Data Structures",
      subjectCode: "CS 201",
      section: "Section A",
      dayTime: "Mon & Wed, 10:00 AM",
      time: "3 days ago",
      priority: "low",
    },
  ]

  const handleItemClick = (item: (typeof inboxItems)[0]) => {
    const subject: SubjectForRedirect = {
      id: item.id,
      name: item.subject,
      code: item.subjectCode,
      section: item.section,
      dayTime: item.dayTime,
      totalStudents: 45,
      color: "from-blue-500 to-blue-600",
    }
    onItemClick?.(subject, "grades")
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
        <p className="text-slate-400">View your notifications and recent activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pending Tasks</p>
                <p className="text-3xl font-bold text-blue-400 mt-1">12</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">New Submissions</p>
                <p className="text-3xl font-bold text-green-400 mt-1">8</p>
              </div>
              <Bell className="h-8 w-8 text-green-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Unreviewed</p>
                <p className="text-3xl font-bold text-amber-400 mt-1">5</p>
              </div>
              <AlertCircle className="h-8 w-8 text-amber-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Recent Activities</h2>
        {inboxItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="w-full text-left p-4 bg-slate-900 border border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-white">{item.message}</h3>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">{item.subject}</span>
                  <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded">{item.section}</span>
                  <span>{item.time}</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  item.priority === "high"
                    ? "bg-red-900/30 text-red-300"
                    : item.priority === "medium"
                      ? "bg-amber-900/30 text-amber-300"
                      : "bg-green-900/30 text-green-300"
                }`}
              >
                {item.priority}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
