"use client"

import { useState } from "react"
import { ArrowLeft, FileText, Clock, BarChart3, Play, AlertCircle, Upload } from "lucide-react"

interface SubjectDetailProps {
  subject: any
  onBack: () => void
}

// Data structure definitions
const contentFolders = {
  quiz: {
    name: "Quiz",
    tasks: [
      {
        id: "1",
        title: "Quiz 1: Functions and Loops",
        dueDate: "2024-12-15",
        dueTime: "11:59 PM",
        submitted: false,
        graded: false,
        grade: null,
        attempts: 0,
        maxAttempts: 3,
        isLate: false,
        instructions: "Complete the quiz on functions and loops concepts. Answer all questions carefully.",
        submittedFiles: [],
      },
      {
        id: "2",
        title: "Quiz 2: Arrays",
        dueDate: "2024-12-22",
        dueTime: "11:59 PM",
        submitted: false,
        graded: false,
        grade: null,
        attempts: 0,
        maxAttempts: 3,
        isLate: false,
        instructions: "Answer all questions about array data structures.",
        submittedFiles: [],
      },
    ],
  },
  seatwork: {
    name: "Seatwork",
    tasks: [
      {
        id: "3",
        title: "Seatwork 1: Problem Solving",
        dueDate: "2024-12-18",
        dueTime: "5:00 PM",
        submitted: true,
        graded: true,
        grade: 95,
        attempts: 1,
        maxAttempts: 2,
        isLate: false,
        instructions: "Solve the given programming problems.",
        submittedFiles: ["solution_v1.pdf"],
      },
    ],
  },
  homework: {
    name: "Homework",
    tasks: [
      {
        id: "4",
        title: "Homework 1: Recursion Practice",
        dueDate: "2024-12-20",
        dueTime: "11:59 PM",
        submitted: true,
        graded: true,
        grade: 88,
        attempts: 2,
        maxAttempts: 3,
        isLate: false,
        instructions: "Complete all recursion exercises.",
        submittedFiles: ["hw1_first_attempt.pdf", "hw1_final.pdf"],
      },
    ],
  },
}

const attendanceRecords = [
  { date: "2024-12-13", status: "present", grade: "100%" },
  { date: "2024-12-12", status: "present", grade: "100%" },
  { date: "2024-12-11", status: "absent", grade: "0%" },
  { date: "2024-12-10", status: "present", grade: "100%" },
]

const gradeRecords = [
  { taskId: "1", task: "Quiz 1", date: "2024-12-15", submitted: "Submitted", graded: true, grade: 92 },
  { taskId: "3", task: "Seatwork 1", date: "2024-12-18", submitted: "Submitted", graded: true, grade: 95 },
  { taskId: "4", task: "Homework 1", date: "2024-12-20", submitted: "Submitted", graded: true, grade: 88 },
]

export default function SubjectDetail({ subject, onBack }: SubjectDetailProps) {
  const [activeTab, setActiveTab] = useState<"content" | "attendance" | "grades">("content")
  const [showSessionModal, setShowSessionModal] = useState(false)
  const [sessionActive, setSessionActive] = useState(true)
  const [expandedFolder, setExpandedFolder] = useState<string | null>("quiz")
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null)

  const toggleFolder = (folder: string) => {
    setExpandedFolder(expandedFolder === folder ? null : folder)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Subjects
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-8 shadow-lg mx-6 mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{subject.name}</h1>
        <p className="text-blue-100 text-lg">
          {subject.code} • {subject.instructor} • {subject.dayTime}
        </p>
      </div>

      {sessionActive && (
        <div className="mx-6 mb-6 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="text-amber-400 mt-0.5" />
              <div>
                <h3 className="font-bold text-white flex items-center gap-2 mb-1">New Attendance Session!</h3>
                <p className="text-sm text-slate-300">
                  Your instructor has opened an attendance session. Click below to join and scan the QR code.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSessionModal(true)}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all whitespace-nowrap"
            >
              Join Session!
            </button>
          </div>
        </div>
      )}

      <div className="mx-6 flex gap-2 border-b border-slate-700/50 overflow-x-auto">
        {[
          { id: "content", label: "Content", icon: FileText },
          { id: "attendance", label: "Attendance", icon: Clock },
          { id: "grades", label: "Grades", icon: BarChart3 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 font-medium border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {selectedSubmission ? (
        <div className="min-h-screen bg-slate-900">
          <div className="max-w-6xl mx-auto">
            {/* Submission Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700/50 z-40">
              <div className="flex items-center justify-between px-6 py-4">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back to Content
                </button>
                <div className="text-sm text-slate-400">Submission Details</div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="p-6 space-y-8">
              {(() => {
                let task = null
                for (const folder of Object.values(contentFolders)) {
                  const found = (folder as any).tasks.find((t: any) => t.id === selectedSubmission)
                  if (found) {
                    task = found
                    break
                  }
                }

                if (!task) return null

                return (
                  <>
                    {/* Title Section */}
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-4">{task.title}</h1>
                      <div className="flex flex-wrap gap-4 text-slate-400">
                        <div className="flex items-center gap-2">
                          <Clock size={18} />
                          Due: {task.dueDate} at {task.dueTime}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Column - Task Details */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Instructions */}
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                          <h2 className="text-xl font-bold text-white mb-4">Instructions</h2>
                          <p className="text-slate-300 leading-relaxed">{task.instructions}</p>
                        </div>

                        {/* File Upload Section */}
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                          <h2 className="text-xl font-bold text-white mb-4">Submit Your Files</h2>
                          <div className="space-y-4">
                            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                              <Upload size={32} className="mx-auto mb-3 text-slate-400" />
                              <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                              <p className="text-sm text-slate-400">
                                Text, Docs, PPT, Excel, Pictures, PDF, Links, Videos
                              </p>
                              <input type="file" multiple className="hidden" />
                            </div>
                            <p className="text-xs text-slate-400 text-center">Maximum file size: 50MB per file</p>
                            <button className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                              <Upload size={18} />
                              Submit Assignment
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Status Cards */}
                      <div className="space-y-4">
                        {/* Status Cards */}
                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                          <p className="text-sm text-slate-400 mb-2">Submission Status</p>
                          <p className={`text-2xl font-bold ${task.submitted ? "text-green-400" : "text-slate-400"}`}>
                            {task.submitted ? "Submitted" : "Not Submitted"}
                          </p>
                        </div>

                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                          <p className="text-sm text-slate-400 mb-2">Grading Status</p>
                          <p className={`text-2xl font-bold ${task.graded ? "text-green-400" : "text-slate-400"}`}>
                            {task.graded ? "Graded" : "Pending"}
                          </p>
                        </div>

                        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                          <p className="text-sm text-slate-400 mb-2">Attempts Used</p>
                          <p className="text-2xl font-bold text-cyan-400">
                            {task.attempts}/{task.maxAttempts}
                          </p>
                        </div>

                        <div
                          className={`rounded-xl p-6 border ${
                            task.isLate ? "bg-red-900/20 border-red-700/50" : "bg-green-900/20 border-green-700/50"
                          }`}
                        >
                          <p className="text-sm text-slate-400 mb-2">Late Submission</p>
                          <p className={`text-lg font-bold ${task.isLate ? "text-red-400" : "text-green-400"}`}>
                            {task.isLate ? "Yes" : "No"}
                          </p>
                        </div>

                        {task.grade && (
                          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-xl p-6">
                            <p className="text-sm text-slate-400 mb-2">Your Grade</p>
                            <p className="text-3xl font-bold text-cyan-400">{task.grade}/100</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-6 my-6">
          {activeTab === "content" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Tasks & Assignments</h2>

              {Object.entries(contentFolders).map(([key, folder]: [string, any]) => (
                <div key={key} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleFolder(key)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-blue-400" />
                      <span className="font-semibold text-white">{folder.name}</span>
                      <span className="text-sm text-slate-400">({folder.tasks.length})</span>
                    </div>
                    <span className={`transition-transform ${expandedFolder === key ? "rotate-180" : ""}`}>▼</span>
                  </button>

                  {expandedFolder === key && (
                    <div className="border-t border-slate-700/50 space-y-2 p-4">
                      {folder.tasks.map((task: any) => (
                        <button
                          key={task.id}
                          onClick={() => setSelectedSubmission(task.id)}
                          className="w-full p-4 bg-slate-900 hover:bg-slate-900/80 border border-slate-700/50 hover:border-blue-500/50 rounded-lg text-left transition-all"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-white">{task.title}</h4>
                              <p className="text-sm text-slate-400 mt-1">
                                Due: {task.dueDate} at {task.dueTime}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                  task.submitted
                                    ? task.graded
                                      ? "bg-green-900/30 text-green-300"
                                      : "bg-blue-900/30 text-blue-300"
                                    : "bg-slate-700 text-slate-300"
                                }`}
                              >
                                {task.submitted ? (task.graded ? "Graded" : "Submitted") : "Not Submitted"}
                              </span>
                              {task.grade && <span className="text-lg font-bold text-cyan-400">{task.grade}</span>}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Overall Score</p>
                    <p className="text-3xl font-bold text-cyan-400">92%</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Present</p>
                    <p className="text-3xl font-bold text-green-400">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Absent</p>
                    <p className="text-3xl font-bold text-red-400">1</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {attendanceRecords.map((record, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors"
                    >
                      <span className="text-white font-medium">{record.date}</span>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            record.status === "present"
                              ? "bg-green-900/30 text-green-300 border border-green-700/50"
                              : "bg-red-900/30 text-red-300 border border-red-700/50"
                          }`}
                        >
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                        <span className="text-slate-400 font-semibold">{record.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "grades" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white mb-4">Grade Records</h2>
              {gradeRecords.map((record, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSubmission(record.taskId)}
                  className="w-full bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-5 transition-all text-left"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="font-bold text-white">{record.task}</h3>
                      <p className="text-sm text-slate-400">{record.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          record.graded
                            ? "bg-green-900/30 text-green-300 border border-green-700/50"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {record.graded ? "Graded" : "Pending"}
                      </span>
                      {record.grade && <span className="text-2xl font-bold text-cyan-400">{record.grade}</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {showSessionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Play size={24} />
                Attendance Session
              </h3>
              <button onClick={() => setShowSessionModal(false)} className="text-white/80 hover:text-white">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-center">
                <p className="text-slate-300 mb-2 font-semibold">Session Timer</p>
                <p className="text-3xl font-bold text-amber-400">10:30</p>
                <p className="text-xs text-slate-400 mt-2">Time remaining to mark attendance</p>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 text-center">
                <p className="text-slate-300 mb-3">Scan the QR code provided by your instructor</p>
                <div className="w-full h-48 bg-slate-800 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText size={32} className="mx-auto text-slate-600 mb-2" />
                    <p className="text-sm text-slate-500">QR Scanner</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowSessionModal(false)
                  setSessionActive(false)
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all"
              >
                Confirm Attendance
              </button>
              <button
                onClick={() => setShowSessionModal(false)}
                className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
