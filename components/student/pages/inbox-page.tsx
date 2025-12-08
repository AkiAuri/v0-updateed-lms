"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

interface Task {
  id: string
  subjectName: string
  dueDate: string
  dueTime: string
  submissionTitle: string
  category: "recent" | "today" | "upcoming"
}

interface InboxPageProps {
  onSubjectClick?: (subject: string) => void
}

export default function InboxPage({ onSubjectClick }: InboxPageProps) {
  const [activeCategory, setActiveCategory] = useState<"recent" | "today" | "upcoming">("recent")

  const tasksData: Task[] = [
    {
      id: "1",
      subjectName: "Data Structures",
      dueDate: "2024-12-20",
      dueTime: "11:59 PM",
      submissionTitle: "Assignment 1: Linked Lists",
      category: "upcoming",
    },
    {
      id: "2",
      subjectName: "Web Development",
      dueDate: "2024-12-19",
      dueTime: "5:00 PM",
      submissionTitle: "Project 2: Responsive Design",
      category: "upcoming",
    },
    {
      id: "3",
      subjectName: "Database Systems",
      dueDate: "2024-12-18",
      dueTime: "11:59 PM",
      submissionTitle: "Quiz 2: SQL Queries",
      category: "today",
    },
    {
      id: "4",
      subjectName: "Discrete Mathematics",
      dueDate: "2024-12-18",
      dueTime: "3:00 PM",
      submissionTitle: "Seatwork: Proof Writing",
      category: "today",
    },
    {
      id: "5",
      subjectName: "Software Engineering",
      dueDate: "2024-12-17",
      dueTime: "11:59 PM",
      submissionTitle: "Homework 3: Design Patterns",
      category: "recent",
    },
    {
      id: "6",
      subjectName: "Web Development",
      dueDate: "2024-12-16",
      dueTime: "5:00 PM",
      submissionTitle: "Project 1: Static Website",
      category: "recent",
    },
  ]

  const recentAttendance = [
    { subjectName: "Data Structures", date: "2024-12-13", status: "Present", score: "100%" },
    { subjectName: "Web Development", date: "2024-12-12", status: "Present", score: "100%" },
    { subjectName: "Database Systems", date: "2024-12-11", status: "Absent", score: "0%" },
  ]

  const recentGrades = [
    { subjectName: "Data Structures", taskName: "Quiz 1", date: "2024-12-15", grade: "92/100" },
    { subjectName: "Web Development", taskName: "Project 1", date: "2024-12-14", grade: "88/100" },
    { subjectName: "Database Systems", taskName: "Seatwork 2", date: "2024-12-13", grade: "95/100" },
  ]

  const filteredTasks = tasksData.filter((task) => task.category === activeCategory)

  const getDateInfo = (dueDate: string) => {
    const today = new Date("2024-12-18")
    const due = new Date(dueDate)
    const daysLeft = Math.ceil((due.getTime() - today.getTime()) / (1000 * 3600 * 24))

    if (daysLeft < 0) return "Overdue"
    if (daysLeft === 0) return "Today"
    if (daysLeft === 1) return "Tomorrow"
    return `${daysLeft} days left`
  }

  const handleTaskClick = (subjectName: string) => {
    if (onSubjectClick) {
      onSubjectClick(subjectName)
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Inbox</h1>
        <p className="text-slate-400">View your recent attendance, grades, and upcoming tasks</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-2">Upcoming Tasks</p>
          <p className="text-3xl font-bold text-blue-400">
            {tasksData.filter((t) => t.category === "upcoming").length}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-2">Today's Tasks</p>
          <p className="text-3xl font-bold text-amber-400">{tasksData.filter((t) => t.category === "today").length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6">
          <p className="text-slate-400 text-sm mb-2">Recent Items</p>
          <p className="text-3xl font-bold text-green-400">{tasksData.filter((t) => t.category === "recent").length}</p>
        </div>
      </div>

      {/* Task Tabs */}
      <div className="flex gap-2 border-b border-slate-700/50 overflow-x-auto">
        {["recent", "today", "upcoming"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${
              activeCategory === cat
                ? "border-blue-600 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Tasks</h2>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => handleTaskClick(task.subjectName)}
              className="w-full text-left p-4 bg-slate-900 border border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-white">{task.submissionTitle}</h3>
                    <ArrowRight size={16} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{task.subjectName}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>
                      Due: {task.dueDate} at {task.dueTime}
                    </span>
                    <span
                      className={`px-2 py-1 rounded ${
                        getDateInfo(task.dueDate).includes("Overdue")
                          ? "bg-red-900/30 text-red-300"
                          : getDateInfo(task.dueDate) === "Today"
                            ? "bg-amber-900/30 text-amber-300"
                            : "bg-blue-900/30 text-blue-300"
                      }`}
                    >
                      {getDateInfo(task.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p className="text-slate-400 text-center py-8">No tasks in this category</p>
        )}
      </div>

      {/* Recent Attendance */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Recent Attendance</h2>
        <div className="space-y-2">
          {recentAttendance.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleTaskClick(item.subjectName)}
              className="w-full text-left p-4 bg-slate-900 border border-slate-700/50 rounded-lg hover:border-slate-600 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{item.subjectName}</p>
                  <p className="text-xs text-slate-400">{item.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.status === "Present" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-slate-400 font-semibold">{item.score}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Grades */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Recent Grades</h2>
        <div className="space-y-2">
          {recentGrades.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleTaskClick(item.subjectName)}
              className="w-full text-left p-4 bg-slate-900 border border-slate-700/50 rounded-lg hover:border-slate-600 hover:bg-slate-800 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{item.taskName}</p>
                  <p className="text-xs text-slate-400">
                    {item.subjectName} • {item.date}
                  </p>
                </div>
                <span className="text-lg font-bold text-cyan-400">{item.grade}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
