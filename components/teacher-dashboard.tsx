"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface TeacherDashboardProps {
  onLogout: () => void
}

export default function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const tasksData = [
    { id: 1, title: "Grade Assignment 1", course: "Mathematics 101", dueDate: "Today", priority: "high" },
    { id: 2, title: "Prepare Lecture Notes", course: "Physics 201", dueDate: "Tomorrow", priority: "medium" },
    {
      id: 3,
      title: "Review Student Projects",
      course: "Computer Science 301",
      dueDate: "In 2 days",
      priority: "medium",
    },
    { id: 4, title: "Update Course Materials", course: "English 101", dueDate: "In 3 days", priority: "low" },
  ]

  const classPerformanceData = [
    { name: "Math 101", students: 32, avgScore: 78 },
    { name: "Physics 201", students: 28, avgScore: 82 },
    { name: "CS 301", students: 25, avgScore: 85 },
    { name: "English 101", students: 30, avgScore: 80 },
  ]

  const submissionData = [
    { name: "Mon", submitted: 24, pending: 8 },
    { name: "Tue", submitted: 28, pending: 4 },
    { name: "Wed", submitted: 32, pending: 0 },
    { name: "Thu", submitted: 26, pending: 6 },
    { name: "Fri", submitted: 30, pending: 2 },
  ]

  const recentActivityData = [
    { id: 1, student: "John Doe", action: "Submitted Assignment", course: "Math 101", time: "2 hours ago" },
    { id: 2, student: "Jane Smith", action: "Posted Question", course: "Physics 201", time: "4 hours ago" },
    { id: 3, student: "Mike Johnson", action: "Completed Quiz", course: "CS 301", time: "6 hours ago" },
    { id: 4, student: "Sarah Williams", action: "Submitted Project", course: "English 101", time: "1 day ago" },
  ]

  return (
    <div className="flex h-screen bg-slate-950">
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900 border-r border-slate-700/50 transition-all duration-300 flex flex-col shadow-lg`}
      >
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {sidebarOpen && <span className="font-bold text-foreground text-lg">PRESENT</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-foreground hover:bg-muted/30 p-2 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: "📊", label: "Dashboard", active: true },
            { icon: "📚", label: "Courses" },
            { icon: "✓", label: "Assignments" },
            { icon: "📝", label: "Grades" },
            { icon: "👥", label: "Students" },
            { icon: "📢", label: "Announcements" },
          ].map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-primary/20 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <Button
            onClick={onLogout}
            className="w-full bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
          >
            {sidebarOpen ? "Logout" : "↪"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-background/75 backdrop-blur-md px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back! Here's your teaching overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Dr. Sarah Johnson</p>
                <p className="text-xs text-muted-foreground">Teacher</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                SJ
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6 bg-slate-950">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Total Students", value: "115", icon: "👥", color: "bg-primary/10" },
              { label: "Active Courses", value: "4", icon: "📚", color: "bg-secondary/10" },
              { label: "Pending Submissions", value: "12", icon: "📥", color: "bg-accent/10" },
              { label: "Avg. Class Score", value: "81%", icon: "📊", color: "bg-chart-1/10" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="border border-slate-700/50 bg-slate-800 hover:border-primary/50 hover:shadow-lg transition-all duration-200"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg text-2xl`}>{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Tasks */}
            <Card className="border border-slate-700/50 lg:col-span-1 shadow-sm">
              <CardHeader>
                <CardTitle>Daily Tasks</CardTitle>
                <CardDescription>Your upcoming tasks and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tasksData.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg border border-slate-700/50 hover:border-primary/30 hover:bg-muted/20 transition-all duration-150"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">{task.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{task.course}</p>
                          <p className="text-xs text-muted-foreground mt-1">{task.dueDate}</p>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap transition-colors ${
                            task.priority === "high"
                              ? "bg-destructive/20 text-destructive"
                              : task.priority === "medium"
                                ? "bg-accent/20 text-accent"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Class Performance */}
            <Card className="border border-slate-700/50 lg:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle>Class Performance</CardTitle>
                <CardDescription>Average scores by course</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="avgScore" fill="var(--color-primary)" name="Avg Score" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Submission Trends and Recent Activity */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border border-slate-700/50 shadow-sm">
              <CardHeader>
                <CardTitle>Submission Trends</CardTitle>
                <CardDescription>Weekly submission status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={submissionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="submitted"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      name="Submitted"
                      dot={{ fill: "var(--color-primary)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pending"
                      stroke="var(--color-destructive)"
                      strokeWidth={2}
                      name="Pending"
                      dot={{ fill: "var(--color-destructive)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border border-slate-700/50 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest student activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivityData.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-3 border-b border-slate-700/50 last:border-0 hover:bg-muted/20 -mx-2 px-2 py-1 rounded transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                        {activity.student.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.student}</p>
                        <p className="text-xs text-muted-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.course}</p>
                      </div>
                      <p className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
