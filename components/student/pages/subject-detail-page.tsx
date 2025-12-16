"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Folder,
  FileText,
  Download,
  Upload,
  Loader2,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  File,
  User,
  Calendar,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

interface SubjectDetailProps {
  subject: any
  studentId?: number | null
  onBack: () => void
}

interface SubmissionFile {
  id: number
  name: string
  type: string
  url: string
}

interface Submission {
  id: number
  name: string
  description?: string
  dueDate?: string
  dueTime?: string
  maxAttempts: number
  attemptCount: number
  studentSubmissionId?: number
  grade?: number | null
  feedback?: string
  submittedAt?: string
  status: "not_submitted" | "submitted" | "graded" | "overdue"
  canSubmit: boolean
  files: SubmissionFile[]
}

interface FolderData {
  id: number
  name: string
  submissions: Submission[]
}

interface UploadedFile {
  name: string
  type: string
  url: string
  size: number
}

export default function SubjectDetail({ subject, studentId, onBack }: SubjectDetailProps) {
  const [folders, setFolders] = useState<FolderData[]>([])
  const [subjectDetails, setSubjectDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedFolders, setExpandedFolders] = useState<Set<number>>(new Set())

  // Submission modal states
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // View submission modal
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewingSubmission, setViewingSubmission] = useState<any>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchSubjectDetails = useCallback(async () => {
    if (!subject?.id || !studentId) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch(`/api/student/subjects/${subject.id}?studentId=${studentId}`)
      const data = await response.json()

      if (data.success) {
        setSubjectDetails(data.subject)
        setFolders(data.folders)

        // Expand first folder by default
        if (data.folders.length > 0) {
          setExpandedFolders(new Set([data.folders[0].id]))
        }
      } else {
        setError(data.error || "Failed to fetch subject details")
      }
    } catch (err) {
      console.error("Failed to fetch subject details:", err)
      setError("Failed to connect to server")
    } finally {
      setIsLoading(false)
    }
  }, [subject?.id, studentId])

  useEffect(() => {
    fetchSubjectDetails()
  }, [fetchSubjectDetails])

  const toggleFolder = (folderId: number) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    setUploadError(null)

    for (const file of Array.from(files)) {
      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("folder", "student-submissions")
        formData.append("studentId", studentId?.toString() || "")
        formData.append("submissionId", selectedSubmission?.id.toString() || "")

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        const data = await response.json()

        if (data.success) {
          setUploadedFiles((prev) => [
            ...prev,
            {
              name: data.file.originalName,
              type: data.file.type,
              url: data.file.url,
              size: data.file.size,
            },
          ])
        } else {
          setUploadError(data.error || "Failed to upload file")
        }
      } catch (err) {
        console.error("Upload error:", err)
        setUploadError("Failed to upload file")
      }
    }

    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeUploadedFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!selectedSubmission || !studentId) return

    setIsSubmitting(true)
    setUploadError(null)

    try {
      const response = await fetch("/api/student/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: selectedSubmission.id,
          studentId,
          files: uploadedFiles.map((f) => ({
            name: f.name,
            type: f.type,
            url: f.url,
          })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitSuccess(true)
        setTimeout(() => {
          setShowSubmitModal(false)
          setSubmitSuccess(false)
          setSelectedSubmission(null)
          setUploadedFiles([])
          fetchSubjectDetails() // Refresh data
        }, 2000)
      } else {
        setUploadError(data.error || "Failed to submit")
      }
    } catch (err) {
      console.error("Submit error:", err)
      setUploadError("Failed to submit")
    } finally {
      setIsSubmitting(false)
    }
  }

  const openSubmitModal = (submission: Submission) => {
    setSelectedSubmission(submission)
    setUploadedFiles([])
    setUploadError(null)
    setSubmitSuccess(false)
    setShowSubmitModal(true)
  }

  const closeSubmitModal = () => {
    setShowSubmitModal(false)
    setSelectedSubmission(null)
    setUploadedFiles([])
    setUploadError(null)
  }

  const viewSubmissionDetails = async (submission: Submission) => {
    setViewingSubmission(submission)
    setShowViewModal(true)
  }

  const getStatusBadge = (submission: Submission) => {
    switch (submission.status) {
      case "graded":
        return (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-300">
            <CheckCircle className="w-3 h-3" />
            Graded: {submission.grade}
          </span>
        )
      case "submitted":
        return (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-blue-900/30 text-blue-300">
            <CheckCircle className="w-3 h-3" />
            Submitted
          </span>
        )
      case "overdue":
        return (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-900/30 text-red-300">
            <AlertCircle className="w-3 h-3" />
            Overdue
          </span>
        )
      default:
        return (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-slate-700 text-slate-300">
            <Clock className="w-3 h-3" />
            Not Submitted
          </span>
        )
    }
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "No due date"
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  // Loading state
  if (isLoading) {
    return (
        <div className="space-y-6 p-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-green-400 hover:text-green-300">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Subjects</span>
            </button>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-green-400 animate-spin" />
            <span className="ml-3 text-slate-400">Loading subject...</span>
          </div>
        </div>
    )
  }

  // Error state
  if (error) {
    return (
        <div className="space-y-6 p-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 text-green-400 hover:text-green-300">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Subjects</span>
            </button>
          </div>
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
            <p className="text-red-400">{error}</p>
            <button
                onClick={fetchSubjectDetails}
                className="ml-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
    )
  }

  return (
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-green-400 hover:text-green-300">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Subjects</span>
          </button>
          <button
              onClick={fetchSubjectDetails}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Subject Banner */}
        <div
            className={`bg-gradient-to-r ${subject.color || "from-green-500 to-green-600"} rounded-xl p-8 text-white shadow-lg`}
        >
          <h1 className="text-4xl font-bold mb-2">{subject.name}</h1>
          <p className="text-white/90 mb-4">{subject.code}</p>
          <div className="flex gap-6 text-sm flex-wrap">
            <div>
              <p className="text-white/70">Section</p>
              <p className="font-semibold">{subjectDetails?.section_name || subject.sectionName}</p>
            </div>
            <div>
              <p className="text-white/70">Grade Level</p>
              <p className="font-semibold">{subjectDetails?.grade_level_name || subject.gradeLevelName}</p>
            </div>
            <div>
              <p className="text-white/70">Instructor</p>
              <p className="font-semibold">
                {subjectDetails?.instructors?.map((i: any) => i.name).join(", ") || subject.instructors}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Course Content</h2>

          {folders.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                <Folder size={48} className="mx-auto text-slate-600 mb-4" />
                <p className="text-slate-400 font-medium mb-2">No content yet</p>
                <p className="text-slate-500 text-sm">Your instructor hasn't added any content yet</p>
              </div>
          ) : (
              <div className="space-y-3">
                {folders.map((folder) => (
                    <div
                        key={folder.id}
                        className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden"
                    >
                      {/* Folder Header */}
                      <button
                          onClick={() => toggleFolder(folder.id)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Folder size={20} className="text-green-400" />
                          <span className="font-semibold text-white">{folder.name}</span>
                          <span className="text-sm text-slate-400">({folder.submissions.length})</span>
                        </div>
                        {expandedFolders.has(folder.id) ? (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                        ) : (
                            <ChevronRight className="w-5 h-5 text-slate-400" />
                        )}
                      </button>

                      {/* Folder Contents */}
                      {expandedFolders.has(folder.id) && (
                          <div className="border-t border-slate-700/50 p-4 space-y-3">
                            {folder.submissions.length === 0 ? (
                                <p className="text-slate-500 text-sm text-center py-4">No submissions in this folder</p>
                            ) : (
                                folder.submissions.map((submission) => (
                                    <div
                                        key={submission.id}
                                        className="p-4 bg-slate-900 border border-slate-700/50 rounded-lg"
                                    >
                                      <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-3 mb-2">
                                            <FileText size={18} className="text-slate-400" />
                                            <h4 className="font-semibold text-white">{submission.name}</h4>
                                            {getStatusBadge(submission)}
                                          </div>
                                          {submission.description && (
                                              <p className="text-sm text-slate-400 mb-3 ml-7">{submission.description}</p>
                                          )}
                                          <div className="flex items-center gap-4 text-xs text-slate-500 ml-7">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Due: {formatDate(submission.dueDate)}
                                </span>
                                            <span>
                                  Attempts: {submission.attemptCount}/{submission.maxAttempts}
                                </span>
                                          </div>

                                          {/* Instructor files */}
                                          {submission.files.length > 0 && (
                                              <div className="mt-3 ml-7">
                                                <p className="text-xs text-slate-400 mb-2">Attached Files:</p>
                                                <div className="flex flex-wrap gap-2">
                                                  {submission.files.map((file) => (
                                                      <a
                                                          key={file.id}
                                                          href={file.url}
                                                          target="_blank"
                                                          rel="noopener noreferrer"
                                                          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                                                      >
                                                        <Download className="w-3 h-3" />
                                                        {file.name}
                                                      </a>
                                                  ))}
                                                </div>
                                              </div>
                                          )}

                                          {/* Feedback if graded */}
                                          {submission.feedback && (
                                              <div className="mt-3 ml-7 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                                                <p className="text-xs text-green-400 font-medium mb-1">Instructor Feedback:</p>
                                                <p className="text-sm text-green-300">{submission.feedback}</p>
                                              </div>
                                          )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col gap-2">
                                          {submission.canSubmit && submission.status !== "graded" && (
                                              <Button
                                                  onClick={() => openSubmitModal(submission)}
                                                  size="sm"
                                                  className="bg-green-600 hover:bg-green-700 gap-2"
                                              >
                                                <Upload className="w-4 h-4" />
                                                {submission.attemptCount > 0 ? "Resubmit" : "Submit"}
                                              </Button>
                                          )}
                                          {submission.studentSubmissionId && (
                                              <Button
                                                  onClick={() => viewSubmissionDetails(submission)}
                                                  size="sm"
                                                  variant="outline"
                                                  className="text-slate-300"
                                              >
                                                View Submission
                                              </Button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                ))
                            )}
                          </div>
                      )}
                    </div>
                ))}
              </div>
          )}
        </div>

        {/* Submit Modal */}
        {showSubmitModal && selectedSubmission && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 rounded-t-2xl">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Upload size={24} />
                    Submit Assignment
                  </h3>
                  <p className="text-green-100 text-sm mt-1">{selectedSubmission.name}</p>
                </div>

                <div className="p-6 space-y-4">
                  {!submitSuccess ? (
                      <>
                        {/* Submission Info */}
                        <div className="p-3 bg-slate-900 rounded-lg text-sm">
                          <div className="flex justify-between text-slate-400 mb-1">
                            <span>Due Date:</span>
                            <span className="text-white">{formatDate(selectedSubmission.dueDate)}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Attempt: </span>
                            <span className="text-white">
                        {selectedSubmission.attemptCount + 1} of {selectedSubmission.maxAttempts}
                      </span>
                          </div>
                        </div>

                        {/* File Upload Area */}
                        <div>
                          <label className="text-sm font-semibold text-slate-300 mb-2 block">
                            Upload Files
                          </label>
                          <div
                              onClick={() => fileInputRef.current?.click()}
                              className="border-2 border-dashed border-slate-600 hover:border-green-500 rounded-lg p-8 text-center cursor-pointer transition-colors"
                          >
                            {isUploading ? (
                                <Loader2 className="w-8 h-8 text-green-400 animate-spin mx-auto" />
                            ) : (
                                <>
                                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                  <p className="text-slate-400 text-sm">Click to upload files</p>
                                  <p className="text-slate-500 text-xs mt-1">
                                    PDF, DOC, DOCX, Images, ZIP (Max 10MB each)
                                  </p>
                                </>
                            )}
                          </div>
                          <input
                              ref={fileInputRef}
                              type="file"
                              multiple
                              onChange={handleFileSelect}
                              className="hidden"
                              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.webp,.zip,.rar"
                          />
                        </div>

                        {/* Uploaded Files List */}
                        {uploadedFiles.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-semibold text-slate-300">
                                Uploaded Files ({uploadedFiles.length})
                              </p>
                              {uploadedFiles.map((file, index) => (
                                  <div
                                      key={index}
                                      className="flex items-center justify-between p-3 bg-slate-900 rounded-lg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <File className="w-5 h-5 text-green-400" />
                                      <div>
                                        <p className="text-sm text-white truncate max-w-[200px]">{file.name}</p>
                                        <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                                      </div>
                                    </div>
                                    <button
                                        onClick={() => removeUploadedFile(index)}
                                        className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400 transition-colors"
                                    >
                                      <X className="w-4 h-4" />
                                    </button>
                                  </div>
                              ))}
                            </div>
                        )}

                        {/* Error */}
                        {uploadError && (
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                              <p className="text-red-300 text-sm">{uploadError}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                          <Button onClick={closeSubmitModal} variant="outline" className="flex-1">
                            Cancel
                          </Button>
                          <Button
                              onClick={handleSubmit}
                              disabled={isSubmitting || uploadedFiles.length === 0}
                              className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
                          >
                            {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Submitting...
                                </>
                            ) : (
                                <>
                                  <Upload className="w-4 h-4" />
                                  Submit
                                </>
                            )}
                          </Button>
                        </div>
                      </>
                  ) : (
                      <div className="py-8 text-center space-y-3">
                        <div className="w-16 h-16 mx-auto bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                        <p className="text-white font-semibold">Submitted Successfully!</p>
                        <p className="text-slate-400 text-sm">Your assignment has been submitted.</p>
                      </div>
                  )}
                </div>
              </div>
            </div>
        )}

        {/* View Submission Modal */}
        {showViewModal && viewingSubmission && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-2xl flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Your Submission</h3>
                    <p className="text-blue-100 text-sm mt-1">{viewingSubmission.name}</p>
                  </div>
                  <button
                      onClick={() => setShowViewModal(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="p-6 space-y-4">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status:</span>
                    {getStatusBadge(viewingSubmission)}
                  </div>

                  {/* Grade */}
                  {viewingSubmission.grade !== null && (
                      <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg text-center">
                        <p className="text-green-400 text-sm mb-1">Grade</p>
                        <p className="text-3xl font-bold text-green-300">{viewingSubmission.grade}</p>
                      </div>
                  )}

                  {/* Feedback */}
                  {viewingSubmission.feedback && (
                      <div className="p-4 bg-slate-900 rounded-lg">
                        <p className="text-sm text-slate-400 mb-2">Instructor Feedback:</p>
                        <p className="text-white">{viewingSubmission.feedback}</p>
                      </div>
                  )}

                  {/* Submitted At */}
                  {viewingSubmission.submittedAt && (
                      <div className="text-sm text-slate-400">
                        Submitted: {new Date(viewingSubmission.submittedAt).toLocaleString()}
                      </div>
                  )}

                  {/* Attempt Info */}
                  <div className="text-sm text-slate-400">
                    Attempt {viewingSubmission.attemptCount} of {viewingSubmission.maxAttempts}
                  </div>

                  <Button onClick={() => setShowViewModal(false)} className="w-full">
                    Close
                  </Button>
                </div>
              </div>
            </div>
        )}
      </div>
  )
}