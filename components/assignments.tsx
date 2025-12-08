"use client"

import { Filter, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Assignments() {
  const [filterStatus, setFilterStatus] = useState("all")

  const assignments = [
    {
      id: 1,
      title: "React Fundamentals Quiz",
      course: "Web Development 101",
      dueDate: "Oct 25, 2025",
      status: "pending",
      progress: 0,
      description: "Test your knowledge on React hooks, components, and state management.",
    },
    {
      id: 2,
      title: "Database Design Project",
      course: "Database Systems",
      dueDate: "Oct 28, 2025",
      status: "in-progress",
      progress: 65,
      description: "Design a normalized database schema for an e-commerce platform.",
    },
    {
      id: 3,
      title: "Algorithm Analysis Essay",
      course: "Computer Science",
      dueDate: "Nov 2, 2025",
      status: "pending",
      progress: 0,
      description: "Write an essay comparing time and space complexity of sorting algorithms.",
    },
    {
      id: 4,
      title: "Python Data Analysis",
      course: "Machine Learning Basics",
      dueDate: "Oct 20, 2025",
      status: "submitted",
      progress: 100,
      description: "Analyze a dataset using pandas and create visualizations.",
    },
    {
      id: 5,
      title: "Web Design Mockup",
      course: "Web Development 101",
      dueDate: "Oct 22, 2025",
      status: "submitted",
      progress: 100,
      description: "Create a responsive website mockup using Figma.",
    },
  ]

  const filteredAssignments =
    filterStatus === "all" ? assignments : assignments.filter((a) => a.status === filterStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-accent-foreground" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-500/20 text-green-700 dark:text-green-400"
      case "in-progress":
        return "bg-accent/20 text-accent-foreground"
      case "pending":
        return "bg-destructive/20 text-destructive"
      default:
        return ""
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Assignments</h1>
        <p className="text-muted-foreground">Track and manage all your course assignments</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <Filter className="w-5 h-5 text-muted-foreground" />
        {["all", "pending", "in-progress", "submitted"].map((status) => (
          <Button
            key={status}
            onClick={() => setFilterStatus(status)}
            variant={filterStatus === status ? "default" : "outline"}
            className="capitalize"
          >
            {status === "in-progress" ? "In Progress" : status}
          </Button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <Card
            key={assignment.id}
            className="p-6 bg-card border border-border hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(assignment.status)}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {assignment.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{assignment.course}</p>
                <p className="text-sm text-foreground/70 mb-4">{assignment.description}</p>

                {/* Progress Bar */}
                {assignment.status !== "pending" && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Completion</span>
                      <span className="text-xs font-bold text-primary">{assignment.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                        style={{ width: `${assignment.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(assignment.status)}`}
                  >
                    {assignment.status === "in-progress" ? "In Progress" : assignment.status}
                  </span>
                  <span className="text-sm text-muted-foreground">Due: {assignment.dueDate}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No assignments found with this status.</p>
        </div>
      )}
    </div>
  )
}
