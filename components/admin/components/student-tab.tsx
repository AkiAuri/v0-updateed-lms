"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Eye, EyeOff, MoreVertical, Search, ArrowLeft } from "lucide-react"

interface Student {
  id: string
  studentNumber: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  curriculumYear: string
  currentYear: string
  semester: string
  section: string
  password: string
}

export default function StudentTab() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      studentNumber: "STU001",
      firstName: "Alice",
      middleName: "Marie",
      lastName: "Johnson",
      email: "alice.johnson@school.edu",
      curriculumYear: "3",
      currentYear: "1",
      semester: "1",
      section: "A",
      password: "Pass123!",
    },
    {
      id: "2",
      studentNumber: "STU002",
      firstName: "Robert",
      middleName: "James",
      lastName: "Smith",
      email: "robert.smith@school.edu",
      curriculumYear: "4",
      currentYear: "2",
      semester: "2",
      section: "B",
      password: "SecurePass456!",
    },
    {
      id: "3",
      studentNumber: "STU003",
      firstName: "Emma",
      middleName: "Grace",
      lastName: "Williams",
      email: "emma.williams@school.edu",
      curriculumYear: "3",
      currentYear: "1",
      semester: "1",
      section: "A",
      password: "MyPassword789!",
    },
    {
      id: "4",
      studentNumber: "STU004",
      firstName: "Michael",
      middleName: "David",
      lastName: "Brown",
      email: "michael.brown@school.edu",
      curriculumYear: "2",
      currentYear: "3",
      semester: "1",
      section: "C",
      password: "BrownPass123!",
    },
    {
      id: "5",
      studentNumber: "STU005",
      firstName: "Sophia",
      middleName: "Nicole",
      lastName: "Garcia",
      email: "sophia.garcia@school.edu",
      curriculumYear: "2",
      currentYear: "1",
      semester: "2",
      section: "A",
      password: "SophiaPass321!",
    },
  ])

  const [filterCurriculumYear, setFilterCurriculumYear] = useState("all")
  const [filterCurrentYear, setFilterCurrentYear] = useState("all")
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterSection, setFilterSection] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [studioMode, setStudioMode] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)

  const filteredStudents = students.filter((student) => {
    const matchesCurriculumYear = filterCurriculumYear === "all" || student.curriculumYear === filterCurriculumYear
    const matchesCurrentYear = filterCurrentYear === "all" || student.currentYear === filterCurrentYear
    const matchesSemester = filterSemester === "all" || student.semester === filterSemester
    const matchesSection = filterSection === "all" || student.section === filterSection
    const matchesSearch =
      searchTerm === "" ||
      student.studentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${student.firstName} ${student.middleName} ${student.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCurriculumYear && matchesCurrentYear && matchesSemester && matchesSection && matchesSearch
  })

  const handleAddStudent = () => {
    setEditingStudent(null)
    setStudioMode(true)
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setStudioMode(true)
  }

  const handleDeleteClick = (student: Student) => {
    setStudentToDelete(student)
    setShowDeleteAlert(true)
  }

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents(students.filter((s) => s.id !== studentToDelete.id))
      setShowDeleteAlert(false)
      setStudentToDelete(null)
    }
  }

  const handleSaveStudent = (formData: Student) => {
    if (editingStudent) {
      setStudents(students.map((s) => (s.id === editingStudent.id ? formData : s)))
    } else {
      setStudents([...students, { ...formData, id: Date.now().toString() }])
    }
    setStudioMode(false)
    setEditingStudent(null)
  }

  if (studioMode) {
    return (
      <StudentStudioPage
        initialData={editingStudent}
        onSave={handleSaveStudent}
        onCancel={() => {
          setStudioMode(false)
          setEditingStudent(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-48">
            <Label className="text-xs">Curriculum Year</Label>
            <Select value={filterCurriculumYear} onValueChange={setFilterCurriculumYear}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Filter by curriculum year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1">Year 1</SelectItem>
                <SelectItem value="2">Year 2</SelectItem>
                <SelectItem value="3">Year 3</SelectItem>
                <SelectItem value="4">Year 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-48">
            <Label className="text-xs">Current Year</Label>
            <Select value={filterCurrentYear} onValueChange={setFilterCurrentYear}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Filter by current year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1">Year 1</SelectItem>
                <SelectItem value="2">Year 2</SelectItem>
                <SelectItem value="3">Year 3</SelectItem>
                <SelectItem value="4">Year 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-48">
            <Label className="text-xs">Semester</Label>
            <Select value={filterSemester} onValueChange={setFilterSemester}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Filter by semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                <SelectItem value="1">First Semester</SelectItem>
                <SelectItem value="2">Second Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-48">
            <Label className="text-xs">Section</Label>
            <Select value={filterSection} onValueChange={setFilterSection}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Filter by section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="A">Grade 1A</SelectItem>
                <SelectItem value="B">Grade 1B</SelectItem>
                <SelectItem value="C">Grade 1C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Label className="text-xs">Search</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by number, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
              />
            </div>
          </div>
          <Button onClick={handleAddStudent} className="bg-blue-600 hover:bg-blue-700 text-white">
            Add New Student
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <div className="border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/50">
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Student Number</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Full Name</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Curriculum</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Current Year</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Semester</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Section</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 text-slate-100">{student.studentNumber}</td>
                <td className="py-3 px-4 text-slate-100">
                  {student.firstName} {student.middleName} {student.lastName}
                </td>
                <td className="py-3 px-4 text-slate-400 text-xs">{student.email}</td>
                <td className="py-3 px-4 text-slate-100">{student.curriculumYear}</td>
                <td className="py-3 px-4 text-slate-100">{student.currentYear}</td>
                <td className="py-3 px-4 text-slate-100">{student.semester}</td>
                <td className="py-3 px-4 text-slate-100">{student.section}</td>
                <td className="py-3 px-4 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-300">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem
                        onClick={() => handleEditStudent(student)}
                        className="text-slate-200 cursor-pointer hover:bg-slate-700"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(student)}
                        className="text-red-400 cursor-pointer hover:bg-slate-700"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Student Account?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete {studentToDelete?.firstName} {studentToDelete?.lastName}'s account? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel className="bg-slate-700 text-slate-200 hover:bg-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function StudentStudioPage({
  initialData,
  onSave,
  onCancel,
}: {
  initialData: Student | null
  onSave: (data: Student) => void
  onCancel: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<Student>(
    initialData || {
      id: "",
      studentNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      curriculumYear: "",
      currentYear: "",
      semester: "",
      section: "",
      password: "",
    },
  )

  const handleSave = () => {
    onSave(formData)
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-4 pb-6 border-b border-slate-700">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {initialData ? "Edit Student Credentials" : "Create Student Credentials"}
          </h1>
          <p className="text-slate-400 text-sm">
            {initialData ? "Update student account information" : "Create a new student account"}
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="studentNumber" className="text-slate-200">
            Student Number
          </Label>
          <Input
            id="studentNumber"
            placeholder="STU001"
            value={formData.studentNumber}
            onChange={(e) => setFormData({ ...formData, studentNumber: e.target.value })}
            className="mt-2 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-slate-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="student@school.edu"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-2 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
          />
        </div>
        <div>
          <Label htmlFor="firstName" className="text-slate-200">
            First Name
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-2 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
          />
        </div>
        <div>
          <Label htmlFor="middleName" className="text-slate-200">
            Middle Name
          </Label>
          <Input
            id="middleName"
            placeholder="David"
            value={formData.middleName}
            onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
            className="mt-2 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
          />
        </div>
        <div>
          <Label htmlFor="lastName" className="text-slate-200">
            Last Name
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="mt-2 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-slate-200">
            Password
          </Label>
          <div className="relative mt-2">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-slate-900 border-slate-600 text-white placeholder-slate-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="curriculumYear" className="text-slate-200">
            Curriculum Year
          </Label>
          <Select
            value={formData.curriculumYear}
            onValueChange={(value) => setFormData({ ...formData, curriculumYear: value })}
          >
            <SelectTrigger className="mt-2 bg-slate-900 border-slate-600 text-white" id="curriculumYear">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-600">
              <SelectItem value="1">Year 1</SelectItem>
              <SelectItem value="2">Year 2</SelectItem>
              <SelectItem value="3">Year 3</SelectItem>
              <SelectItem value="4">Year 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="currentYear" className="text-slate-200">
            Current Year
          </Label>
          <Select
            value={formData.currentYear}
            onValueChange={(value) => setFormData({ ...formData, currentYear: value })}
          >
            <SelectTrigger className="mt-2 bg-slate-900 border-slate-600 text-white" id="currentYear">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-600">
              <SelectItem value="1">Year 1</SelectItem>
              <SelectItem value="2">Year 2</SelectItem>
              <SelectItem value="3">Year 3</SelectItem>
              <SelectItem value="4">Year 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="semester" className="text-slate-200">
            Semester
          </Label>
          <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
            <SelectTrigger className="mt-2 bg-slate-900 border-slate-600 text-white" id="semester">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-600">
              <SelectItem value="1">First Semester</SelectItem>
              <SelectItem value="2">Second Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="section" className="text-slate-200">
            Section
          </Label>
          <Select value={formData.section} onValueChange={(value) => setFormData({ ...formData, section: value })}>
            <SelectTrigger className="mt-2 bg-slate-900 border-slate-600 text-white" id="section">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-600">
              <SelectItem value="A">Grade 1A</SelectItem>
              <SelectItem value="B">Grade 1B</SelectItem>
              <SelectItem value="C">Grade 1C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end pt-6 border-t border-slate-700">
        <Button
          onClick={onCancel}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
        >
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
          {initialData ? "Update Student" : "Create Student"}
        </Button>
      </div>
    </div>
  )
}
