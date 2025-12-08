"use client"

interface AdminDashboardPageProps {
  onNavigate?: (page: string, tab?: string) => void
}

export default function AdminDashboardPage({ onNavigate }: AdminDashboardPageProps) {
  const stats = [
    { label: "School Years", value: "4", icon: "📅" },
    { label: "Sections", value: "24", icon: "🏫" },
    { label: "Subjects", value: "156", icon: "📚" },
    { label: "Instructors", value: "45", icon: "🧑‍🏫" },
    { label: "Students", value: "1,250", icon: "👨‍🎓" },
  ]

  const handleAddStudent = () => {
    onNavigate?.("accounts", "students")
  }

  const handleAddInstructor = () => {
    onNavigate?.("accounts", "instructors")
  }

  const handleCreateSchoolYear = () => {
    onNavigate?.("courses")
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">System overview and quick stats</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className="text-4xl opacity-50">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-6 py-4 border-b border-slate-700/50">
            <h3 className="font-bold text-white">Recent Activities</h3>
            <p className="text-xs text-slate-400 mt-1">Latest system updates</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="py-3 border-b border-slate-700/30 flex justify-between items-start">
              <div>
                <p className="font-medium text-white">New student registered</p>
                <p className="text-xs text-slate-400">2 hours ago</p>
              </div>
            </div>
            <div className="py-3 border-b border-slate-700/30 flex justify-between items-start">
              <div>
                <p className="font-medium text-white">Course enrollment updated</p>
                <p className="text-xs text-slate-400">4 hours ago</p>
              </div>
            </div>
            <div className="py-3 flex justify-between items-start">
              <div>
                <p className="font-medium text-white">New semester created</p>
                <p className="text-xs text-slate-400">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-6 py-4 border-b border-slate-700/50">
            <h3 className="font-bold text-white">Quick Actions</h3>
            <p className="text-xs text-slate-400 mt-1">Common administrative tasks</p>
          </div>
          <div className="p-6 space-y-3">
            <button
              onClick={handleAddStudent}
              className="w-full px-4 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors text-sm font-medium border border-blue-500/30"
            >
              Add New Student
            </button>
            <button
              onClick={handleAddInstructor}
              className="w-full px-4 py-3 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 rounded-lg transition-colors text-sm font-medium border border-cyan-500/30"
            >
              Add New Instructor
            </button>
            <button
              onClick={handleCreateSchoolYear}
              className="w-full px-4 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg transition-colors text-sm font-medium border border-purple-500/30"
            >
              Create School Year
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
