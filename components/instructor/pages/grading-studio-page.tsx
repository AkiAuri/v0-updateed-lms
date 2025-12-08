"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react"

interface StudentSubmission {
  id: string
  studentName: string
  dateSubmitted: string
  attempts: number
  status: "submitted" | "not-submitted"
  currentGrade: number | null
  maxGrade: number
}

interface GradingStudioProps {
  subject: any
  taskId: string
  taskTitle: string
  onBack: () => void
}

export default function GradingStudio({ subject, taskId, taskTitle, onBack }: GradingStudioProps) {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([
    {
      id: "1",
      studentName: "John Doe",
      dateSubmitted: "2024-12-15 10:30 AM",
      attempts: 1,
      status: "submitted",
      currentGrade: null,
      maxGrade: 100,
    },
    {
      id: "2",
      studentName: "Jane Smith",
      dateSubmitted: "2024-12-15 2:15 PM",
      attempts: 2,
      status: "submitted",
      currentGrade: 88,
      maxGrade: 100,
    },
    {
      id: "3",
      studentName: "Mike Johnson",
      dateSubmitted: "2024-12-16 11:00 AM",
      attempts: 1,
      status: "submitted",
      currentGrade: null,
      maxGrade: 100,
    },
    {
      id: "4",
      studentName: "Sarah Williams",
      dateSubmitted: "",
      attempts: 0,
      status: "not-submitted",
      currentGrade: 0,
      maxGrade: 100,
    },
    {
      id: "5",
      studentName: "David Brown",
      dateSubmitted: "2024-12-15 3:45 PM",
      attempts: 3,
      status: "submitted",
      currentGrade: 92,
      maxGrade: 100,
    },
  ])

  const handleGradeChange = (studentId: string, newGrade: number) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === studentId ? { ...sub, currentGrade: Math.min(newGrade, sub.maxGrade) } : sub)),
    )
  }

  const handleSaveGrades = () => {
    console.log("[v0] Saving grades:", submissions)
    alert("Grades saved successfully!")
  }

  const graded = submissions.filter((s) => s.currentGrade !== null && s.currentGrade !== 0).length
  const submitted = submissions.filter((s) => s.status === "submitted").length
  const notSubmitted = submissions.filter((s) => s.status === "not-submitted").length

  const sortedSubmissions = [...submissions].sort((a, b) => a.studentName.localeCompare(b.studentName))

  const getGradeColor = (grade: number | null) => {
    if (grade === null || grade === 0) return "bg-slate-800 text-slate-300"
    if (grade >= 70) return "bg-green-900/30 text-green-400 border border-green-700"
    if (grade >= 50) return "bg-yellow-900/30 text-yellow-400 border border-yellow-700"
    return "bg-red-900/30 text-red-400 border border-red-700"
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-primary hover:text-primary/80">
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Task Info */}
      <Card className="border border-slate-700/50 bg-slate-900">
        <CardHeader>
          <CardTitle>{taskTitle}</CardTitle>
          <CardDescription>{subject?.name}</CardDescription>
        </CardHeader>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Submissions</p>
                <p className="text-2xl font-bold text-blue-400">{submitted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Graded</p>
                <p className="text-2xl font-bold text-green-400">{graded}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Not Graded</p>
                <p className="text-2xl font-bold text-amber-400">{submitted - graded}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Not Submitted</p>
                <p className="text-2xl font-bold text-red-400">{notSubmitted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List - Redesigned */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white">Student Submissions</h2>
        {sortedSubmissions.map((submission) => (
          <div
            key={submission.id}
            className="border border-slate-700/50 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl overflow-hidden shadow-lg transition-all hover:border-slate-600"
          >
            {/* Header */}
            <button
              onClick={() => setExpandedStudent(expandedStudent === submission.id ? null : submission.id)}
              className="w-full p-5 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">
                  {submission.studentName.charAt(0)}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-white text-lg">{submission.studentName}</p>
                  <p className="text-sm text-slate-400">
                    {submission.status === "submitted" ? `Submitted: ${submission.dateSubmitted}` : "Not Submitted"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  {submission.status === "submitted" ? (
                    <div
                      className={`px-4 py-2 rounded-lg font-bold text-base ${getGradeColor(submission.currentGrade)}`}
                    >
                      {submission.currentGrade !== null && submission.currentGrade !== 0
                        ? `${submission.currentGrade}/${submission.maxGrade}`
                        : "Not Graded"}
                    </div>
                  ) : (
                    <div className="px-4 py-2 rounded-lg font-bold text-base bg-red-900/30 text-red-400 border border-red-700">
                      0/{submission.maxGrade}
                    </div>
                  )}
                  <p className="text-xs text-slate-400 mt-1">{submission.attempts} attempt(s)</p>
                </div>
                {expandedStudent === submission.id ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </button>

            {/* Expanded Content - Improved UI */}
            {expandedStudent === submission.id && (
              <div className="px-5 pb-5 border-t border-slate-700/50 space-y-4 bg-slate-800/50">
                {submission.status === "submitted" ? (
                  <>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        Submission Content
                      </h3>
                      <div className="p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <p className="text-sm text-slate-300">[Student submission content would appear here]</p>
                        <Button variant="outline" className="mt-4 bg-slate-700 hover:bg-slate-600 border-slate-600">
                          Download Submission
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Grade ({submission.maxGrade} points)
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 relative">
                          <input
                            type="number"
                            value={submission.currentGrade ?? ""}
                            onChange={(e) => handleGradeChange(submission.id, Number.parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                            min="0"
                            max={submission.maxGrade}
                          />
                          <span className="absolute right-4 top-3 text-slate-400">/ {submission.maxGrade}</span>
                        </div>
                        {submission.currentGrade !== null && submission.currentGrade !== 0 && (
                          <div
                            className={`px-3 py-2 rounded-lg font-bold text-sm ${getGradeColor(submission.currentGrade)}`}
                          >
                            {submission.currentGrade >= 70
                              ? "Pass"
                              : submission.currentGrade >= 50
                                ? "Borderline"
                                : "Fail"}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg">
                    <p className="text-sm text-red-300 font-medium">
                      This student has not submitted yet. Mark as 0 or wait for submission.
                    </p>
                    <Button
                      onClick={() => handleGradeChange(submission.id, 0)}
                      className="mt-4 bg-red-600 hover:bg-red-700"
                    >
                      Mark as 0
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-end sticky bottom-6">
        <Button onClick={onBack} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleSaveGrades} className="bg-primary hover:bg-primary/90">
          Save All Grades
        </Button>
      </div>
    </div>
  )
}
