"use client"

import { Search, Star, Users, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("")

  const courses = [
    {
      id: 1,
      name: "Web Development 101",
      instructor: "Dr. Sarah Johnson",
      students: 342,
      duration: "12 weeks",
      rating: 4.8,
      progress: 75,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Database Systems",
      instructor: "Prof. Michael Chen",
      students: 218,
      duration: "10 weeks",
      rating: 4.6,
      progress: 60,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Computer Science",
      instructor: "Dr. Emily Rodriguez",
      students: 456,
      duration: "14 weeks",
      rating: 4.9,
      progress: 85,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "Machine Learning Basics",
      instructor: "Prof. David Kim",
      students: 289,
      duration: "8 weeks",
      rating: 4.7,
      progress: 45,
      color: "from-orange-500 to-red-500",
    },
  ]

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">My Courses</h1>
        <p className="text-muted-foreground">Explore and manage your enrolled courses</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search courses or instructors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-card border-border"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            {/* Course Header with Gradient */}
            <div
              className={`h-32 bg-gradient-to-br ${course.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
            />

            {/* Course Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{course.name}</h3>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </div>
                <div className="flex items-center gap-1 bg-accent/20 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-accent-foreground fill-accent-foreground" />
                  <span className="text-sm font-semibold text-accent-foreground">{course.rating}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Progress</span>
                  <span className="text-xs font-bold text-primary">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Course Info */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found matching your search.</p>
        </div>
      )}
    </div>
  )
}
