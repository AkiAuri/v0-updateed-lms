"use client"

import type React from "react"
import { useState } from "react"
import { Upload, FileText, X, Eye } from "lucide-react"

interface Task {
  id: string
  category: string
  title: string
  status: "pending" | "submitted" | "graded"
  dueDate: string
  grade: number | null
}

interface TaskSubmissionProps {
  task: Task
}

export default function TaskSubmission({ task }: TaskSubmissionProps) {
  const [showUpload, setShowUpload] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [attempts, setAttempts] = useState(task.status !== "pending" ? 1 : 0)
  const [submittedImages, setSubmittedImages] = useState<string[]>(
    task.status !== "pending" ? ["Submitted image 1"] : [],
  )
  const [showImageGallery, setShowImageGallery] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (file) {
      setAttempts(attempts + 1)
      setSubmittedImages([...submittedImages, file.name])
      setFile(null)
      setShowUpload(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-900/30 text-amber-300"
      case "submitted":
        return "bg-blue-900/30 text-blue-300"
      case "graded":
        return "bg-green-900/30 text-green-300"
      default:
        return "bg-slate-700 text-slate-300"
    }
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-700 rounded-lg">
              <FileText size={18} className="text-slate-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{task.category}</span>
              <h3 className="font-bold text-white">{task.title}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3 flex-wrap text-sm">
            <span className="text-slate-500">Due: {task.dueDate}</span>
            <span className={`px-3 py-1 rounded-full font-medium text-xs ${getStatusColor(task.status)}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span className="text-slate-400">Attempts: {attempts}</span>
            {task.grade !== null && <span className="text-blue-400 font-bold">Grade: {task.grade}</span>}
          </div>
        </div>

        <div className="flex gap-2">
          {submittedImages.length > 0 && (
            <button
              onClick={() => setShowImageGallery(true)}
              className="px-4 py-2 rounded-lg font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors flex items-center gap-2"
            >
              <Eye size={16} />
              View
            </button>
          )}
          <button
            onClick={() => setShowUpload(!showUpload)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              task.status === "pending" || submittedImages.length > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            <Upload size={16} />
            {submittedImages.length > 0 ? "Submit Again" : "Submit"}
          </button>
        </div>
      </div>

      {/* Upload Section */}
      {showUpload && (
        <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border-2 border-dashed border-slate-600">
          <label className="cursor-pointer block">
            <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            <div className="text-center py-6">
              <Upload size={32} className="mx-auto text-slate-500 mb-2" />
              <p className="text-slate-300 font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
            </div>
          </label>

          {file && (
            <div className="mt-4 p-3 bg-slate-800 rounded-lg flex items-center justify-between">
              <span className="text-sm font-medium text-slate-200">{file.name}</span>
              <button
                onClick={handleSubmit}
                className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm transition-colors"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full border border-slate-700">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Submitted Images ({submittedImages.length})</h2>
              <button
                onClick={() => setShowImageGallery(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-700 rounded-lg p-6 text-center">
                <FileText size={48} className="mx-auto text-slate-500 mb-2" />
                <p className="text-slate-300">{submittedImages[selectedImageIndex]}</p>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                {submittedImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      idx === selectedImageIndex
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    Image {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
