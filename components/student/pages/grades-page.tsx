"use client"

import { useState } from "react"
import { Filter, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface GradesPageProps {
  onSubjectClick?: (subject: any) => void
}

const getGradeColor = (grade: number) => {
  if (grade >= 70) return "text-green-400"
  if (grade >= 50) return "text-yellow-400"
  return "text-red-400"
}

const getGradeBackgroundColor = (grade: number) => {
  if (grade >= 70) return "from-green-600 to-emerald-600"
  if (grade >= 50) return "from-yellow-600 to-amber-600"
  return "from-red-600 to-rose-600"
}

export default function GradesPage({ onSubjectClick }: GradesPageProps) {
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterYear, setFilterYear] = useState("all")

  const gradeData = [
    { subject: "Data Structures", grade: 85, possible: 100, code: "CS101", instructor: "Dr. Smith" },
    { subject: "Database Systems", grade: 78, possible: 100, code: "CS102", instructor: "Dr. Jones" },
    { subject: "Web Development", grade: 92, possible: 100, code: "CS103", instructor: "Dr. Brown" },
    { subject: "Discrete Math", grade: 88, possible: 100, code: "CS104", instructor: "Dr. Davis" },
    { subject: "Software Eng.", grade: 90, possible: 100, code: "CS105", instructor: "Dr. Wilson" },
  ]

  const overallGPA = (gradeData.reduce((sum, item) => sum + item.grade, 0) / gradeData.length).toFixed(2)
  const overallGradeColor = getGradeBackgroundColor(Number.parseFloat(overallGPA))

  const handleSubjectClick = (subject: any) => {
    if (onSubjectClick) {
      onSubjectClick({
        name: subject.subject,
        code: subject.code,
        instructor: subject.instructor,
        color: `from-green-500 to-green-600`,
        activeTab: "grades",
      })
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Grades</h1>
        <p className="text-slate-400">Review your academic performance</p>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <Filter size={20} className="text-slate-400" />
          <select
            value={filterSemester}
            onChange={(e) => setFilterSemester(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg font-medium text-slate-100 outline-none hover:border-slate-600 transition-colors"
          >
            <option value="all">All Semesters</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
          </select>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg font-medium text-slate-100 outline-none hover:border-slate-600 transition-colors"
          >
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      {/* Overall GPA */}
      <div className={`bg-gradient-to-r ${overallGradeColor} text-white rounded-xl p-8 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm mb-2">Overall Grade Average</p>
            <p className="text-5xl font-bold">{overallGPA}</p>
          </div>
          <TrendingUp size={64} className="text-white/30" />
        </div>
      </div>

      {/* Grades Chart */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-4">Grades by Subject</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={gradeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
            <XAxis dataKey="subject" tick={{ fontSize: 12, fill: "#cbd5e1" }} />
            <YAxis tick={{ fill: "#cbd5e1" }} />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569", borderRadius: "8px" }} />
            <Legend />
            <Bar dataKey="grade" fill="#10B981" name="Your Grade" radius={[8, 8, 0, 0]} />
            <Bar dataKey="possible" fill="#475569" name="Possible" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Subject Grades - Make clickable to navigate to subject detail */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-white">Subject Breakdown</h3>
        {gradeData.map((item, idx) => {
          const gradeColor = getGradeColor(item.grade)
          return (
            <button
              key={idx}
              onClick={() => handleSubjectClick(item)}
              className="w-full flex items-center justify-between p-4 bg-slate-900 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-colors"
            >
              <div className="text-left">
                <span className="font-medium text-white block">{item.subject}</span>
                <span className="text-xs text-slate-400">{item.code}</span>
              </div>
              <span className={`text-2xl font-bold ${gradeColor}`}>{item.grade}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
