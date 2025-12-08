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

interface Admin {
  id: string
  adminNumber: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  department: string
  schoolYear: string
  semester: string
  password: string
}

export default function AdminTab() {
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: "1",
      adminNumber: "ADM001",
      firstName: "John",
      middleName: "Michael",
      lastName: "Administrator",
      email: "john.admin@school.edu",
      department: "Administration",
      schoolYear: "2024-2025",
      semester: "1",
      password: "AdminPass123!",
    },
    {
      id: "2",
      adminNumber: "ADM002",
      firstName: "Sarah",
      middleName: "Elizabeth",
      lastName: "Finance",
      email: "sarah.finance@school.edu",
      department: "Finance",
      schoolYear: "2024-2025",
      semester: "1",
      password: "FinanceKey456!",
    },
    {
      id: "3",
      adminNumber: "ADM003",
      firstName: "David",
      middleName: "Andrew",
      lastName: "Operations",
      email: "david.ops@school.edu",
      department: "Operations",
      schoolYear: "2024-2025",
      semester: "2",
      password: "OpsAdmin789!",
    },
    {
      id: "4",
      adminNumber: "ADM004",
      firstName: "Emily",
      middleName: "Catherine",
      lastName: "Harrison",
      email: "emily.harrison@school.edu",
      department: "Finance",
      schoolYear: "2023-2024",
      semester: "1",
      password: "EmilyPass123!",
    },
  ])

  const [filterSchoolYear, setFilterSchoolYear] = useState("all")
  const [filterSemester, setFilterSemester] = useState("all")
  const [filterDepartment, setFilterDepartment] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null)
  const [studioMode, setStudioMode] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null)

  const filteredAdmins = admins.filter((admin) => {
    const matchesSchoolYear = filterSchoolYear === "all" || admin.schoolYear === filterSchoolYear
    const matchesSemester = filterSemester === "all" || admin.semester === filterSemester
    const matchesDepartment =
      filterDepartment === "all" || admin.department.toLowerCase() === filterDepartment.toLowerCase()
    const matchesSearch =
      searchTerm === "" ||
      admin.adminNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${admin.firstName} ${admin.middleName} ${admin.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSchoolYear && matchesSemester && matchesDepartment && matchesSearch
  })

  const handleAddAdmin = () => {
    setEditingAdmin(null)
    setStudioMode(true)
  }

  const handleEditAdmin = (admin: Admin) => {
    setEditingAdmin(admin)
    setStudioMode(true)
  }

  const handleDeleteClick = (admin: Admin) => {
    setAdminToDelete(admin)
    setShowDeleteAlert(true)
  }

  const handleConfirmDelete = () => {
    if (adminToDelete) {
      setAdmins(admins.filter((a) => a.id !== adminToDelete.id))
      setShowDeleteAlert(false)
      setAdminToDelete(null)
    }
  }

  const handleSaveAdmin = (formData: Admin) => {
    if (editingAdmin) {
      setAdmins(admins.map((a) => (a.id === editingAdmin.id ? formData : a)))
    } else {
      setAdmins([...admins, { ...formData, id: Date.now().toString() }])
    }
    setStudioMode(false)
    setEditingAdmin(null)
  }

  if (studioMode) {
    return (
      <AdminStudioPage
        initialData={editingAdmin}
        onSave={handleSaveAdmin}
        onCancel={() => {
          setStudioMode(false)
          setEditingAdmin(null)
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
                <SelectItem value="Administration">Administration</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
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
          <Button onClick={handleAddAdmin} className="bg-blue-600 hover:bg-blue-700 text-white">
            Add New Admin
          </Button>
        </div>
      </div>

      {/* Admins Table */}
      <div className="border border-slate-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/50">
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Admin Number</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Full Name</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Department</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">School Year</th>
              <th className="text-left py-3 px-4 font-semibold text-slate-200">Semester</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id} className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 text-slate-100">{admin.adminNumber}</td>
                <td className="py-3 px-4 text-slate-100">
                  {admin.firstName} {admin.middleName} {admin.lastName}
                </td>
                <td className="py-3 px-4 text-slate-400 text-xs">{admin.email}</td>
                <td className="py-3 px-4 text-slate-100">{admin.department}</td>
                <td className="py-3 px-4 text-slate-100">{admin.schoolYear}</td>
                <td className="py-3 px-4 text-slate-100">{admin.semester}</td>
                <td className="py-3 px-4 text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-300">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem
                        onClick={() => handleEditAdmin(admin)}
                        className="text-slate-200 cursor-pointer hover:bg-slate-700"
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(admin)}
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
            <AlertDialogTitle className="text-white">Delete Admin Account?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete {adminToDelete?.firstName} {adminToDelete?.lastName}'s account? This
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

function AdminStudioPage({
  initialData,
  onSave,
  onCancel,
}: {
  initialData: Admin | null
  onSave: (data: Admin) => void
  onCancel: () => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<Admin>(
    initialData || {
      id: "",
      adminNumber: "",
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
            {initialData ? "Edit Admin Credentials" : "Create Admin Credentials"}
          </h1>
          <p className="text-slate-400 text-sm">
            {initialData ? "Update admin account information" : "Create a new admin account"}
          </p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="adminNumber" className="text-slate-200">
            Admin Number
          </Label>
          <Input
            id="adminNumber"
            placeholder="ADM001"
            value={formData.adminNumber}
            onChange={(e) => setFormData({ ...formData, adminNumber: e.target.value })}
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
            placeholder="admin@school.edu"
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
              <SelectItem value="Administration">Administration</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Operations">Operations</SelectItem>
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
          {initialData ? "Update Admin" : "Create Admin"}
        </Button>
      </div>
    </div>
  )
}
