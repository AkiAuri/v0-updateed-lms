"use client"

import { Calendar, Clock, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Dashboard() {
  const upcomingAssignments = [
    {
      id: 1,
      title: "React Fundamentals Quiz",
      course: "Web Development 101",
      dueDate: "Oct 25, 2025",
      priority: "high",
    },
    {
      id: 2,
      title: "Database Design Project",
      course: "Database Systems",
      dueDate: "Oct 28, 2025",
      priority: "medium",
    },
    { id: 3, title: "Algorithm Analysis Essay", course: "Computer Science", dueDate: "Nov 2, 2025", priority: "low" },
  ]

  const recentCourses = [
    { id: 1, name: "Web Development 101", progress: 75, instructor: "Dr. Sarah Johnson" },
    { id: 2, name: "Database Systems", progress: 60, instructor: "Prof. Michael Chen" },
    { id: 3, name: "Computer Science", progress: 85, instructor: "Dr. Emily Rodriguez" },
  ]

  const stats = [
    { label: "Active Courses", value: "4", icon: BookOpen },
    { label: "Pending Tasks", value: "7", icon: Clock },
    { label: "Average Grade", value: "3.8", icon: TrendingUp },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, Alex!</h1>
        <p className="text-muted-foreground">Here's what's happening in your courses today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="p-6 bg-card border border-border hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Assignments */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Upcoming Assignments</h2>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        assignment.priority === "high"
                          ? "bg-destructive/20 text-destructive"
                          : assignment.priority === "medium"
                            ? "bg-accent/20 text-accent-foreground"
                            : "bg-primary/20 text-primary"
                      }`}
                    >
                      {assignment.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    Due: {assignment.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Course Progress */}
        <div>
          <Card className="p-6 bg-card border border-border h-full">
            <h2 className="text-xl font-bold text-foreground mb-6">Course Progress</h2>
            <div className="space-y-6">
              {recentCourses.map((course) => (
                <div key={course.id}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground text-sm">{course.name}</h3>
                    <span className="text-sm font-bold text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{course.instructor}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

import { BookOpen } from "lucide-react"
