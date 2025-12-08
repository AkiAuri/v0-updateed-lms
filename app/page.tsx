"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"
import LoginPage from "@/components/login-page"
import TeacherDashboard from "@/components/teacher-dashboard"
import StudentLayout from "@/components/student/student-layout"
import InstructorLayout from "@/components/instructor/instructor-layout"
import AdminLayout from "@/components/admin/admin-layout"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"landing" | "login" | "teacher" | "admin" | "student" | "instructor">(
    "landing",
  )
  const [userRole, setUserRole] = useState<"teacher" | "admin" | "student" | "instructor" | null>(null)
  const [userName, setUserName] = useState<string>("")

  const handleLogin = (role: "teacher" | "admin" | "student" | "instructor", username?: string) => {
    setUserRole(role)
    setUserName(username || "")
    if (role === "teacher" || role === "instructor") {
      setCurrentPage("instructor")
    } else if (role === "admin") {
      setCurrentPage("admin")
    } else if (role === "student") {
      setCurrentPage("student")
    }
  }

  const handleLogout = () => {
    setUserRole(null)
    setUserName("")
    setCurrentPage("landing")
  }

  const renderPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigate={(page) => setCurrentPage(page)} />
      case "login":
        return <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage("landing")} />
      case "teacher":
        return <TeacherDashboard onLogout={handleLogout} />
      case "admin":
        return <AdminLayout onLogout={handleLogout} />
      case "student":
        return <StudentLayout onLogout={handleLogout} studentName={userName} initialPage="profile" />
      case "instructor":
        return <InstructorLayout onLogout={handleLogout} instructorName={userName} initialPage="profile" />
      default:
        return <LandingPage onNavigate={(page) => setCurrentPage(page)} />
    }
  }

  return <div className="min-h-screen w-full bg-background overflow-x-hidden">{renderPage()}</div>
}
