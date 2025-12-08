"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface AttendancePageProps {
  onSubjectClick?: (subject: any) => void
}

const getAttendanceColor = (attendance: number) => {
  if (attendance >= 80) return "text-green-400"
  if (attendance >= 60) return "text-yellow-400"
  return "text-red-400"
}

const getAttendanceBackgroundColor = (attendance: number) => {
  if (attendance >= 80) return "from-green-600 to-emerald-600"
  if (attendance >= 60) return "from-yellow-600 to-amber-600"
  return "from-red-600 to-rose-600"
}

export default function AttendancePage({ onSubjectClick }: AttendancePageProps) {
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterYear, setFilterYear] = useState("all")

  const attendanceData = [
    { subject: "Data Structures", attendance: 92, color: "#3B82F6", code: "CS101", instructor: "Dr. Smith" },
    { subject: "Database Systems", attendance: 88, color: "#8B5CF6", code: "CS102", instructor: "Dr. Jones" },
    { subject: "Web Development", attendance: 95, color: "#10B981", code: "CS103", instructor: "Dr. Brown" },
    { subject: "Discrete Math", attendance: 85, color: "#F59E0B", code: "CS104", instructor: "Dr. Davis" },
    { subject: "Software Engineering", attendance: 90, color: "#EF4444", code: "CS105", instructor: "Dr. Wilson" },
  ]

  const overallAttendance = Math.round(
    attendanceData.reduce((sum, item) => sum + item.attendance, 0) / attendanceData.length,
  )
  const overallAttendanceColor = getAttendanceBackgroundColor(overallAttendance)

  const handleSubjectClick = (subject: any) => {
    if (onSubjectClick) {
      onSubjectClick({
        name: subject.subject,
        code: subject.code,
        instructor: subject.instructor,
        color: `from-blue-500 to-blue-600`,
        activeTab: "attendance",
      })
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Attendance</h1>
        <p className="text-slate-400">Track your attendance across all subjects</p>
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

      {/* Overall Overview */}
      <div className={`bg-gradient-to-r ${overallAttendanceColor} text-white rounded-xl p-8 shadow-lg`}>
        <h2 className="text-2xl font-bold mb-6">Overall Attendance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/80 text-sm mb-2">Average Attendance</p>
            <p className="text-4xl font-bold">{overallAttendance}%</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-2">Classes Attended</p>
            <p className="text-4xl font-bold">61</p>
          </div>
          <div>
            <p className="text-white/80 text-sm mb-2">Classes Missed</p>
            <p className="text-4xl font-bold">3</p>
          </div>
        </div>
      </div>

      {/* Attendance by Subject */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-white mb-4">Attendance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="attendance"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subject List - Make clickable to navigate to subject detail */}
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-6 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-white mb-4">By Subject</h3>
          {attendanceData.map((item, idx) => {
            const attendanceColor = getAttendanceColor(item.attendance)
            return (
              <button
                key={idx}
                onClick={() => handleSubjectClick(item)}
                className="w-full flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700/80 rounded-lg transition-colors border border-slate-700/50"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div>
                    <span className="font-medium text-white block">{item.subject}</span>
                    <span className="text-xs text-slate-400">{item.code}</span>
                  </div>
                </div>
                <span className={`text-lg font-bold ${attendanceColor}`}>{item.attendance}%</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
