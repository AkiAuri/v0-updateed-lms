"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, BarChart3 } from "lucide-react"

interface SubjectForRedirect {
  id: string
  name: string
  code: string
  section: string
  dayTime: string
  totalStudents: number
  color: string
}

interface InstructorAttendanceProps {
  onSubjectClick?: (subject: SubjectForRedirect, tabType: "attendance") => void
}

export default function InstructorAttendance({ onSubjectClick }: InstructorAttendanceProps) {
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [filterSection, setFilterSection] = useState("all")

  const attendanceData = [
    {
      id: "1",
      subjectName: "Data Structures",
      code: "CS 201",
      section: "Section A",
      dayTime: "Mon & Wed, 10:00 AM",
      participants: 45,
      present: 42,
      absent: 3,
      overallAttendance: "93%",
      color: "from-blue-500 to-blue-600",
      totalStudents: 45,
    },
    {
      id: "2",
      subjectName: "Data Structures",
      code: "CS 201",
      section: "Section B",
      dayTime: "Mon & Wed, 10:00 AM",
      participants: 35,
      present: 33,
      absent: 2,
      overallAttendance: "94%",
      color: "from-blue-500 to-blue-600",
      totalStudents: 35,
    },
    {
      id: "3",
      subjectName: "Database Systems",
      code: "CS 202",
      section: "Section A",
      dayTime: "Tue & Thu, 2:00 PM",
      participants: 38,
      present: 36,
      absent: 2,
      overallAttendance: "95%",
      color: "from-purple-500 to-purple-600",
      totalStudents: 38,
    },
    {
      id: "4",
      subjectName: "Web Development",
      code: "CS 203",
      section: "Section A",
      dayTime: "Mon & Wed, 1:00 PM",
      participants: 52,
      present: 49,
      absent: 3,
      overallAttendance: "94%",
      color: "from-green-500 to-green-600",
      totalStudents: 52,
    },
  ]

  const filteredData = attendanceData.filter((item) => filterSection === "all" || item.section === filterSection)

  const handleSubjectClick = (item: (typeof attendanceData)[0]) => {
    const subject: SubjectForRedirect = {
      id: item.id,
      name: item.subjectName,
      code: item.code,
      section: item.section,
      dayTime: item.dayTime,
      totalStudents: item.participants,
      color: item.color,
    }
    onSubjectClick?.(subject, "attendance")
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Attendance</h1>
        <p className="text-slate-400">Monitor and manage student attendance for all subjects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Average Attendance</p>
                <p className="text-3xl font-bold text-blue-400 mt-1">94%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Sessions</p>
                <p className="text-3xl font-bold text-green-400 mt-1">24</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Classes</p>
                <p className="text-3xl font-bold text-amber-400 mt-1">4</p>
              </div>
              <BarChart3 className="h-8 w-8 text-amber-400 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Filter size={20} className="text-slate-400" />
          <div className="flex gap-4 flex-wrap">
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 outline-none hover:border-slate-600"
            >
              <option value="all">All Semesters</option>
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 outline-none hover:border-slate-600"
            >
              <option value="all">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 outline-none hover:border-slate-600"
            >
              <option value="all">All Sections</option>
              <option value="Section A">Section A</option>
              <option value="Section B">Section B</option>
              <option value="Section C">Section C</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Attendance by Subject</h2>
        {filteredData.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSubjectClick(item)}
            className="w-full text-left p-4 bg-slate-900 border border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-white">{item.subjectName}</h3>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">{item.section}</span>
                </div>
                <p className="text-sm text-slate-400 mb-2">{item.dayTime}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span>Total: {item.participants}</span>
                  <span className="text-green-400">Present: {item.present}</span>
                  <span className="text-red-400">Absent: {item.absent}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-400">{item.overallAttendance}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
