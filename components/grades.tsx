"use client"

import { TrendingUp, Award, BarChart3 } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

export default function Grades() {
  const gradeData = [
    { course: "Web Dev", midterm: 88, final: 92, average: 90 },
    { course: "Database", midterm: 85, final: 87, average: 86 },
    { course: "CS", midterm: 92, final: 95, average: 93 },
    { course: "ML", midterm: 80, final: 85, average: 82 },
  ]

  const courseGrades = [
    { name: "Web Development 101", grade: "A-", percentage: 90, instructor: "Dr. Sarah Johnson" },
    { name: "Database Systems", grade: "B+", percentage: 86, instructor: "Prof. Michael Chen" },
    { name: "Computer Science", grade: "A", percentage: 93, instructor: "Dr. Emily Rodriguez" },
    { name: "Machine Learning Basics", grade: "B", percentage: 82, instructor: "Prof. David Kim" },
  ]

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 dark:text-green-400"
    if (percentage >= 80) return "text-blue-600 dark:text-blue-400"
    if (percentage >= 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getGradeBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500/20"
    if (percentage >= 80) return "bg-blue-500/20"
    if (percentage >= 70) return "bg-yellow-500/20"
    return "bg-red-500/20"
  }

  const overallGPA = (90 + 86 + 93 + 82) / 4

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Grades & Performance</h1>
        <p className="text-muted-foreground">View your academic performance and progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-card border border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Overall GPA</p>
              <p className="text-3xl font-bold text-foreground">{overallGPA.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">Out of 4.0</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Award className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Courses Completed</p>
              <p className="text-3xl font-bold text-foreground">4</p>
              <p className="text-xs text-muted-foreground mt-2">In progress</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <BarChart3 className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card border border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Highest Grade</p>
              <p className="text-3xl font-bold text-foreground">A</p>
              <p className="text-xs text-muted-foreground mt-2">Computer Science</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-accent-foreground" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="p-6 bg-card border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Grade Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="course" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Legend />
              <Bar dataKey="midterm" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="final" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Line Chart */}
        <Card className="p-6 bg-card border border-border">
          <h2 className="text-xl font-bold text-foreground mb-6">Performance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="course" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: `1px solid var(--color-border)`,
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "var(--color-foreground)" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="average"
                stroke="var(--color-primary)"
                strokeWidth={3}
                dot={{ fill: "var(--color-primary)", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Course Grades Table */}
      <Card className="p-6 bg-card border border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Course Grades</h2>
        <div className="space-y-3">
          {courseGrades.map((course, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/50 transition-colors duration-200"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{course.name}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Grade</p>
                  <p className={`text-2xl font-bold ${getGradeColor(course.percentage)}`}>{course.grade}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg ${getGradeBgColor(course.percentage)}`}>
                  <p className={`text-lg font-bold ${getGradeColor(course.percentage)}`}>{course.percentage}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
