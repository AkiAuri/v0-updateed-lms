"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const systemStatsData = [
    { label: "Total Users", value: "2,543", icon: "👥", color: "bg-primary/10" },
    { label: "Active Courses", value: "156", icon: "📚", color: "bg-secondary/10" },
    { label: "Storage Used", value: "2.4 TB", icon: "💾", color: "bg-chart-1/10" },
  ]

  const userDistributionData = [
    { name: "Students", value: 1800, fill: "var(--color-primary)" },
    { name: "Teachers", value: 450, fill: "var(--color-secondary)" },
    { name: "Admins", value: 50, fill: "var(--color-accent)" },
    { name: "Guests", value: 243, fill: "var(--color-chart-4)" },
  ]

  const activityData = [
    { name: "Mon", logins: 2400, submissions: 1200, uploads: 800 },
    { name: "Tue", logins: 2210, submissions: 1290, uploads: 900 },
    { name: "Wed", logins: 2290, submissions: 1000, uploads: 1100 },
    { name: "Thu", logins: 2000, submissions: 1108, uploads: 950 },
    { name: "Fri", logins: 2181, submissions: 1280, uploads: 1050 },
    { name: "Sat", logins: 2500, submissions: 1390, uploads: 1200 },
    { name: "Sun", logins: 2100, submissions: 980, uploads: 800 },
  ]

  const recentUsersData = [
    { id: 1, name: "John Doe", role: "Student", email: "john@example.com", joinDate: "2 days ago", status: "active" },
    { id: 2, name: "Jane Smith", role: "Teacher", email: "jane@example.com", joinDate: "1 week ago", status: "active" },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Student",
      email: "mike@example.com",
      joinDate: "3 days ago",
      status: "active",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Teacher",
      email: "sarah@example.com",
      joinDate: "2 weeks ago",
      status: "inactive",
    },
    { id: 5, name: "Tom Brown", role: "Student", email: "tom@example.com", joinDate: "5 days ago", status: "active" },
  ]

  return (
    <div className="flex h-screen bg-slate-950">
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-slate-900 border-r border-slate-700/50 transition-all duration-300 flex flex-col shadow-lg`}
      >
        <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
          {sidebarOpen && <span className="font-bold text-foreground text-lg">PRESENT</span>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-foreground hover:bg-muted/30 p-2 rounded transition-colors"
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: "📊", label: "Dashboard", active: true },
            { icon: "👥", label: "Accounts" },
            { icon: "🔒", label: "Security" },
          ].map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-primary/20 text-primary border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <Button
            onClick={onLogout}
            className="w-full bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
          >
            {sidebarOpen ? "Logout" : "↪"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-background/75 backdrop-blur-md px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">System overview and management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                AU
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6 bg-slate-950">
          {/* System Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            {systemStatsData.map((stat, index) => (
              <Card
                key={index}
                className="border border-slate-700/50 bg-slate-800 hover:border-primary/50 hover:shadow-lg transition-all duration-200"
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg text-2xl`}>{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* User Distribution */}
            <Card className="border border-slate-700/50 shadow-sm">
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of system users by role</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {userDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* System Activity */}
            <Card className="border border-slate-700/50 shadow-sm">
              <CardHeader>
                <CardTitle>System Activity</CardTitle>
                <CardDescription>Weekly activity metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="logins"
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      name="Logins"
                      dot={{ fill: "var(--color-primary)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="submissions"
                      stroke="var(--color-secondary)"
                      strokeWidth={2}
                      name="Submissions"
                      dot={{ fill: "var(--color-secondary)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uploads"
                      stroke="var(--color-accent)"
                      strokeWidth={2}
                      name="Uploads"
                      dot={{ fill: "var(--color-accent)", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Activity Chart */}
          <Card className="border border-slate-700/50 shadow-sm">
            <CardHeader>
              <CardTitle>Detailed Activity Trends</CardTitle>
              <CardDescription>System usage patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="logins" fill="var(--color-primary)" name="Logins" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="submissions" fill="var(--color-secondary)" name="Submissions" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="uploads" fill="var(--color-accent)" name="Uploads" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Accounts Table */}
          <Card className="border border-slate-700/50 shadow-sm">
            <CardHeader>
              <CardTitle>User Accounts</CardTitle>
              <CardDescription>Manage and view all user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Join Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsersData.map((user) => (
                      <tr key={user.id} className="border-b border-slate-700/50 hover:bg-muted/20 transition-colors">
                        <td className="py-3 px-4 text-foreground font-medium">{user.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{user.role}</td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{user.email}</td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{user.joinDate}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                              user.status === "active" ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
