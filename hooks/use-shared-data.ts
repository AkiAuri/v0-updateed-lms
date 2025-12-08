"use client"

import { useState, useCallback } from "react"
import {
  mockSubjects,
  mockTasks,
  mockAttendanceSessions,
  mockSubmissions,
  getSubjectById,
  getTasksBySubject,
  getAttendanceSessionsBySubject,
  getSubmissionsByTask,
  getStudentSubmissions,
  type AttendanceSession,
} from "@/lib/data-context"

export function useSharedData() {
  const [subjects] = useState(mockSubjects)
  const [tasks] = useState(mockTasks)
  const [attendanceSessions, setAttendanceSessions] = useState(mockAttendanceSessions)
  const [submissions, setSubmissions] = useState(mockSubmissions)

  const addSession = useCallback((session: AttendanceSession) => {
    setAttendanceSessions((prev) => [...prev, session])
  }, [])

  const updateGrade = useCallback((submissionId: string, grade: number, feedback: string) => {
    setSubmissions((prev) => prev.map((sub) => (sub.id === submissionId ? { ...sub, grade, feedback } : sub)))
  }, [])

  const markAttendance = useCallback((sessionId: string, studentId: string, status: "present" | "absent") => {
    setAttendanceSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              participants: session.participants.map((p) =>
                p.studentId === studentId ? { ...p, status, grade: status === "present" ? 100 : 0 } : p,
              ),
            }
          : session,
      ),
    )
  }, [])

  return {
    subjects,
    tasks,
    attendanceSessions,
    submissions,
    addSession,
    updateGrade,
    markAttendance,
    getSubjectById,
    getTasksBySubject,
    getAttendanceSessionsBySubject,
    getSubmissionsByTask,
    getStudentSubmissions,
  }
}
