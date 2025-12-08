"use client"

import { useState } from "react"
import { Menu, X, User, BookOpen, BarChart3, Clock, Mail, LogOut } from "lucide-react"
import StudentProfile from "./pages/profile-page"
import SubjectsPage from "./pages/subjects-page"
import AttendancePage from "./pages/attendance-page"
import GradesPage from "./pages/grades-page"
import InboxPage from "./pages/inbox-page"
import SubjectDetail from "./pages/subject-detail-page"

interface StudentLayoutProps {
  onLogout: () => void
  studentName?: string
  initialPage?: "profile" | "subjects" | "attendance" | "grades" | "inbox"
}

export default function StudentLayout({ onLogout, studentName = "alex", initialPage = "profile" }: StudentLayoutProps) {
  const [currentPage, setCurrentPage] = useState<
    "profile" | "subjects" | "attendance" | "grades" | "inbox" | "subject-detail"
  >(initialPage)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<any>(null)

  const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "subjects", label: "Subjects", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "grades", label: "Grades", icon: BarChart3 },
    { id: "inbox", label: "Inbox", icon: Mail },
  ]

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId as any)
    setSidebarOpen(false)
  }

  const handleSubjectClick = (subject: any) => {
    setSelectedSubject(subject)
    setCurrentPage("subject-detail")
  }

  const handleInboxSubjectClick = (subjectName: string) => {
    const mockSubjects = [
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

    const subject = mockSubjects.find((s) => s.name === subjectName)
    if (subject) {
      handleSubjectClick(subject)
    }
  }

  const handleLogout = () => {
    setSidebarOpen(false)
    onLogout()
  }

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <StudentProfile studentName={studentName} />
      case "subjects":
        return <SubjectsPage onSubjectClick={handleSubjectClick} />
      case "attendance":
        return <AttendancePage onSubjectClick={handleSubjectClick} />
      case "grades":
        return <GradesPage onSubjectClick={handleSubjectClick} />
      case "inbox":
        return <InboxPage onSubjectClick={handleInboxSubjectClick} />
      case "subject-detail":
        return <SubjectDetail subject={selectedSubject} onBack={() => setCurrentPage("subjects")} />
      default:
        return (
          <div className="min-h-screen bg-gradient-to-b from-background to-background pt-24 px-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {studentName}!</h1>
              <p className="text-muted-foreground mb-12">Here's what's happening in your courses today.</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div
        className={`fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/50 shadow-lg transition-transform duration-300 z-50 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="bg-gradient-to-b from-primary to-primary/80 p-6 text-card-foreground">
          <div className="flex items-center gap-3 mb-2">
            <svg className="h-8 w-8" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 60 80 Q 50 80 50 90 L 50 160 Q 50 170 60 170 L 80 170 Q 90 170 90 160 L 90 110 M 90 110 L 110 60 Q 115 45 125 45 Q 135 45 140 55 L 140 160 Q 140 170 150 170 L 160 170 Q 170 170 170 160 L 160 90"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="65" y="95" width="8" height="50" fill="currentColor" rx="4" />
              <rect x="80" y="85" width="8" height="60" fill="currentColor" rx="4" />
              <rect x="95" y="90" width="8" height="55" fill="currentColor" rx="4" />
            </svg>
            <h2 className="text-xl font-bold">PRESENT</h2>
          </div>
          <p className="text-sm opacity-90">Student Portal</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary/20 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="md:ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 border-b border-border/50 bg-background/75 backdrop-blur-md">
          <div className="flex items-center justify-between p-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex-1" />
          </div>
        </header>

        <div>{renderPage()}</div>
      </main>
    </div>
  )
}

function DashboardHome({ studentName }: { studentName: string }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {studentName}!</h2>
        <p className="text-blue-100">You're all set to continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <div className="text-blue-400 text-3xl font-bold">5</div>
          <p className="text-slate-400">Active Subjects</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <div className="text-cyan-400 text-3xl font-bold">3</div>
          <p className="text-slate-400">Pending Tasks</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-sm">
          <div className="text-emerald-400 text-3xl font-bold">92%</div>
          <p className="text-slate-400">Overall Attendance</p>
        </div>
      </div>
    </div>
  )
}
