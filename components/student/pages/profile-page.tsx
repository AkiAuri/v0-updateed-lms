"use client"

import { useState } from "react"
import { Mail, User, Building2, Shield, Eye, EyeOff } from "lucide-react"

interface StudentProfileProps {
  studentName: string
}

export default function StudentProfile({ studentName }: StudentProfileProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const studentData = {
    fullName: "Alexander James Torres",
    firstName: "Alexander",
    middleName: "James",
    surname: "Torres",
    email: "alexander.torres@student.edu",
    section: "BSCS-2A",
    studentId: "2024-001234",
  }

  const handlePasswordChange = () => {
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      setPasswordSuccess(true)
      setNewPassword("")
      setConfirmPassword("")
      setTimeout(() => {
        setShowPasswordModal(false)
        setPasswordSuccess(false)
      }, 2000)
    }
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 md:px-8 py-12 md:py-16">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <User size={48} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{studentData.fullName}</h1>
              <p className="text-blue-100 text-lg mt-2">{studentData.section}</p>
              <p className="text-blue-100/80 text-sm">Student ID: {studentData.studentId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <User size={18} className="text-blue-400" />
              </div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Full Name</label>
            </div>
            <p className="text-white text-lg font-semibold ml-11">{studentData.fullName}</p>
          </div>

          {/* First Name */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <User size={18} className="text-cyan-400" />
              </div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">First Name</label>
            </div>
            <p className="text-white text-lg font-semibold ml-11">{studentData.firstName}</p>
          </div>

          {/* Middle Name */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <User size={18} className="text-blue-400" />
              </div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Middle Name</label>
            </div>
            <p className="text-white text-lg font-semibold ml-11">{studentData.middleName}</p>
          </div>

          {/* Surname */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <User size={18} className="text-cyan-400" />
              </div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Surname</label>
            </div>
            <p className="text-white text-lg font-semibold ml-11">{studentData.surname}</p>
          </div>

          {/* Email */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Mail size={18} className="text-blue-400" />
              </div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email Address</label>
            </div>
            <p className="text-white text-lg font-semibold ml-11 truncate">{studentData.email}</p>
          </div>

          {/* Section */}
          <div className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-5 transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Building2 size={18} className="text-cyan-400" />
              </div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Section</label>
            </div>
            <p className="text-white text-lg font-semibold ml-11">{studentData.section}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Security</h2>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="w-full md:w-auto flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          <Shield size={20} />
          Change Password
        </button>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield size={24} />
                Change Password
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {!passwordSuccess ? (
                <>
                  {/* New Password */}
                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">New Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="text-sm font-semibold text-slate-300 mb-2 block">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                      <p className="text-red-300 text-sm">Passwords do not match</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setShowPasswordModal(false)}
                      className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handlePasswordChange}
                      disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all"
                    >
                      Update Password
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center">
                    <div className="text-2xl">✓</div>
                  </div>
                  <p className="text-white font-semibold">Password Updated!</p>
                  <p className="text-slate-400 text-sm">Your password has been successfully changed.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
