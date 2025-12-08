"use client"

import type React from "react"

import { useState } from "react"
import { Plus, MoreVertical, ArrowLeft, BookMarked, Users, User, Layers, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose, // IMPORTED DialogClose
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Student {
  id: string
  studentNumber: string
  firstName: string
  lastName: string
  email: string
  middleName?: string // Added for potential full name display
  curriculumYear?: string // Added for student management
}

interface Instructor {
  id: string
  name: string
  department: string
  email: string
  instructorNumber?: string // Added for instructor management
  firstName?: string // Added for potential full name display
  middleName?: string // Added for potential full name display
  lastName?: string // Added for potential full name display
}

interface Subject {
  id: string
  name: string
  instructors: string[] // Changed to store IDs for simplicity in state management
  students: string[] // Changed to store IDs for simplicity in state management
}

interface Section {
  id: string
  name: string
  subjects: Subject[]
}

interface GradeLevel {
  id: string
  name: string
  sections: Section[]
}

interface Semester {
  id: string
  name: string
  gradeLevels: GradeLevel[]
}

interface SchoolYear {
  id: string
  year: string
  semesters: Semester[]
}

type ViewMode =
  | "years"
  | "semesters"
  | "gradeLevels"
  | "sections"
  | "subjects"
  | "instructors"
  | "students"
  | "assignInstructorList"
  | "assignStudentList"

export default function CoursesPage() {
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([
    {
      id: "1",
      year: "2024-2025",
      semesters: [
        {
          id: "1",
          name: "First Semester",
          gradeLevels: [
            {
              id: "1",
              name: "Grade 1",
              sections: [
                {
                  id: "1",
                  name: "Section A",
                  subjects: [
                    {
                      id: "1",
                      name: "Mathematics",
                      instructors: ["1"], // Store instructor ID
                      students: ["1", "2"], // Store student IDs
                    },
                    {
                      id: "2",
                      name: "English",
                      instructors: ["2"], // Store instructor ID
                      students: ["1", "3"], // Store student IDs
                    },
                  ],
                },
                {
                  id: "2",
                  name: "Section B",
                  subjects: [
                    {
                      id: "3",
                      name: "Science",
                      instructors: ["3"], // Store instructor ID
                      students: ["4", "5"], // Store student IDs
                    },
                  ],
                },
              ],
            },
            {
              id: "2",
              name: "Grade 2",
              sections: [
                {
                  id: "3",
                  name: "Section A",
                  subjects: [
                    {
                      id: "4",
                      name: "Mathematics",
                      instructors: ["4"], // Store instructor ID
                      students: ["6", "7"], // Store student IDs
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: "2",
          name: "Second Semester",
          gradeLevels: [
            {
              id: "3",
              name: "Grade 1",
              sections: [
                {
                  id: "4",
                  name: "Section A",
                  subjects: [
                    {
                      id: "5",
                      name: "Mathematics",
                      instructors: ["1"], // Store instructor ID
                      students: ["1"], // Store student IDs
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      year: "2023-2024",
      semesters: [
        {
          id: "3",
          name: "First Semester",
          gradeLevels: [
            {
              id: "4",
              name: "Grade 1",
              sections: [
                {
                  id: "5",
                  name: "Section A",
                  subjects: [
                    {
                      id: "6",
                      name: "Mathematics",
                      instructors: ["1"], // Store instructor ID
                      students: ["1"], // Store student IDs
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ])

  const [viewMode, setViewMode] = useState<ViewMode>("years")
  const [selectedYear, setSelectedYear] = useState<SchoolYear | null>(null)
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null)
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<GradeLevel | null>(null)
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null) // This might not be needed anymore with direct assignment views
  const [newSchoolYear, setNewSchoolYear] = useState("")
  const [deleteTarget, setDeleteTarget] = useState<{ type: string; id: string } | null>(null)
  const [assignmentMessage, setAssignmentMessage] = useState("")
  // Mock data for instructors and students - these should ideally come from a data source
  const allInstructors: Instructor[] = [
    {
      id: "1",
      instructorNumber: "INS001",
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      name: "Mr. Johnson",
      department: "Mathematics",
      email: "johnson@school.com",
    },
    {
      id: "2",
      instructorNumber: "INS002",
      firstName: "Jane",
      middleName: "",
      lastName: "Smith",
      name: "Ms. Smith",
      department: "English",
      email: "smith@school.com",
    },
    {
      id: "3",
      instructorNumber: "INS003",
      firstName: "Michael",
      middleName: "",
      lastName: "Brown",
      name: "Mr. Brown",
      department: "Science",
      email: "brown@school.com",
    },
    {
      id: "4",
      instructorNumber: "INS004",
      firstName: "Sarah",
      middleName: "",
      lastName: "Davis",
      name: "Ms. Davis",
      department: "History",
      email: "davis@school.com",
    },
    {
      id: "5",
      instructorNumber: "INS005",
      firstName: "David",
      middleName: "",
      lastName: "Wilson",
      name: "Mr. Wilson",
      department: "PE",
      email: "wilson@school.com",
    },
  ]
  const allStudents: Student[] = [
    {
      id: "1",
      studentNumber: "2024001",
      firstName: "John",
      middleName: "A.",
      lastName: "Doe",
      email: "john@school.com",
      curriculumYear: "2024-2025",
    },
    {
      id: "2",
      studentNumber: "2024002",
      firstName: "Jane",
      middleName: "",
      lastName: "Smith",
      email: "jane@school.com",
      curriculumYear: "2024-2025",
    },
    {
      id: "3",
      studentNumber: "2024003",
      firstName: "Michael",
      middleName: "",
      lastName: "Johnson",
      email: "michael@school.com",
      curriculumYear: "2024-2025",
    },
    {
      id: "4",
      studentNumber: "2024004",
      firstName: "Sarah",
      middleName: "",
      lastName: "Williams",
      email: "sarah@school.com",
      curriculumYear: "2024-2025",
    },
    {
      id: "5",
      studentNumber: "2024005",
      firstName: "David",
      middleName: "",
      lastName: "Brown",
      email: "david@school.com",
      curriculumYear: "2024-2025",
    },
    {
      id: "6",
      studentNumber: "2024006",
      firstName: "Emily",
      middleName: "",
      lastName: "Davis",
      email: "emily@school.com",
      curriculumYear: "2024-2025",
    },
    {
      id: "7",
      studentNumber: "2024007",
      firstName: "Robert",
      middleName: "",
      lastName: "Miller",
      email: "robert@school.com",
      curriculumYear: "2024-2025",
    },
  ]

  // ADDED STATE FOR RENAME DIALOGS AND ASSIGN VIEWS
  const [renameDialog, setRenameDialog] = useState<{ type: string; id: string; currentName: string } | null>(null)
  const [renameValue, setRenameValue] = useState("")
  const [assignInstructorSubject, setAssignInstructorSubject] = useState<Subject | null>(null)
  const [assignStudentSubject, setAssignStudentSubject] = useState<Subject | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const [newSemester, setNewSemester] = useState("")
  const [newGradeLevel, setNewGradeLevel] = useState("")
  const [newSection, setNewSection] = useState("")
  const [newSubject, setNewSubject] = useState("")

  // ADDED STATE FOR MANAGING ASSIGNED INSTRUCTORS/STUDENTS DELETION
  const [deleteInstructorAlert, setDeleteInstructorAlert] = useState(false)
  const [deleteStudentAlert, setDeleteStudentAlert] = useState(false)
  const [instructorToDelete, setInstructorToDelete] = useState<string | null>(null)
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null)
  const [assignInstructorMode, setAssignInstructorMode] = useState<"list" | "assign">("list")
  const [assignStudentMode, setAssignStudentMode] = useState<"list" | "assign">("list")

  const handleAddSchoolYear = () => {
    if (newSchoolYear.trim()) {
      setSchoolYears([
        ...schoolYears,
        {
          id: Date.now().toString(),
          year: newSchoolYear,
          semesters: [],
        },
      ])
      setNewSchoolYear("")
    }
  }

  const handleAddSemester = () => {
    if (newSemester.trim() && selectedYear) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.id === selectedYear.id
            ? {
                ...year,
                semesters: [
                  ...year.semesters,
                  {
                    id: Date.now().toString(),
                    name: newSemester,
                    gradeLevels: [], // Initialize with empty gradeLevels
                  },
                ],
              }
            : year,
        ),
      )
      setNewSemester("")
    }
  }

  const handleAddGradeLevel = () => {
    if (newGradeLevel.trim() && selectedYear && selectedSemester) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.id === selectedYear.id
            ? {
                ...year,
                semesters: year.semesters.map((sem) =>
                  sem.id === selectedSemester.id
                    ? {
                        ...sem,
                        gradeLevels: [
                          ...sem.gradeLevels,
                          {
                            id: Date.now().toString(),
                            name: newGradeLevel,
                            sections: [],
                          },
                        ],
                      }
                    : sem,
                ),
              }
            : year,
        ),
      )
      setNewGradeLevel("")
    }
  }

  const handleAddSection = () => {
    if (newSection.trim() && selectedYear && selectedSemester && selectedGradeLevel) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.id === selectedYear.id
            ? {
                ...year,
                semesters: year.semesters.map((sem) =>
                  sem.id === selectedSemester.id
                    ? {
                        ...sem,
                        gradeLevels: sem.gradeLevels.map((grade) =>
                          grade.id === selectedGradeLevel.id
                            ? {
                                ...grade,
                                sections: [
                                  ...grade.sections,
                                  {
                                    id: Date.now().toString(),
                                    name: newSection,
                                    subjects: [],
                                  },
                                ],
                              }
                            : grade,
                        ),
                      }
                    : sem,
                ),
              }
            : year,
        ),
      )
      setNewSection("")
    }
  }

  const handleAddSubject = () => {
    if (newSubject.trim() && selectedYear && selectedSemester && selectedGradeLevel && selectedSection) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.id === selectedYear.id
            ? {
                ...year,
                semesters: year.semesters.map((sem) =>
                  sem.id === selectedSemester.id
                    ? {
                        ...sem,
                        gradeLevels: sem.gradeLevels.map((grade) =>
                          grade.id === selectedGradeLevel.id
                            ? {
                                ...grade,
                                sections: grade.sections.map((sec) =>
                                  sec.id === selectedSection.id
                                    ? {
                                        ...sec,
                                        subjects: [
                                          ...sec.subjects,
                                          {
                                            id: Date.now().toString(),
                                            name: newSubject,
                                            instructors: [],
                                            students: [],
                                          },
                                        ],
                                      }
                                    : sec,
                                ),
                              }
                            : grade,
                        ),
                      }
                    : sem,
                ),
              }
            : year,
        ),
      )
      setNewSubject("")
    }
  }

  const handleRename = (e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    if (!renameDialog || !renameValue.trim()) return

    setSchoolYears(
      schoolYears.map((year) => {
        if (renameDialog.type === "year" && year.id === renameDialog.id) {
          return { ...year, year: renameValue }
        }
        return {
          ...year,
          semesters: year.semesters.map((sem) => {
            if (renameDialog.type === "semester" && sem.id === renameDialog.id) {
              return { ...sem, name: renameValue }
            }
            return {
              ...sem,
              gradeLevels: sem.gradeLevels.map((grade) => {
                if (renameDialog.type === "gradeLevel" && grade.id === renameDialog.id) {
                  return { ...grade, name: renameValue }
                }
                return {
                  ...grade,
                  sections: grade.sections.map((section) => {
                    if (renameDialog.type === "section" && section.id === renameDialog.id) {
                      return { ...section, name: renameValue }
                    }
                    return {
                      ...section,
                      subjects: section.subjects.map((subject) => {
                        if (renameDialog.type === "subject" && subject.id === renameDialog.id) {
                          return { ...subject, name: renameValue }
                        }
                        return subject
                      }),
                    }
                  }),
                }
              }),
            }
          }),
        }
      }),
    )
    setRenameValue("")
    setRenameDialog(null)
  }

  const handleDelete = () => {
    if (!deleteTarget) return

    if (deleteTarget.type === "year") {
      setSchoolYears(schoolYears.filter((y) => y.id !== deleteTarget.id))
    } else if (deleteTarget.type === "semester" && selectedYear) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.id === selectedYear.id
            ? {
                ...year,
                semesters: year.semesters.filter((s) => s.id !== deleteTarget.id),
              }
            : year,
        ),
      )
    } else if (deleteTarget.type === "gradeLevel" && selectedYear && selectedSemester) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.id === selectedYear.id
            ? {
                ...year,
                semesters: year.semesters.map((sem) =>
                  sem.id === selectedSemester.id
                    ? {
                        ...sem,
                        gradeLevels: sem.gradeLevels.filter((gl) => gl.id !== deleteTarget.id),
                      }
                    : sem,
                ),
              }
            : year,
        ),
      )
    } else if (deleteTarget.type === "section" && selectedYear && selectedSemester && selectedGradeLevel) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.id === selectedYear.id
            ? {
                ...year,
                semesters: year.semesters.map((sem) =>
                  sem.id === selectedSemester.id
                    ? {
                        ...sem,
                        gradeLevels: sem.gradeLevels.map((grade) =>
                          grade.id === selectedGradeLevel.id
                            ? {
                                ...grade,
                                sections: grade.sections.filter((s) => s.id !== deleteTarget.id),
                              }
                            : grade,
                        ),
                      }
                    : sem,
                ),
              }
            : year,
        ),
      )
    } else if (
      deleteTarget.type === "subject" &&
      selectedYear &&
      selectedSemester &&
      selectedGradeLevel &&
      selectedSection
    ) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.id === selectedYear.id
            ? {
                ...year,
                semesters: year.semesters.map((sem) =>
                  sem.id === selectedSemester.id
                    ? {
                        ...sem,
                        gradeLevels: sem.gradeLevels.map((grade) =>
                          grade.id === selectedGradeLevel.id
                            ? {
                                ...grade,
                                sections: grade.sections.map((sec) =>
                                  sec.id === selectedSection.id
                                    ? {
                                        ...sec,
                                        subjects: sec.subjects.filter((sub) => sub.id !== deleteTarget.id),
                                      }
                                    : sec,
                                ),
                              }
                            : grade,
                        ),
                      }
                    : sem,
                ),
              }
            : year,
        ),
      )
    }
    setDeleteTarget(null)
  }

  const handleAssignInstructor = (subjectId: string, instructorId: string) => {
    // Find the subject and update its instructors
    setSchoolYears(
      schoolYears.map((year) =>
        year.semesters.map((sem) =>
          sem.gradeLevels.map((grade) =>
            grade.sections.map((section) =>
              section.subjects.map((subject) =>
                subject.id === subjectId
                  ? {
                      ...subject,
                      instructors: [...subject.instructors, instructorId], // Add instructor ID
                    }
                  : subject,
              ),
            ),
          ),
        ),
      ),
    )
    setAssignmentMessage(`✓ Instructor assigned successfully!`)
    setTimeout(() => setAssignmentMessage(""), 3000)
  }

  const handleAssignStudent = (subjectId: string, studentId: string) => {
    // Find the subject and update its students
    setSchoolYears(
      schoolYears.map((year) =>
        year.semesters.map((sem) =>
          sem.gradeLevels.map((grade) =>
            grade.sections.map((section) =>
              section.subjects.map((subject) =>
                subject.id === subjectId
                  ? {
                      ...subject,
                      students: [...subject.students, studentId], // Add student ID
                    }
                  : subject,
              ),
            ),
          ),
        ),
      ),
    )
    setAssignmentMessage(`✓ Student assigned successfully!`)
    setTimeout(() => setAssignmentMessage(""), 3000)
  }

  // ADDED HANDLER TO REMOVE ASSIGNED INSTRUCTOR
  const handleRemoveAssignedInstructor = () => {
    if (instructorToDelete && assignInstructorSubject) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.semesters.map((sem) =>
            sem.gradeLevels.map((grade) =>
              grade.sections.map((section) =>
                section.subjects.map((subject) =>
                  subject.id === assignInstructorSubject.id
                    ? {
                        ...subject,
                        instructors: subject.instructors.filter((id) => id !== instructorToDelete),
                      }
                    : subject,
                ),
              ),
            ),
          ),
        ),
      )
      setDeleteInstructorAlert(false)
      setInstructorToDelete(null)
      setAssignmentMessage("✓ Instructor removed successfully!")
      setTimeout(() => setAssignmentMessage(""), 3000)
    }
  }

  // ADDED HANDLER TO REMOVE ASSIGNED STUDENT
  const handleRemoveAssignedStudent = () => {
    if (studentToDelete && assignStudentSubject) {
      setSchoolYears(
        schoolYears.map((year) =>
          year.semesters.map((sem) =>
            sem.gradeLevels.map((grade) =>
              grade.sections.map((section) =>
                section.subjects.map((subject) =>
                  subject.id === assignStudentSubject.id
                    ? {
                        ...subject,
                        students: subject.students.filter((id) => id !== studentToDelete),
                      }
                    : subject,
                ),
              ),
            ),
          ),
        ),
      )
      setDeleteStudentAlert(false)
      setStudentToDelete(null)
      setAssignmentMessage("✓ Student removed successfully!")
      setTimeout(() => setAssignmentMessage(""), 3000)
    }
  }

  const filteredInstructors = allInstructors.filter(
    (inst) =>
      inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inst.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredStudents = allStudents.filter(
    (s) =>
      s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentNumber.includes(searchTerm),
  )

  const handleAssignInstructorFromList = (instructorId: string) => {
    if (!assignInstructorSubject) return

    setSchoolYears(
      schoolYears.map((year) =>
        year.semesters.map((sem) =>
          sem.gradeLevels.map((grade) =>
            grade.sections.map((section) =>
              section.subjects.map((subject) =>
                subject.id === assignInstructorSubject.id
                  ? {
                      ...subject,
                      instructors: [...subject.instructors, instructorId], // Add instructor ID
                    }
                  : subject,
              ),
            ),
          ),
        ),
      ),
    )
    setAssignmentMessage(`✓ Instructor assigned successfully!`)
    setTimeout(() => {
      setAssignmentMessage("")
      setAssignInstructorSubject(null)
      setViewMode("subjects")
    }, 1500)
  }

  const handleAssignStudentFromList = (studentId: string) => {
    if (!assignStudentSubject) return

    setSchoolYears(
      schoolYears.map((year) =>
        year.semesters.map((sem) =>
          sem.gradeLevels.map((grade) =>
            grade.sections.map((section) =>
              section.subjects.map((subject) =>
                subject.id === assignStudentSubject.id
                  ? {
                      ...subject,
                      students: [...subject.students, studentId], // Add student ID
                    }
                  : subject,
              ),
            ),
          ),
        ),
      ),
    )
    setAssignmentMessage(`✓ Student assigned successfully!`)
    setTimeout(() => {
      setAssignmentMessage("")
      setAssignStudentSubject(null)
      setViewMode("subjects")
    }, 1500)
  }

  const handleOpenRenameDialog = (type: string, id: string, currentName: string) => {
    setRenameDialog({ type, id, currentName })
    setRenameValue(currentName)
  }

  if (viewMode === "years") {
    return (
      <div className="space-y-6 p-4 md:p-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Courses Management</h1>
          <p className="text-slate-400">Manage school years, semesters, grade levels, sections, and subjects</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create School Year
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New School Year</DialogTitle>
              <DialogDescription className="text-slate-400">Add a new school year to the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="schoolYear" className="text-slate-300">
                  School Year
                </Label>
                <Input
                  id="schoolYear"
                  placeholder="e.g., 2024-2025"
                  value={newSchoolYear}
                  onChange={(e) => setNewSchoolYear(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleAddSchoolYear}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4">
          {schoolYears.map((year) => (
            <div
              key={year.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    setSelectedYear(year)
                    setViewMode("semesters")
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <BookMarked className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                        {year.year}
                      </h3>
                      <p className="text-sm text-slate-400">{year.semesters.length} semesters</p>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem
                      onClick={() => handleOpenRenameDialog("year", year.id, year.year)}
                      className="text-slate-300 cursor-pointer hover:bg-slate-700"
                    >
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteTarget({ type: "year", id: year.id })}
                      className="text-red-400 cursor-pointer hover:bg-red-500/10"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {schoolYears.length === 0 && (
          <div className="text-center py-12 bg-slate-800/30 border border-slate-700/30 rounded-xl">
            <p className="text-slate-400">No school years yet. Create one to get started.</p>
          </div>
        )}

        <AlertDialog open={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent className="bg-slate-800 border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete School Year</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to delete this school year? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white border-red-600"
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        {/* RENAME DIALOG FOR SCHOOL YEAR */}
        <Dialog open={renameDialog?.type === "year"} onOpenChange={(open) => !open && setRenameDialog(null)}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Edit School Year</DialogTitle>
              <DialogDescription className="text-slate-400">Enter the new name for this school year</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="renameSchoolYear" className="text-slate-300">
                  School Year Name
                </Label>
                <Input
                  id="renameSchoolYear"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleRename}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    Edit
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // SEMESTER VIEW SECTION
  if (viewMode === "semesters" && selectedYear) {
    return (
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setViewMode("years")}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{selectedYear.year}</h1>
            <p className="text-slate-400">Manage semesters</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Semester
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create Semester for {selectedYear.year}</DialogTitle>
              <DialogDescription className="text-slate-400">Add a new semester to this school year</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="semesterName" className="text-slate-300">
                  Semester Name
                </Label>
                <Input
                  id="semesterName"
                  placeholder="e.g., First Semester"
                  value={newSemester}
                  onChange={(e) => setNewSemester(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleAddSemester}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4">
          {selectedYear.semesters.map((semester) => (
            <div
              key={semester.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
              onClick={() => {
                setSelectedSemester(semester)
                setViewMode("gradeLevels")
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <BookMarked className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {semester.name}
                    </h3>
                    <p className="text-sm text-slate-400">{semester.gradeLevels.length} grade levels</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenRenameDialog("semester", semester.id, semester.name)
                      }}
                      className="text-slate-300 cursor-pointer hover:bg-slate-700"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteTarget({ type: "semester", id: semester.id })
                      }}
                      className="text-red-400 cursor-pointer hover:bg-red-500/10"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setViewMode("years")}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          Back
        </Button>

        <AlertDialog open={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent className="bg-slate-800 border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Semester</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to delete this semester? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white border-red-600"
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={renameDialog?.type === "semester"} onOpenChange={(open) => !open && setRenameDialog(null)}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Semester</DialogTitle>
              <DialogDescription className="text-slate-400">Enter the new name for this semester</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="renameSemester" className="text-slate-300">
                  Semester Name
                </Label>
                <Input
                  id="renameSemester"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleRename}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    Edit
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // GRADE LEVEL VIEW SECTION
  if (viewMode === "gradeLevels" && selectedYear && selectedSemester) {
    return (
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setViewMode("semesters")}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{selectedSemester.name}</h1>
            <p className="text-slate-400">{selectedYear.year} • Manage grade levels</p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Grade Level
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create Grade Level for {selectedSemester.name}</DialogTitle>
              <DialogDescription className="text-slate-400">Add a new grade level to this semester</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="gradeLevelName" className="text-slate-300">
                  Grade Level Name
                </Label>
                <Input
                  id="gradeLevelName"
                  placeholder="e.g., Grade 1"
                  value={newGradeLevel}
                  onChange={(e) => setNewGradeLevel(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleAddGradeLevel}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4">
          {selectedSemester.gradeLevels.map((grade) => (
            <div
              key={grade.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
              onClick={() => {
                setSelectedGradeLevel(grade)
                setViewMode("sections")
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Layers className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {grade.name}
                    </h3>
                    <p className="text-sm text-slate-400">{grade.sections.length} sections</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenRenameDialog("gradeLevel", grade.id, grade.name)
                      }}
                      className="text-slate-300 cursor-pointer hover:bg-slate-700"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteTarget({ type: "gradeLevel", id: grade.id })
                      }}
                      className="text-red-400 cursor-pointer hover:bg-red-500/10"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setViewMode("semesters")}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          Back
        </Button>

        <AlertDialog open={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent className="bg-slate-800 border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Grade Level</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to delete this grade level? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white border-red-600"
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={renameDialog?.type === "gradeLevel"} onOpenChange={(open) => !open && setRenameDialog(null)}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Grade Level</DialogTitle>
              <DialogDescription className="text-slate-400">Enter the new name for this grade level</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="renameGradeLevel" className="text-slate-300">
                  Grade Level Name
                </Label>
                <Input
                  id="renameGradeLevel"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleRename}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    Edit
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  // SECTION VIEW SECTION
  if (viewMode === "sections" && selectedYear && selectedSemester && selectedGradeLevel) {
    return (
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setViewMode("gradeLevels")}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{selectedGradeLevel.name}</h1>
            <p className="text-slate-400">
              {selectedYear.year} • {selectedSemester.name} • Sections
            </p>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create Section for {selectedGradeLevel.name}</DialogTitle>
              <DialogDescription className="text-slate-400">Add a new section to this grade level</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sectionName" className="text-slate-300">
                  Section Name
                </Label>
                <Input
                  id="sectionName"
                  placeholder="e.g., Section A"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleAddSection}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4">
          {selectedGradeLevel.sections.map((section) => (
            <div
              key={section.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10 cursor-pointer"
              onClick={() => {
                setSelectedSection(section)
                setViewMode("subjects")
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-pink-500/20 rounded-lg">
                    <Users className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                      {section.name}
                    </h3>
                    <p className="text-sm text-slate-400">{section.subjects.length} subjects</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenRenameDialog("section", section.id, section.name)
                      }}
                      className="text-slate-300 cursor-pointer hover:bg-slate-700"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeleteTarget({ type: "section", id: section.id })
                      }}
                      className="text-red-400 cursor-pointer hover:bg-red-500/10"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setViewMode("gradeLevels")}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          Back
        </Button>

        <AlertDialog open={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent className="bg-slate-800 border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Section</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to delete this section? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white border-red-600"
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={renameDialog?.type === "section"} onOpenChange={(open) => !open && setRenameDialog(null)}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Section</DialogTitle>
              <DialogDescription className="text-slate-400">Enter the new name for this section</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="renameSection" className="text-slate-300">
                  Section Name
                </Label>
                <Input
                  id="renameSection"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleRename}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    Edit
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (viewMode === "subjects" && selectedYear && selectedSemester && selectedGradeLevel && selectedSection) {
    return (
      <div className="space-y-6 p-4 md:p-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setViewMode("sections")}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{selectedSection.name}</h1>
            <p className="text-slate-400">
              {selectedYear.year} • {selectedSemester.name} • {selectedGradeLevel.name}
            </p>
          </div>
        </div>

        {assignmentMessage && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400">
            {assignmentMessage}
          </div>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white mb-4">
              <Plus className="w-4 h-4 mr-2" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create Subject for {selectedSection.name}</DialogTitle>
              <DialogDescription className="text-slate-400">Add a new subject to this section</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="subjectName" className="text-slate-300">
                  Subject Name
                </Label>
                <Input
                  id="subjectName"
                  placeholder="e.g., Mathematics"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  onClick={handleAddSubject}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="grid gap-4">
          {selectedSection.subjects.map((subject) => (
            <div
              key={subject.id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all hover:shadow-lg hover:shadow-yellow-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors mb-3">
                    {subject.name}
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    <button
                      onClick={() => {
                        setAssignInstructorSubject(subject)
                        setSearchTerm("")
                        setViewMode("assignInstructorList")
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg text-blue-300 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span>Instructors ({subject.instructors.length})</span>
                    </button>
                    <button
                      onClick={() => {
                        setAssignStudentSubject(subject)
                        setSearchTerm("")
                        setViewMode("assignStudentList")
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-300 transition-colors cursor-pointer"
                    >
                      <Users className="w-4 h-4" />
                      <span>Students ({subject.students.length})</span>
                    </button>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                    <DropdownMenuItem
                      onClick={() => {
                        setRenameDialog({ type: "subject", id: subject.id, currentName: subject.name })
                        setRenameValue(subject.name)
                      }}
                      className="text-slate-300 cursor-pointer hover:bg-slate-700"
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setDeleteTarget({ type: "subject", id: subject.id })}
                      className="text-red-400 cursor-pointer hover:bg-red-500/10"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setViewMode("sections")}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          Back
        </Button>

        <Dialog open={renameDialog?.type === "subject"} onOpenChange={(open) => !open && setRenameDialog(null)}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Subject</DialogTitle>
              <DialogDescription className="text-slate-400">Enter the new name for this subject</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="renameSubject" className="text-slate-300">
                  Subject Name
                </Label>
                <Input
                  id="renameSubject"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="mt-1.5 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                  <Button
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleRename}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    Edit
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteTarget !== null} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent className="bg-slate-800 border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Subject</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to delete this subject? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete() // Call handleDelete to remove the subject
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  // RENDER ASSIGNED INSTRUCTORS SECTION AT THE START OF assignInstructorList
  if (viewMode === "assignInstructorList" && assignInstructorSubject) {
    // Filter to get full instructor objects for display
    const assignedInstructorObjects = allInstructors.filter((i) => assignInstructorSubject.instructors.includes(i.id))

    return (
      <div className="space-y-6 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-700">
          <button
            onClick={() => {
              setViewMode("subjects")
              setAssignInstructorSubject(null)
              setAssignInstructorMode("list") // Reset mode
            }}
            className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Manage Instructors</h1>
            <p className="text-slate-400 text-sm">
              {selectedYear?.year} • {selectedSemester?.name} • {selectedGradeLevel?.name} • {selectedSection?.name} •{" "}
              {assignInstructorSubject.name}
            </p>
          </div>
        </div>

        {assignmentMessage && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400">
            {assignmentMessage}
          </div>
        )}

        {assignInstructorMode === "list" ? (
          <>
            {/* Assigned Instructors Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Assigned Instructors</h2>
                <Button
                  onClick={() => setAssignInstructorMode("assign")}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  + Assign Instructor
                </Button>
              </div>

              {assignedInstructorObjects.length > 0 ? (
                <div className="border border-slate-700 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-800/50">
                        <th className="text-left py-3 px-4 font-semibold text-slate-200">Instructor Number</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-200">Full Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-200">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-200">Department</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-200">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedInstructorObjects.map((instructor) => (
                        <tr
                          key={instructor.id}
                          className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="py-3 px-4 text-slate-100">{instructor.instructorNumber}</td>
                          <td className="py-3 px-4 text-slate-100">
                            {instructor.firstName} {instructor.middleName} {instructor.lastName}
                          </td>
                          <td className="py-3 px-4 text-slate-400 text-xs">{instructor.email}</td>
                          <td className="py-3 px-4 text-slate-100">{instructor.department}</td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => {
                                setInstructorToDelete(instructor.id)
                                setDeleteInstructorAlert(true)
                              }}
                              className="p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 transition-colors text-xs"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">No instructors assigned yet</div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Search Box for new assignments */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by instructor name or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
              />
            </div>

            {/* Available Instructors Table */}
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/50">
                    <th className="text-left py-3 px-4 font-semibold text-slate-200">Instructor Number</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-200">Full Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-200">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-200">Department</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstructors
                    .filter((i) => !assignInstructorSubject.instructors.includes(i.id))
                    .map((instructor) => (
                      <tr
                        key={instructor.id}
                        className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 px-4 text-slate-100">{instructor.instructorNumber}</td>
                        <td className="py-3 px-4 text-slate-100">
                          {instructor.firstName} {instructor.middleName} {instructor.lastName}
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-xs">{instructor.email}</td>
                        <td className="py-3 px-4 text-slate-100">{instructor.department}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            onClick={() => handleAssignInstructorFromList(instructor.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1 px-3"
                          >
                            Assign
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <Button
              onClick={() => setAssignInstructorMode("list")}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              Back
            </Button>
          </>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteInstructorAlert} onOpenChange={setDeleteInstructorAlert}>
          <AlertDialogContent className="bg-slate-800 border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Remove Instructor?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to remove this instructor from the subject? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3 justify-end">
              <AlertDialogCancel className="bg-slate-700 text-slate-200 hover:bg-slate-600">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRemoveAssignedInstructor}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Remove
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  // RENDER ASSIGNED STUDENTS SECTION (SAME PATTERN AS INSTRUCTORS)
  if (viewMode === "assignStudentList" && assignStudentSubject) {
    // Filter to get full student objects for display
    const assignedStudentObjects = allStudents.filter((s) => assignStudentSubject.students.includes(s.id))

    return (
      <div className="space-y-6 p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-700">
          <button
            onClick={() => {
              setViewMode("subjects")
              setAssignStudentSubject(null)
              setAssignStudentMode("list") // Reset mode
            }}
            className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Manage Students</h1>
            <p className="text-slate-400 text-sm">
              {selectedYear?.year} • {selectedSemester?.name} • {selectedGradeLevel?.name} • {selectedSection?.name} •{" "}
              {assignStudentSubject.name}
            </p>
          </div>
        </div>

        {assignmentMessage && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400">
            {assignmentMessage}
          </div>
        )}

        {assignStudentMode === "list" ? (
          <>
            {/* Assigned Students Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Assigned Students</h2>
                <Button
                  onClick={() => setAssignStudentMode("assign")}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm"
                >
                  + Assign Student
                </Button>
              </div>

              {assignedStudentObjects.length > 0 ? (
                <div className="border border-slate-700 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-800/50">
                        <th className="text-left py-3 px-4 font-semibold text-slate-200">Student Number</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-200">Full Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-200">Email</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-200">Curriculum</th>
                        <th className="text-center py-3 px-4 font-semibold text-slate-200">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignedStudentObjects.map((student) => (
                        <tr
                          key={student.id}
                          className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="py-3 px-4 text-slate-100">{student.studentNumber}</td>
                          <td className="py-3 px-4 text-slate-100">
                            {student.firstName} {student.middleName} {student.lastName}
                          </td>
                          <td className="py-3 px-4 text-slate-400 text-xs">{student.email}</td>
                          <td className="py-3 px-4 text-slate-100">{student.curriculumYear}</td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => {
                                setStudentToDelete(student.id)
                                setDeleteStudentAlert(true)
                              }}
                              className="p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 transition-colors text-xs"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">No students assigned yet</div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Search Box for new assignments */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by student name or student number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-600 text-white placeholder-slate-500"
              />
            </div>

            {/* Available Students Table */}
            <div className="border border-slate-700 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800/50">
                    <th className="text-left py-3 px-4 font-semibold text-slate-200">Student Number</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-200">Full Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-200">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-200">Curriculum</th>
                    <th className="text-center py-3 px-4 font-semibold text-slate-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents
                    .filter((s) => !assignStudentSubject.students.includes(s.id))
                    .map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-slate-700 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 px-4 text-slate-100">{student.studentNumber}</td>
                        <td className="py-3 px-4 text-slate-100">
                          {student.firstName} {student.middleName} {student.lastName}
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-xs">{student.email}</td>
                        <td className="py-3 px-4 text-slate-100">{student.curriculumYear}</td>
                        <td className="py-3 px-4 text-center">
                          <Button
                            onClick={() => handleAssignStudentFromList(student.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 px-3"
                          >
                            Assign
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <Button
              onClick={() => setAssignStudentMode("list")}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              Back
            </Button>
          </>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteStudentAlert} onOpenChange={setDeleteStudentAlert}>
          <AlertDialogContent className="bg-slate-800 border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Remove Student?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you sure you want to remove this student from the subject? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3 justify-end">
              <AlertDialogCancel className="bg-slate-700 text-slate-200 hover:bg-slate-600">Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRemoveAssignedStudent}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Remove
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }

  return null
}
