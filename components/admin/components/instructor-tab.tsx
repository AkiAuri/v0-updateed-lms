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

interface Instructor {
  id: string
  instructorNumber: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  department: string
  schoolYear: string
  semester: string
  password: string
}

export default function InstructorTab() {
  const [instructors, setInstructors] = useState<Instructor[]>([
    {
      id: "1",
      instructorNumber: "INS001",
      firstName: "Robert",
      middleName: "William",
      lastName: "Smith",
      email: "robert.smith@school.edu",
      department: "Mathematics",
      schoolYear: "2024-2025",
      semester: "1",
      password: "InstruPass123!",
    },
    {
      id: "2",
      instructorNumber: "INS002",
      firstName: "Jennifer",
      middleName: "Louise",
      lastName: "Davis",
      email: "jennifer.davis@school.edu",
      department: "English",
      schoolYear: "2024-2025",
      semester: "1",
      password: "EnglishPro456!",
    },
    {
      id: "3",
      instructorNumber: "INS003",
      firstName: "Charles",
      middleName: "Henry",
      lastName: "Wilson",
      email: "charles.wilson@school.edu",
      department: "Science",
      schoolYear: "2024-2025",
      semester: "2",
      password: "ScienceExp789!",
    },
    {
      id: "4",
      instructorNumber: "INS004",
      firstName: "Margaret",
      middleName: "Anne",
      lastName: "Taylor",
      email: "margaret.taylor@school.edu",
      department: "Mathematics",
      schoolYear: "2023-2024",
      semester: "1",
      password: "MargPass123!",
    },
  ])

  const [filterSchoolYear, setFilterSchoolYear] = useState("all")
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null)
  const [studioMode, setStudioMode] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [instructorToDelete, setInstructorToDelete] = useState<Instructor | null>(null)

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSchoolYear = filterSchoolYear === "all" || instructor.schoolYear === filterSchoolYear
    const matchesSemester = filterSemester === "all" || instructor.semester === filterSemester
    const matchesDepartment =
      filterDepartment === "all" || instructor.department.toLowerCase() === filterDepartment.toLowerCase()
    const matchesSearch =
      searchTerm === "" ||
      instructor.instructorNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${instructor.firstName} ${instructor.middleName} ${instructor.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSchoolYear && matchesSemester && matchesDepartment && matchesSearch
  })

  const handleAddInstructor = () => {
    setEditingInstructor(null)
    setStudioMode(true)
  }

  const handleEditInstructor = (instructor: Instructor) => {
    setEditingInstructor(instructor)
    setStudioMode(true)
  }

  const handleDeleteClick = (instructor: Instructor) => {
    setInstructorToDelete(instructor)
    setShowDeleteAlert(true)
  }

  const handleConfirmDelete = () => {
    if (instructorToDelete) {
      setInstructors(instructors.filter((i) => i.id !== instructorToDelete.id))
      setShowDeleteAlert(false)
      setInstructorToDelete(null)
    }
  }

  const handleSaveInstructor = (formData: Instructor) => {
    if (editingInstructor) {
      setInstructors(instructors.map((i) => (i.id === editingInstructor.id ? formData : i)))
    } else {
      setInstructors([...instructors, { ...formData, id: Date.now().toString() }])
    }
    setStudioMode(false)
    setEditingInstructor(null)
  }

  if (studioMode) {
    return (
      <InstructorStudioPage
        initialData={editingInstructor}
        onSave={handleSaveInstructor}
        onCancel={() => {
          setStudioMode(false)
          setEditingInstructor(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-48">
            <Label className="text-xs">School Year</Label>
            <Select value={filterSchoolYear} onValueChange={setFilterSchoolYear}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Filter by school year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024-2025">2024-2025</SelectItem>
                <SelectItem value="2023-2024">2023-2024</SelectItem>
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
            <Label className="text-xs">Department</Label>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
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
          <Button onClick={handleAddInstructor} className="bg-blue-600 hover:bg-blue-700 text-white">
            Add New Instructor
          </Button>
        </div>
      </div>

      {/* Instructors Table */}
      <div className="border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/50">
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Instructor Number</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Full Name</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Department</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">School Year</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Semester</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstructors.map((instructor) => (
              <tr key={instructor.id} className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 text-slate-100">{instructor.instructorNumber}</td>
                <td className="py-3 px-4 text-slate-100">
                  {instructor.firstName} {instructor.middleName} {instructor.lastName}
                </td>
                <td className="py-3 px-4 text-slate-400 text-xs">{instructor.email}</td>
                <td className="py-3 px-4 text-slate-100">{instructor.department}</td>
                <td className="py-3 px-4 text-slate-100">{instructor.schoolYear}</td>
                <td className="py-3 px-4 text-slate-100">{instructor.semester}</td>
                <td className="py-3 px-4 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-300">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem
                        onClick={() => handleEditInstructor(instructor)}
                        className="text-slate-200 cursor-pointer hover:bg-slate-700"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(instructor)}
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
            <AlertDialogTitle className="text-white">Delete Instructor Account?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete {instructorToDelete?.firstName} {instructorToDelete?.lastName}'s account?
              This action cannot be undone.
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

function InstructorStudioPage({
  initialData,
  onSave,
  onCancel,
}: {
  initialData: Instructor | null
  onSave: (data: Instructor) => void
  onCancel: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<Instructor>(
    initialData || {
      id: "",
      instructorNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      department: "",
      schoolYear: "",
      semester: "",
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
            {initialData ? "Edit Instructor Credentials" : "Create Instructor Credentials"}
          </h1>
          <p className="text-slate-400 text-sm">
            {initialData ? "Update instructor account information" : "Create a new instructor account"}
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="instructorNumber" className="text-slate-200">
            Instructor Number
          </Label>
          <Input
            id="instructorNumber"
            placeholder="INS001"
            value={formData.instructorNumber}
            onChange={(e) => setFormData({ ...formData, instructorNumber: e.target.value })}
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
            placeholder="instructor@school.edu"
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
          <Label htmlFor="department" className="text-slate-200">
            Department
          </Label>
          <Select
            value={formData.department}
            onValueChange={(value) => setFormData({ ...formData, department: value })}
          >
            <SelectTrigger className="mt-2 bg-slate-900 border-slate-600 text-white" id="department">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-600">
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="schoolYear" className="text-slate-200">
            School Year
          </Label>
          <Select
            value={formData.schoolYear}
            onValueChange={(value) => setFormData({ ...formData, schoolYear: value })}
          >
            <SelectTrigger className="mt-2 bg-slate-900 border-slate-600 text-white" id="schoolYear">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-600">
              <SelectItem value="2024-2025">2024-2025</SelectItem>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
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
          {initialData ? "Update Instructor" : "Create Instructor"}
        </Button>
      </div>
    </div>
  )
}
