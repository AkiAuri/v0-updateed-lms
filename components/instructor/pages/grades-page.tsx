"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Filter, BarChart3 } from "lucide-react"

interface InstructorGradesProps {
  onSubjectClick?: (subjectName: string, tabType: "grades") => void
}

interface GradeItem {
  id: string
  subjectName: string
  section: string
  participants: number
  passingRate: number
  failingRate: number
}

export default function InstructorGrades({ onSubjectClick }: InstructorGradesProps) {
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [filterSection, setFilterSection] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const gradesDataRaw: GradeItem[] = [
    {
      id: "1",
      subjectName: "Data Structures",
      section: "Section A",
      participants: 45,
      passingRate: 88,
      failingRate: 12,
    },
    {
      id: "2",
      subjectName: "Data Structures",
      section: "Section B",
      participants: 35,
      passingRate: 91,
      failingRate: 9,
    },
    {
      id: "3",
      subjectName: "Database Systems",
      section: "Section A",
      participants: 38,
      passingRate: 65,
      failingRate: 35,
    },
    {
      id: "4",
      subjectName: "Web Development",
      section: "Section A",
      participants: 52,
      passingRate: 92,
      failingRate: 8,
    },
    {
      id: "5",
      subjectName: "Algorithms",
      section: "Section C",
      participants: 40,
      passingRate: 72,
      failingRate: 28,
    },
    {
      id: "6",
      subjectName: "Advanced Java",
      section: "Section B",
      participants: 30,
      passingRate: 85,
      failingRate: 15,
    },
  ]

  const filteredGrades = gradesDataRaw.filter((item) => {
    if (filterSection !== "all" && item.section !== filterSection) return false
    return true
  })

  if (sortBy === "name") {
    filteredGrades.sort((a, b) => {
      const nameCompare = a.subjectName.localeCompare(b.subjectName)
      if (nameCompare !== 0) return nameCompare
      return a.section.localeCompare(b.section)
    })
  } else if (sortBy === "passingRate") {
    filteredGrades.sort((a, b) => b.passingRate - a.passingRate)
  }

  const getGradeColor = (rate: number) => {
    if (rate >= 70) return { bg: "bg-green-900/30", text: "text-green-400", border: "border-green-500/30" }
    if (rate >= 50) return { bg: "bg-yellow-900/30", text: "text-yellow-400", border: "border-yellow-500/30" }
    return { bg: "bg-red-900/30", text: "text-red-400", border: "border-red-500/30" }
  }

  const averagePassingRate = Math.round(
    gradesDataRaw.reduce((sum, item) => sum + item.passingRate, 0) / gradesDataRaw.length,
  )
  const averageFailingRate = 100 - averagePassingRate

  const getAverageColor = (rate: number) => {
    if (rate >= 70) return "text-green-400"
    if (rate >= 50) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Grades</h1>
        <p className="text-slate-400">Monitor student grades and class performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Average Passing Rate</p>
                <p className={`text-3xl font-bold mt-1 ${getAverageColor(averagePassingRate)}`}>
                  {averagePassingRate}%
                </p>
              </div>
              <BarChart3 className={`h-8 w-8 opacity-50 ${getAverageColor(averagePassingRate)}`} />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Average Failing Rate</p>
                <p
                  className={`text-3xl font-bold mt-1 ${averageFailingRate >= 30 ? "text-red-400" : "text-yellow-400"}`}
                >
                  {averageFailingRate}%
                </p>
              </div>
              <BarChart3
                className={`h-8 w-8 opacity-50 ${averageFailingRate >= 30 ? "text-red-400" : "text-yellow-400"}`}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Students</p>
                <p className="text-3xl font-bold text-blue-400 mt-1">
                  {gradesDataRaw.reduce((sum, item) => sum + item.participants, 0)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400 opacity-50" />
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
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 outline-none hover:border-slate-600"
            >
              <option value="name">Sort by Name</option>
              <option value="passingRate">Sort by Passing Rate</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Grades by Subject</h2>
        {filteredGrades.length === 0 ? (
          <div className="text-center py-8 text-slate-400">No subjects found with the selected filters</div>
        ) : (
          filteredGrades.map((item) => {
            const gradeColor = getGradeColor(item.passingRate)
            return (
              <button
                key={item.id}
                onClick={() => onSubjectClick?.(item.subjectName, "grades")}
                className="w-full text-left p-4 bg-slate-900 border border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-white">{item.subjectName}</h3>
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">{item.section}</span>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">Students: {item.participants}</p>
                    <div
                      className={`flex items-center gap-2 p-3 rounded-lg ${gradeColor.bg} border ${gradeColor.border}`}
                    >
                      <span className={`text-sm font-semibold ${gradeColor.text}`}>
                        Passing Rate: {item.passingRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
