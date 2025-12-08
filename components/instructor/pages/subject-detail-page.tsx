"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Plus, Folder, FileText, Users } from "lucide-react"
import SessionStudio from "./session-studio-page"
import GradingStudio from "./grading-studio-page"

interface InstructorSubjectDetailProps {
  subject: any
  initialTab?: "content" | "attendance" | "grades" | "members"
  onBack: () => void
}

interface ContentItem {
  id: string
  type: "folder" | "submission"
  name: string
  description?: string
  folderId?: string
  isVisible?: boolean
  dueDate?: string
  dueTime?: string
  maxAttempts?: number
  files?: SubmissionFile[]
}

interface SubmissionFile {
  id: string
  name: string
  type: string
  url: string
}

export default function InstructorSubjectDetail({
  subject,
  initialTab = "content",
  onBack,
}: InstructorSubjectDetailProps) {
  const [activeTab, setActiveTab] = useState<"content" | "attendance" | "grades" | "members">(initialTab)
  const [showSessionStudio, setShowSessionStudio] = useState(false)
  const [showGradingStudio, setShowGradingStudio] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState<string>("")
  const [selectedTaskTitle, setSelectedTaskTitle] = useState<string>("")
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null)
  const [showEditSubmission, setShowEditSubmission] = useState(false)
  const [editingSubmissionId, setEditingSubmissionId] = useState<string | null>(null)
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null)
  const [folderContextMenu, setFolderContextMenu] = useState<{
    x: number
    y: number
    folderId: string
  } | null>(null)
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
    submissionId: string
    folderId: string
  } | null>(null)

  const [folders, setFolders] = useState<{ [key: string]: { name: string; submissions: ContentItem[] } }>({
    "folder-1": {
      name: "Quiz",
      submissions: [
        {
          id: "1",
          type: "submission",
          name: "Quiz 1: Functions",
          description: "Basic function concepts and definitions",
          folderId: "folder-1",
          isVisible: true,
          dueDate: "2024-12-20",
          dueTime: "10:00",
          maxAttempts: 3,
          files: [],
        },
        {
          id: "2",
          type: "submission",
          name: "Quiz 2: Arrays",
          description: "Array operations and manipulation",
          folderId: "folder-1",
          isVisible: true,
          dueDate: "2024-12-22",
          dueTime: "10:00",
          maxAttempts: 3,
          files: [],
        },
      ],
    },
    "folder-2": {
      name: "Assignments",
      submissions: [
        {
          id: "3",
          type: "submission",
          name: "Assignment 1: Basics",
          description: "Fundamental programming assignment",
          folderId: "folder-2",
          isVisible: true,
          dueDate: "2024-12-25",
          dueTime: "23:59",
          maxAttempts: 5,
          files: [],
        },
      ],
    },
  })

  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["folder-1"]))
  const [showCreateFolder, setShowCreateFolder] = useState(false)
  const [showCreateSubmission, setShowCreateSubmission] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [newFolderName, setNewFolderName] = useState("")
  const [editingFolderName, setEditingFolderName] = useState("")
  const [newSubmissionData, setNewSubmissionData] = useState({
    name: "",
    description: "",
    folderId: null as string | null,
    isVisible: true,
    dueDate: "",
    dueTime: "",
    maxAttempts: 1,
    files: [] as SubmissionFile[],
  })

  const [attendanceSessions, setAttendanceSessions] = useState([
    { id: "1", date: "2024-12-13", time: "10:00 AM", participants: 45, present: 42, absent: 3, visible: true },
    { id: "2", date: "2024-12-11", time: "10:00 AM", participants: 43, present: 41, absent: 2, visible: true },
  ])

  const [members, setMembers] = useState([
    { id: "1", name: "Alexander Torres", status: "present" },
    { id: "2", name: "Benjamin Martinez", status: "present" },
    { id: "3", name: "Catherine Lopez", status: "absent" },
    { id: "4", name: "Diana Johnson", status: "present" },
    { id: "5", name: "Edwin Garcia", status: "present" },
    { id: "6", name: "Fiona Anderson", status: "present" },
    { id: "7", name: "Gregory Williams", status: "present" },
    { id: "8", name: "Hannah Brown", status: "absent" },
    { id: "9", name: "Isaac Davis", status: "present" },
    { id: "10", name: "Julia Miller", status: "present" },
  ])

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return
    const newId = `folder-${Date.now()}`
    setFolders({
      ...folders,
      [newId]: { name: newFolderName, submissions: [] },
    })
    setNewFolderName("")
    setShowCreateFolder(false)
  }

  const handleCreateSubmission = () => {
    if (!newSubmissionData.name.trim()) return
    if (newSubmissionData.folderId) {
      setFolders({
        ...folders,
        [newSubmissionData.folderId]: {
          ...folders[newSubmissionData.folderId],
          submissions: [
            ...folders[newSubmissionData.folderId].submissions,
            {
              id: `submission-${Date.now()}`,
              type: "submission",
              name: newSubmissionData.name,
              description: newSubmissionData.description,
              folderId: newSubmissionData.folderId,
              isVisible: newSubmissionData.isVisible,
              dueDate: newSubmissionData.dueDate,
              dueTime: newSubmissionData.dueTime,
              maxAttempts: newSubmissionData.maxAttempts,
              files: newSubmissionData.files,
            },
          ],
        },
      })
    }
    setNewSubmissionData({
      name: "",
      description: "",
      folderId: null,
      isVisible: true,
      dueDate: "",
      dueTime: "",
      maxAttempts: 1,
      files: [],
    })
    setShowCreateSubmission(false)
  }

  const handleEditSubmission = () => {
    if (!editingSubmissionId || !editingFolderId) return
    setFolders({
      ...folders,
      [editingFolderId]: {
        ...folders[editingFolderId],
        submissions: folders[editingFolderId].submissions.map((s) =>
          s.id === editingSubmissionId
            ? {
                ...s,
                name: newSubmissionData.name,
                description: newSubmissionData.description,
                isVisible: newSubmissionData.isVisible,
                dueDate: newSubmissionData.dueDate,
                dueTime: newSubmissionData.dueTime,
                maxAttempts: newSubmissionData.maxAttempts,
                files: newSubmissionData.files,
              }
            : s,
        ),
      },
    })
    setShowEditSubmission(false)
    setEditingSubmissionId(null)
    setEditingFolderId(null)
    setNewSubmissionData({
      name: "",
      description: "",
      folderId: null,
      isVisible: true,
      dueDate: "",
      dueTime: "",
      maxAttempts: 1,
      files: [],
    })
  }

  const openEditSubmission = (folderId: string, submission: ContentItem) => {
    setEditingSubmissionId(submission.id)
    setEditingFolderId(folderId)
    setNewSubmissionData({
      name: submission.name || "",
      description: submission.description || "",
      folderId: submission.folderId || null,
      isVisible: submission.isVisible ?? true,
      dueDate: submission.dueDate || "",
      dueTime: submission.dueTime || "",
      maxAttempts: submission.maxAttempts || 1,
      files: submission.files || [],
    })
    setShowEditSubmission(true)
    setContextMenu(null)
  }

  const handleContextMenu = (e: React.MouseEvent, submissionId: string, folderId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({ x: e.clientX, y: e.clientY, submissionId, folderId })
  }

  const handleFolderContextMenu = (e: React.MouseEvent, folderId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setFolderContextMenu({ x: e.clientX, y: e.clientY, folderId })
  }

  const handleDeleteFolder = (folderId: string) => {
    const newFolders = { ...folders }
    delete newFolders[folderId]
    setFolders(newFolders)
    setFolderContextMenu(null)
  }

  const handleEditFolder = (folderId: string) => {
    setEditingFolderId(folderId)
    setEditingFolderName(folders[folderId].name)
    setFolderContextMenu(null)
  }

  const handleSaveEditedFolder = (folderId: string) => {
    if (editingFolderName.trim()) {
      setFolders({
        ...folders,
        [folderId]: {
          ...folders[folderId],
          name: editingFolderName.trim(),
        },
      })
      setEditingFolderId(null)
      setEditingFolderName("")
    }
  }

  const handleDeleteSubmission = (folderId: string, submissionId: string) => {
    setFolders({
      ...folders,
      [folderId]: {
        ...folders[folderId],
        submissions: folders[folderId].submissions.filter((s) => s.id !== submissionId),
      },
    })
  }

  const handleSessionSave = (sessionData: any) => {
    const newSession = {
      id: `session-${Date.now()}`,
      date: sessionData.dueDate,
      time: sessionData.dueTime,
      participants: sessionData.students.length,
      present: sessionData.students.filter((s: any) => s.status === "present").length,
      absent: sessionData.students.filter((s: any) => s.status === "absent").length,
      visible: sessionData.visibility === "public",
    }
    setAttendanceSessions([...attendanceSessions, newSession])
  }

  return (
    <div className="space-y-6 p-6">
      {showSessionStudio ? (
        <SessionStudio
          subject={subject}
          isNewSession={editingSessionId === null}
          sessionId={editingSessionId || undefined}
          onBack={() => {
            setShowSessionStudio(false)
            setEditingSessionId(null)
          }}
          onSessionSave={handleSessionSave}
        />
      ) : showGradingStudio ? (
        <GradingStudio
          subject={subject}
          taskId={selectedTaskId}
          taskTitle={selectedTaskTitle}
          onBack={() => setShowGradingStudio(false)}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Subjects</span>
            </button>
          </div>

          <div className={`bg-gradient-to-r ${subject.color} rounded-xl p-8 text-white shadow-lg`}>
            <h1 className="text-4xl font-bold mb-2">{subject.name}</h1>
            <p className="text-white/90 mb-4">{subject.code}</p>
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-white/70">Section</p>
                <p className="font-semibold">{subject.section}</p>
              </div>
              <div>
                <p className="text-white/70">Schedule</p>
                <p className="font-semibold">{subject.dayTime}</p>
              </div>
              <div>
                <p className="text-white/70">Total Students</p>
                <p className="font-semibold">{subject.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 border-b border-slate-700/50">
            {["content", "attendance", "grades", "members"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-3 font-medium border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-400 hover:text-slate-300"
                }`}
              >
                {tab === "members" ? "Members" : tab}
              </button>
            ))}
          </div>

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="space-y-4" onClick={() => setContextMenu(null)}>
              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => setShowCreateFolder(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Folder
                </Button>
                <Button onClick={() => setShowCreateSubmission(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Submission
                </Button>
              </div>

              <div className="space-y-2">
                {Object.entries(folders).map(([folderId, folder]) => (
                  <div key={folderId} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
                    {editingFolderId === folderId ? (
                      <div className="px-6 py-4 bg-slate-800 flex items-center gap-3 border-b border-slate-700/50">
                        <input
                          type="text"
                          value={editingFolderName}
                          onChange={(e) => setEditingFolderName(e.target.value)}
                          className="flex-1 bg-slate-900 text-white px-3 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
                          placeholder="Folder name"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEditedFolder(folderId)}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingFolderId(null)}
                          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onContextMenu={(e) => handleFolderContextMenu(e, folderId)}
                        onClick={() => toggleFolder(folderId)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors group"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Folder size={20} className="text-blue-400" />
                          <span className="font-semibold text-white">{folder.name}</span>
                          <span className="text-sm text-slate-400">({folder.submissions.length})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`transition-transform ${expandedFolders.has(folderId) ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        </div>
                      </button>
                    )}

                    {expandedFolders.has(folderId) && (
                      <div className="border-t border-slate-700/50 space-y-2 p-4">
                        {folder.submissions.map((submission) => (
                          <div
                            key={submission.id}
                            onContextMenu={(e) => handleContextMenu(e, submission.id, folderId)}
                            className="p-4 bg-slate-900 hover:bg-slate-900/80 border border-slate-700/50 hover:border-blue-500/50 rounded-lg text-left transition-all group"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-3 flex-1">
                                <FileText size={16} className="text-slate-400 mt-1 flex-shrink-0" />
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{submission.name}</h4>
                                  {submission.description && (
                                    <p className="text-sm text-slate-400 mt-1">{submission.description}</p>
                                  )}
                                  <div className="flex gap-4 text-xs text-slate-500 mt-2">
                                    {submission.dueDate && <span>Due: {submission.dueDate}</span>}
                                    {submission.maxAttempts && <span>Max Attempts: {submission.maxAttempts}</span>}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {submission.isVisible && (
                                  <span className="px-2 py-1 rounded text-xs bg-green-900/30 text-green-300">
                                    Visible
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === "attendance" && (
            <div className="space-y-4">
              <Button onClick={() => setShowSessionStudio(true)} className="gap-2 bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4" />
                Start Attendance Session
              </Button>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">Attendance Sessions</h2>
                {attendanceSessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => {
                      setEditingSessionId(session.id)
                      setShowSessionStudio(true)
                    }}
                    className="w-full text-left p-4 bg-slate-900 border border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-white">{session.date}</h3>
                        <p className="text-sm text-slate-400 mt-1">{session.time}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                          <span>Total: {session.participants}</span>
                          <span className="text-green-400">Present: {session.present}</span>
                          <span className="text-red-400">Absent: {session.absent}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          session.visible ? "bg-green-900/30 text-green-300" : "bg-amber-900/30 text-amber-300"
                        }`}
                      >
                        {session.visible ? "Visible" : "Hidden"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Grades Tab */}
          {activeTab === "grades" && (
            <div className="space-y-4">
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white">Submissions for Grading</h2>
                {Object.values(folders)
                  .flatMap((f) => f.submissions)
                  .map((submission) => (
                    <button
                      key={submission.id}
                      onClick={() => {
                        setSelectedTaskId(submission.id)
                        setSelectedTaskTitle(submission.name)
                        setShowGradingStudio(true)
                      }}
                      className="w-full text-left p-4 bg-slate-900 border border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-white">{submission.name}</h3>
                          {submission.description && (
                            <p className="text-sm text-slate-400 mt-1">{submission.description}</p>
                          )}
                          <div className="flex gap-4 text-xs text-slate-500 mt-2">
                            {submission.dueDate && <span>Due: {submission.dueDate}</span>}
                            {submission.maxAttempts && <span>Max Attempts: {submission.maxAttempts}</span>}
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            submission.isVisible ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
                          }`}
                        >
                          {submission.isVisible ? "Visible" : "Hidden"}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "members" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border border-slate-700/50 bg-slate-900">
                  <CardContent className="pt-6">
                    <div>
                      <p className="text-sm text-slate-400">Total Members</p>
                      <p className="text-3xl font-bold text-blue-400 mt-1">{members.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Class Members
                </h2>
                <div className="space-y-2">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="p-4 bg-slate-900 border border-slate-700/50 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <p className="font-medium text-white">{member.name}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === "present" ? "bg-green-900/30 text-green-300" : "bg-red-900/30 text-red-300"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Create Folder Modal */}
          {showCreateFolder && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <Card className="w-full max-w-md border border-slate-700/50 bg-slate-900">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-xl font-bold text-white">Create Folder</h2>
                  <input
                    type="text"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Folder name"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button onClick={() => setShowCreateFolder(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={handleCreateFolder} className="bg-primary">
                      Create Folder
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Create Submission Modal */}
          {showCreateSubmission && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <Card className="w-full max-w-2xl border border-slate-700/50 bg-slate-900 max-h-[90vh] overflow-y-auto">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-xl font-bold text-white">Create Submission</h2>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Title</label>
                    <input
                      type="text"
                      value={newSubmissionData.name}
                      onChange={(e) => setNewSubmissionData({ ...newSubmissionData, name: e.target.value })}
                      placeholder="Submission title"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Description</label>
                    <textarea
                      value={newSubmissionData.description}
                      onChange={(e) => setNewSubmissionData({ ...newSubmissionData, description: e.target.value })}
                      placeholder="Submission description"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Folder (Optional)</label>
                    <select
                      value={newSubmissionData.folderId || ""}
                      onChange={(e) => setNewSubmissionData({ ...newSubmissionData, folderId: e.target.value || null })}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                    >
                      <option value="">Select folder (optional)</option>
                      {Object.entries(folders).map(([id, folder]) => (
                        <option key={id} value={id}>
                          {folder.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Due Date</label>
                      <input
                        type="date"
                        value={newSubmissionData.dueDate}
                        onChange={(e) => setNewSubmissionData({ ...newSubmissionData, dueDate: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Due Time</label>
                      <input
                        type="time"
                        value={newSubmissionData.dueTime}
                        onChange={(e) => setNewSubmissionData({ ...newSubmissionData, dueTime: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Maximum Submission Attempts</label>
                    <input
                      type="number"
                      value={newSubmissionData.maxAttempts}
                      onChange={(e) =>
                        setNewSubmissionData({
                          ...newSubmissionData,
                          maxAttempts: Number.parseInt(e.target.value) || 1,
                        })
                      }
                      min="1"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Attachment(s)</label>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          const newFiles = files.map((file) => ({
                            id: `file-${Date.now()}-${Math.random()}`,
                            name: file.name,
                            type: file.type,
                            url: URL.createObjectURL(file),
                          }))
                          setNewSubmissionData({
                            ...newSubmissionData,
                            files: [...newSubmissionData.files, ...newFiles],
                          })
                        }}
                        className="hidden"
                        id="file-upload"
                        accept=".doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png,.gif,.mp4,.mov,.webm,.txt,.csv"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-slate-400 hover:text-primary transition-colors"
                      >
                        Click to upload or drag files (docs, ppt, excel, pictures, pdf, videos)
                      </label>
                    </div>

                    {newSubmissionData.files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {newSubmissionData.files.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-2 bg-slate-800 rounded">
                            <span className="text-sm text-slate-300">{file.name}</span>
                            <button
                              onClick={() => {
                                setNewSubmissionData({
                                  ...newSubmissionData,
                                  files: newSubmissionData.files.filter((f) => f.id !== file.id),
                                })
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <label className="flex items-center gap-2 text-white">
                    <input
                      type="checkbox"
                      checked={newSubmissionData.isVisible}
                      onChange={(e) => setNewSubmissionData({ ...newSubmissionData, isVisible: e.target.checked })}
                      className="w-4 h-4"
                    />
                    Visible to Students
                  </label>

                  <div className="flex gap-2 justify-end">
                    <Button onClick={() => setShowCreateSubmission(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={handleCreateSubmission} className="bg-primary">
                      Create Submission
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Edit Submission Modal */}
          {showEditSubmission && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
              <Card className="w-full max-w-2xl border border-slate-700/50 bg-slate-900 max-h-[90vh] overflow-y-auto">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-xl font-bold text-white">Edit Submission</h2>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Title</label>
                    <input
                      type="text"
                      value={newSubmissionData.name}
                      onChange={(e) => setNewSubmissionData({ ...newSubmissionData, name: e.target.value })}
                      placeholder="Submission title"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Description</label>
                    <textarea
                      value={newSubmissionData.description}
                      onChange={(e) => setNewSubmissionData({ ...newSubmissionData, description: e.target.value })}
                      placeholder="Submission description"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Due Date</label>
                      <input
                        type="date"
                        value={newSubmissionData.dueDate}
                        onChange={(e) => setNewSubmissionData({ ...newSubmissionData, dueDate: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-2 block">Due Time</label>
                      <input
                        type="time"
                        value={newSubmissionData.dueTime}
                        onChange={(e) => setNewSubmissionData({ ...newSubmissionData, dueTime: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Maximum Submission Attempts</label>
                    <input
                      type="number"
                      value={newSubmissionData.maxAttempts}
                      onChange={(e) =>
                        setNewSubmissionData({
                          ...newSubmissionData,
                          maxAttempts: Number.parseInt(e.target.value) || 1,
                        })
                      }
                      min="1"
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-slate-400 mb-2 block">Attachment(s)</label>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          const newFiles = files.map((file) => ({
                            id: `file-${Date.now()}-${Math.random()}`,
                            name: file.name,
                            type: file.type,
                            url: URL.createObjectURL(file),
                          }))
                          setNewSubmissionData({
                            ...newSubmissionData,
                            files: [...newSubmissionData.files, ...newFiles],
                          })
                        }}
                        className="hidden"
                        id="file-upload-edit"
                        accept=".doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.jpg,.jpeg,.png,.gif,.mp4,.mov,.webm,.txt,.csv"
                      />
                      <label
                        htmlFor="file-upload-edit"
                        className="cursor-pointer text-slate-400 hover:text-primary transition-colors"
                      >
                        Click to upload or drag files
                      </label>
                    </div>

                    {newSubmissionData.files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {newSubmissionData.files.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-2 bg-slate-800 rounded">
                            <span className="text-sm text-slate-300">{file.name}</span>
                            <button
                              onClick={() => {
                                setNewSubmissionData({
                                  ...newSubmissionData,
                                  files: newSubmissionData.files.filter((f) => f.id !== file.id),
                                })
                              }}
                              className="text-red-400 hover:text-red-300"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <label className="flex items-center gap-2 text-white">
                    <input
                      type="checkbox"
                      checked={newSubmissionData.isVisible}
                      onChange={(e) => setNewSubmissionData({ ...newSubmissionData, isVisible: e.target.checked })}
                      className="w-4 h-4"
                    />
                    Visible to Students
                  </label>

                  <div className="flex gap-2 justify-end">
                    <Button onClick={() => setShowEditSubmission(false)} variant="outline">
                      Cancel
                    </Button>
                    <Button onClick={handleEditSubmission} className="bg-primary">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Context Menu */}
          {contextMenu && (
            <div
              className="fixed z-50 bg-slate-800 border border-slate-700 rounded-lg shadow-xl"
              style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
            >
              <button
                onClick={() => {
                  const submission = folders[contextMenu.folderId]?.submissions.find(
                    (s) => s.id === contextMenu.submissionId,
                  )
                  if (submission) openEditSubmission(contextMenu.folderId, submission)
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 text-white text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDeleteSubmission(contextMenu.folderId, contextMenu.submissionId)
                  setContextMenu(null)
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 text-red-400 text-sm border-t border-slate-700"
              >
                Delete
              </button>
            </div>
          )}

          {folderContextMenu && (
            <div
              className="fixed z-50 bg-slate-800 border border-slate-700 rounded-lg shadow-xl"
              style={{ top: `${folderContextMenu.y}px`, left: `${folderContextMenu.x}px` }}
              onClick={() => setFolderContextMenu(null)}
            >
              <button
                onClick={() => handleEditFolder(folderContextMenu.folderId)}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 text-white text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteFolder(folderContextMenu.folderId)}
                className="w-full text-left px-4 py-2 hover:bg-slate-700 text-red-400 text-sm border-t border-slate-700"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
