"use client"

import { useState } from "react"
import { BookOpen, ChevronRight, Filter } from "lucide-react"

interface Subject {
  id: string
  name: string
  code: string
  instructor: string
  section: string
  dayTime: string
  semester: string
  year: string
  progress: number
  color: string
}

interface SubjectsPageProps {
  onSubjectClick: (subject: Subject) => void
}

export default function SubjectsPage({ onSubjectClick }: SubjectsPageProps) {
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterYear, setFilterYear] = useState("all")

  const subjects: Subject[] = [
    {
      id: "1",
      name: "Data Structures",
      code: "CS 201",
      instructor: "Dr. Maria Santos",
      section: "Section A",
      dayTime: "Mon & Wed, 10:00 AM - 11:30 AM",
      semester: "1st",
      year: "2024",
      progress: 85,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "2",
      name: "Database Systems",
      code: "CS 202",
      instructor: "Prof. Juan Dela Cruz",
      section: "Section B",
      dayTime: "Tue & Thu, 2:00 PM - 3:30 PM",
      semester: "1st",
      year: "2024",
      progress: 72,
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "3",
      name: "Web Development",
      code: "CS 203",
      instructor: "Engr. Ana Reyes",
      section: "Section A",
      dayTime: "Mon & Wed, 1:00 PM - 2:30 PM",
      semester: "2nd",
      year: "2024",
      progress: 90,
      color: "from-green-500 to-green-600",
    },
    {
      id: "4",
      name: "Discrete Mathematics",
      code: "MA 301",
      instructor: "Dr. Ramon Lopez",
      section: "Section C",
      dayTime: "Fri, 9:00 AM - 12:00 PM",
      semester: "1st",
      year: "2024",
      progress: 78,
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "5",
      name: "Software Engineering",
      code: "CS 301",
      instructor: "Engr. Maria Garcia",
      section: "Section B",
      dayTime: "Tue & Thu, 10:00 AM - 11:30 AM",
      semester: "2nd",
      year: "2024",
      progress: 88,
      color: "from-red-500 to-red-600",
    },
  ]

  const filteredSubjects = subjects.filter((subject) => {
    const semesterMatch = filterSemester === "all" || subject.semester === filterSemester
    const yearMatch = filterYear === "all" || subject.year === filterYear
    return semesterMatch && yearMatch
  })

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Subjects</h1>
        <p className="text-slate-400">Manage your courses and track progress</p>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <Filter size={20} className="text-slate-400" />

          <div className="flex gap-4 flex-wrap">
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
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSubjectClick(subject)}
            className="group bg-slate-900 border border-slate-700/50 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-slate-600 transition-all duration-300 text-left"
          >
            {/* Subject Header */}
            <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{subject.name}</h3>
                  <p className="text-white/90 text-sm">{subject.code}</p>
                </div>
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Subject Info */}
            <div className="p-4 space-y-3">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">Instructor</p>
                <p className="text-slate-100 font-medium">{subject.instructor}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Section</p>
                  <p className="text-slate-100 font-medium text-sm">{subject.section}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Schedule</p>
                  <p className="text-slate-100 font-medium text-sm">{subject.dayTime}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-slate-400">Progress</span>
                  <span className="text-sm font-bold text-slate-100">{subject.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400 font-medium">No subjects found for the selected filters</p>
        </div>
      )}
    </div>
  )
}
