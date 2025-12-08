export interface Subject {
  id: string
  name: string
  code: string
  section: string
  dayTime: string
  semester: string
  year: string
  instructor: string
  totalStudents: number
  color: string
}

export interface Task {
  id: string
  subjectId: string
  title: string
  category: "assignment" | "quiz" | "seatwork" | "homework"
  description: string
  dueDate: string
  dueTime: string
  maxAttempts: number
  status: "active" | "closed"
}

export interface AttendanceSession {
  id: string
  subjectId: string
  date: string
  time: string
  endTime: string
  qrCode: string
  visibility: "public" | "hidden"
  participants: StudentAttendance[]
}

export interface StudentAttendance {
  studentId: string
  studentName: string
  status: "present" | "absent" | "pending"
  grade: number | null
  scannedTime?: string
}

export interface StudentSubmission {
  id: string
  taskId: string
  subjectId: string
  studentId: string
  studentName: string
  submissionDate: string
  grade: number | null
  maxGrade: number
  attempts: number
  status: "submitted" | "not-submitted"
  feedback?: string
}

export interface InstructorGrade {
  studentId: string
  studentName: string
  subjectId: string
  taskId: string
  grade: number
  maxGrade: number
  feedback: string
}

// Mock database - In production, this would be replaced with actual API calls
export const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Data Structures",
    code: "CS 201",
    section: "Section A",
    dayTime: "Mon & Wed, 10:00 AM - 11:30 AM",
    semester: "1st",
    year: "2024",
    instructor: "Dr. Maria Santos",
    totalStudents: 45,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "2",
    name: "Database Systems",
    code: "CS 202",
    section: "Section B",
    dayTime: "Tue & Thu, 2:00 PM - 3:30 PM",
    semester: "1st",
    year: "2024",
    instructor: "Prof. Juan Dela Cruz",
    totalStudents: 38,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "3",
    name: "Web Development",
    code: "CS 203",
    section: "Section A",
    dayTime: "Mon & Wed, 1:00 PM - 2:30 PM",
    semester: "2nd",
    year: "2024",
    instructor: "Engr. Ana Reyes",
    totalStudents: 52,
    color: "from-green-500 to-green-600",
  },
]

export const mockTasks: Task[] = [
  {
    id: "1",
    subjectId: "1",
    title: "Assignment 1: Linked Lists",
    category: "assignment",
    description: "Implement basic linked list operations",
    dueDate: "2024-12-20",
    dueTime: "11:59 PM",
    maxAttempts: 3,
    status: "active",
  },
  {
    id: "2",
    subjectId: "1",
    title: "Quiz 1: Basic Concepts",
    category: "quiz",
    description: "Quiz covering fundamental concepts",
    dueDate: "2024-12-18",
    dueTime: "5:00 PM",
    maxAttempts: 1,
    status: "closed",
  },
  {
    id: "3",
    subjectId: "3",
    title: "Project: Responsive Design",
    category: "assignment",
    description: "Create a responsive website",
    dueDate: "2024-12-19",
    dueTime: "11:59 PM",
    maxAttempts: 5,
    status: "active",
  },
]

export const mockAttendanceSessions: AttendanceSession[] = [
  {
    id: "1",
    subjectId: "1",
    date: "2024-12-18",
    time: "10:00 AM",
    endTime: "10:00 AM",
    qrCode: "SESSION-1702884000-abc123def",
    visibility: "public",
    participants: [
      { studentId: "1", studentName: "John Doe", status: "present", grade: 100 },
      { studentId: "2", studentName: "Jane Smith", status: "present", grade: 100 },
      { studentId: "3", studentName: "Mike Johnson", status: "absent", grade: 0 },
    ],
  },
]

export const mockSubmissions: StudentSubmission[] = [
  {
    id: "1",
    taskId: "1",
    subjectId: "1",
    studentId: "1",
    studentName: "John Doe",
    submissionDate: "2024-12-15 10:30 AM",
    grade: 92,
    maxGrade: 100,
    attempts: 1,
    status: "submitted",
    feedback: "Great implementation!",
  },
  {
    id: "2",
    taskId: "1",
    subjectId: "1",
    studentId: "2",
    studentName: "Jane Smith",
    submissionDate: "2024-12-15 2:15 PM",
    grade: 88,
    maxGrade: 100,
    attempts: 2,
    status: "submitted",
    feedback: "Good work, but could optimize further.",
  },
]

// Data access functions
export function getSubjectById(id: string): Subject | undefined {
  return mockSubjects.find((s) => s.id === id)
}

export function getTasksBySubject(subjectId: string): Task[] {
  return mockTasks.filter((t) => t.subjectId === subjectId)
}

export function getAttendanceSessionsBySubject(subjectId: string): AttendanceSession[] {
  return mockAttendanceSessions.filter((s) => s.subjectId === subjectId)
}

export function getSubmissionsByTask(taskId: string): StudentSubmission[] {
  return mockSubmissions.filter((s) => s.taskId === taskId)
}

export function getStudentSubmissions(studentId: string): StudentSubmission[] {
  return mockSubmissions.filter((s) => s.studentId === studentId)
}

export function updateSubmissionGrade(
  submissionId: string,
  grade: number,
  feedback: string,
): StudentSubmission | undefined {
  const submission = mockSubmissions.find((s) => s.id === submissionId)
  if (submission) {
    submission.grade = grade
    submission.feedback = feedback
  }
  return submission
}

export function addAttendanceSession(session: AttendanceSession): void {
  mockAttendanceSessions.push(session)
}

export function markStudentAttendance(sessionId: string, studentId: string, status: "present" | "absent"): void {
  const session = mockAttendanceSessions.find((s) => s.id === sessionId)
  if (session) {
    const participant = session.participants.find((p) => p.studentId === studentId)
    if (participant) {
      participant.status = status
      participant.grade = status === "present" ? 100 : 0
    }
  }
}
