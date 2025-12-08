"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, RefreshCw, Eye, EyeOff, Check, X, Maximize2 } from "lucide-react"

interface SessionStudioProps {
  subject: any
  isNewSession?: boolean
  sessionId?: string
  onBack: () => void
  onSessionSave?: (sessionData: any) => void
}

interface StudentAttendance {
  id: string
  name: string
  status: "present" | "absent" | "pending"
  grade: number
}

export default function SessionStudio({
  subject,
  isNewSession = true,
  sessionId,
  onBack,
  onSessionSave,
}: SessionStudioProps) {
  const [sessionVisible, setSessionVisible] = useState(true)
  const [showQRCode, setShowQRCode] = useState(false)
  const [qrFullscreen, setQrFullscreen] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [sessionEnded, setSessionEnded] = useState(false)
  const [dueDate, setDueDate] = useState("")
  const [dueTime, setDueTime] = useState("")

  const [students, setStudents] = useState<StudentAttendance[]>([
    { id: "1", name: "Alexander Torres", status: "pending", grade: 0 },
    { id: "2", name: "Benjamin Martinez", status: "pending", grade: 0 },
    { id: "3", name: "Catherine Lopez", status: "pending", grade: 0 },
    { id: "4", name: "Diana Johnson", status: "pending", grade: 0 },
    { id: "5", name: "Edwin Garcia", status: "pending", grade: 0 },
    { id: "6", name: "Fiona Anderson", status: "pending", grade: 0 },
    { id: "7", name: "Gregory Williams", status: "pending", grade: 0 },
    { id: "8", name: "Hannah Brown", status: "pending", grade: 0 },
    { id: "9", name: "Isaac Davis", status: "pending", grade: 0 },
    { id: "10", name: "Julia Miller", status: "pending", grade: 0 },
  ])

  const generateQRCode = () => {
    const code = `SESSION-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    setQrCode(code)
    setShowQRCode(true)
  }

  const regenerateQRCode = () => {
    generateQRCode()
  }

  const handleMarkStudent = (studentId: string, status: "present" | "absent") => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status,
              grade: status === "present" ? 100 : 0,
            }
          : student,
      ),
    )
  }

  const handleConfirmSession = () => {
    if (students.some((s) => s.status === "pending")) {
      alert("Please mark all students as present or absent before confirming.")
      return
    }

    const sessionData = {
      subject: subject.name,
      visibility: sessionVisible ? "public" : "hidden",
      dueDate,
      dueTime,
      students: students,
      timestamp: new Date().toISOString(),
    }

    console.log("[v0] Session Data:", sessionData)

    onSessionSave?.(sessionData)

    alert("Session confirmed! Attendance records have been updated.")
    setSessionEnded(true)
    setTimeout(() => {
      onBack()
    }, 1500)
  }

  const presentCount = students.filter((s) => s.status === "present").length
  const absentCount = students.filter((s) => s.status === "absent").length
  const pendingCount = students.filter((s) => s.status === "pending").length

  if (qrFullscreen && showQRCode && qrCode) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-80 h-80 bg-white p-8 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs font-mono text-gray-800 mb-2">QR CODE</p>
              <p className="text-4xl font-bold text-gray-800">{qrCode.substring(0, 8)}</p>
              <p className="text-xs text-gray-600 mt-2">Scan with phone camera</p>
            </div>
          </div>
          <p className="text-white text-xl font-mono">{qrCode}</p>
          <Button onClick={() => setQrFullscreen(false)} className="bg-red-600 hover:bg-red-700">
            Exit Fullscreen
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-primary hover:text-primary/80">
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <h1 className="text-2xl font-bold text-white">{isNewSession ? "Create New Session" : "Edit Session"}</h1>
      </div>

      {/* Session Header */}
      <Card className="border border-slate-700/50 bg-slate-900">
        <CardHeader>
          <CardTitle>{subject?.name}</CardTitle>
          <CardDescription>{subject?.section}</CardDescription>
        </CardHeader>
      </Card>

      {/* Session Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Session Visibility */}
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg">Session Visibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                onClick={() => setSessionVisible(true)}
                className={sessionVisible ? "bg-green-600 hover:bg-green-700" : "bg-slate-700 hover:bg-slate-600"}
              >
                Public
              </Button>
              <Button
                onClick={() => setSessionVisible(false)}
                className={!sessionVisible ? "bg-amber-600 hover:bg-amber-700" : "bg-slate-700 hover:bg-slate-600"}
              >
                Hidden
              </Button>
            </div>
            <p className="text-xs text-slate-400">
              {sessionVisible ? "Session is visible to students" : "Session is hidden from students"}
            </p>
          </CardContent>
        </Card>

        {/* Due Date & Time */}
        <Card className="border border-slate-700/50 bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg">Due Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-2 block">Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-2 block">Time</label>
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* QR Code Section */}
      <Card className="border border-slate-700/50 bg-slate-900">
        <CardHeader>
          <CardTitle>QR Code</CardTitle>
          <CardDescription>Students scan this code to mark attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button onClick={isNewSession ? generateQRCode : regenerateQRCode} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              {isNewSession ? "Generate QR Code" : "Regenerate QR Code"}
            </Button>
            <Button onClick={() => setShowQRCode(!showQRCode)} variant="outline" className="gap-2">
              {showQRCode ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  View
                </>
              )}
            </Button>
          </div>

          {showQRCode && qrCode && (
            <div className="flex flex-col items-center gap-4 p-4 bg-slate-800 rounded-lg">
              <div className="w-48 h-48 bg-white p-4 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-mono text-gray-800 mb-2">QR CODE</p>
                  <p className="text-2xl font-bold text-gray-800">{qrCode.substring(0, 8)}</p>
                  <p className="text-xs text-gray-600 mt-2">Scan with phone camera</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center">Code: {qrCode}</p>
              <Button onClick={() => setQrFullscreen(true)} className="gap-2 bg-blue-600 hover:bg-blue-700">
                <Maximize2 className="h-4 w-4" />
                Fullscreen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Attendance */}
      <Card className="border border-slate-700/50 bg-slate-900">
        <CardHeader>
          <CardTitle>Student Attendance & Grades</CardTitle>
          <CardDescription>Manage attendance for {subject?.totalStudents || 0} students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-slate-800 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-400">{presentCount}</p>
              <p className="text-xs text-slate-400">Present (100%)</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg text-center">
              <p className="text-2xl font-bold text-red-400">{absentCount}</p>
              <p className="text-xs text-slate-400">Absent (0%)</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-lg text-center">
              <p className="text-2xl font-bold text-amber-400">{pendingCount}</p>
              <p className="text-xs text-slate-400">Pending</p>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-4 bg-slate-800 border border-slate-700/50 rounded-lg flex items-center justify-between"
              >
                <div className="flex-1">
                  <p className="font-medium text-white">{student.name}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>
                      {student.status === "present" && "✓ Present"}
                      {student.status === "absent" && "✗ Absent"}
                      {student.status === "pending" && "⏳ Pending"}
                    </span>
                    <span
                      className={`font-semibold ${
                        student.grade === 100
                          ? "text-green-400"
                          : student.grade === 0 && student.status !== "pending"
                            ? "text-red-400"
                            : "text-slate-500"
                      }`}
                    >
                      {student.status !== "pending" && `Grade: ${student.grade}%`}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleMarkStudent(student.id, "present")}
                    className={`gap-1 ${
                      student.status === "present"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                    size="sm"
                  >
                    <Check className="h-4 w-4" />
                    Present
                  </Button>
                  <Button
                    onClick={() => handleMarkStudent(student.id, "absent")}
                    className={`gap-1 ${
                      student.status === "absent" ? "bg-red-600 hover:bg-red-700" : "bg-slate-700 hover:bg-slate-600"
                    }`}
                    size="sm"
                  >
                    <X className="h-4 w-4" />
                    Absent
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2 justify-end">
        <Button onClick={onBack} variant="outline">
          Cancel
        </Button>
        <Button onClick={handleConfirmSession} className="bg-primary hover:bg-primary/90">
          {sessionEnded ? "Session Confirmed" : "Confirm Session"}
        </Button>
      </div>
    </div>
  )
}
