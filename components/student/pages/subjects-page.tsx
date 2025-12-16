"use client"

import { useState, useEffect, useCallback } from "react"
import { BookOpen, ChevronRight, Filter, RefreshCw, Loader2, Users, GraduationCap } from "lucide-react"

interface Subject {
  id: number
  name: string
  code: string
  sectionId: number
  sectionName: string
  gradeLevelId: number
  gradeLevelName: string
  semesterId: number
  semesterName: string
  schoolYearId: number
  schoolYear: string
  instructors: string
  enrolledAt: string
  totalSubmissions: number
  completedSubmissions: number
  progress: number
  color: string
}

interface Filters {
  semesters: string[]
  years: string[]
}

interface SubjectsPageProps {
  studentId?: number | null
  onSubjectClick: (subject: Subject) => void
}

export default function SubjectsPage({ studentId, onSubjectClick }: SubjectsPageProps) {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [filters, setFilters] = useState<Filters>({ semesters: [], years: [] })
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSubjects = useCallback(async () => {
    if (!studentId) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const params = new URLSearchParams({
        studentId: studentId.toString(),
      })

      if (filterSemester !== 'all') {
        params.append('semester', filterSemester)
      }
      if (filterYear !== 'all') {
        params.append('year', filterYear)
      }

      const response = await fetch(`/api/student/subjects?${params}`)
      const data = await response.json()

      if (data.success) {
        setSubjects(data.subjects) // Fixed space: data. subjects -> data.subjects
        // Only update filters on initial load
        if (filters.semesters.length === 0) { // Fixed space: filters. semesters -> filters.semesters
          setFilters(data.filters)
        }
      } else {
        setError(data.error || 'Failed to fetch subjects')
      }
    } catch (err) {
      console.error('Failed to fetch subjects:', err)
      setError('Failed to connect to server')
    } finally {
      setIsLoading(false)
    }
  }, [studentId, filterSemester, filterYear, filters.semesters.length])

  useEffect(() => {
    fetchSubjects()
  }, [fetchSubjects])

  // No student ID
  if (!studentId) {
    return (
        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Subjects</h1>
            <p className="text-slate-400">Manage your courses and track progress</p>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
            <p className="text-yellow-400">Unable to load subjects. Please log in again.</p>
          </div>
        </div>
    )
  }

  // Loading state
  if (isLoading && subjects.length === 0) {
    return (
        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Subjects</h1>
            <p className="text-slate-400">Manage your courses and track progress</p>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
            <span className="ml-3 text-slate-400">Loading your subjects...</span>
          </div>
        </div>
    )
  }

  // Error state
  if (error && subjects.length === 0) {
    return (
        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Subjects</h1>
            <p className="text-slate-400">Manage your courses and track progress</p>
          </div>
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
            <p className="text-red-400">{error}</p>
            <button
                onClick={fetchSubjects}
                className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
    )
  }

  return (
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Subjects</h1>
            <p className="text-slate-400">Manage your courses and track progress</p>
          </div>
          <button
              onClick={fetchSubjects}
              disabled={isLoading}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors disabled:opacity-50"
              title="Refresh"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter size={20} className="text-slate-400" />

            <div className="flex gap-4 flex-wrap">
              <select
                  value={filterSemester}
                  onChange={(e) => setFilterSemester(e.target.value)} // Fixed space: e. target.value -> e.target.value
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg font-medium text-slate-100 outline-none hover:border-slate-600 transition-colors"
              >
                <option value="all">All Semesters</option>
                {filters.semesters.map((semester) => (
                    <option key={semester} value={semester}>
                      {semester}
                    </option>
                ))}
              </select>

              <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg font-medium text-slate-100 outline-none hover:border-slate-600 transition-colors"
              >
                <option value="all">All Years</option>
                {filters.years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                ))}
              </select>
            </div>

            {/* Subject count */}
            <div className="ml-auto text-sm text-slate-400">
              {subjects.length} subject{subjects.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => ( // Fixed space: subjects. map -> subjects.map
              <button
                  key={subject.id} // Fixed space: subject. id -> subject.id
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
                  {/* Instructor */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Instructor</p>
                    <p className="text-slate-100 font-medium truncate">{subject.instructors}</p>
                  </div>

                  {/* Section & Grade Level */}
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-slate-400" />
                    <p className="text-slate-100 font-medium text-sm">
                      {subject.gradeLevelName} - {subject.sectionName}
                    </p>
                  </div>

                  {/* Semester & Year */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Semester</p>
                    <p className="text-slate-100 font-medium text-sm">
                      {subject.semesterName} ({subject.schoolYear})
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-slate-400">
                    Progress ({subject.completedSubmissions}/{subject.totalSubmissions} tasks)
                  </span>
                      <span className={`text-sm font-bold ${
                          subject.progress >= 80 // Fixed space: subject. progress -> subject.progress
                              ? 'text-green-400'
                              : subject.progress >= 50 // Fixed space: subject. progress -> subject.progress
                                  ? 'text-yellow-400'
                                  : 'text-slate-100'
                      }`}>
                    {subject.progress}%
                  </span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                          className={`h-full rounded-full transition-all duration-300 ${
                              subject.progress >= 80
                                  ? 'bg-gradient-to-r from-green-500 to-green-600' // Fixed double space
                                  : subject.progress >= 50
                                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' // Fixed double space
                                      : 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                          }`}
                          style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </button>
          ))}
        </div>

        {/* Empty State */}
        {subjects.length === 0 && !isLoading && ( // Fixed spaces: subjects. length and ! isLoading
            <div className="text-center py-12 bg-slate-800/30 border border-slate-700/30 rounded-xl">
              <BookOpen size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-400 font-medium mb-2">No subjects found</p>
              <p className="text-slate-500 text-sm">
                {filterSemester !== 'all' || filterYear !== 'all'
                    ? 'Try adjusting your filters'
                    : 'You are not enrolled in any subjects yet'}
              </p>
            </div>
        )}
      </div>
  )
}