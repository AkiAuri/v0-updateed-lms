"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LandingPageProps {
  onNavigate: (page: "login" | "landing") => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/75 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <svg
                className="h-8 w-8 text-primary"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 60 80 Q 50 80 50 90 L 50 160 Q 50 170 60 170 L 80 170 Q 90 170 90 160 L 90 110 M 90 110 L 110 60 Q 115 45 125 45 Q 135 45 140 55 L 140 160 Q 140 170 150 170 L 160 170 Q 170 170 170 160 L 170 90 M 90 110 L 100 70 Q 105 50 115 50 Q 125 50 130 60 L 130 160 Q 130 170 140 170 L 150 170 Q 160 170 160 160 L 160 100"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="65" y="95" width="8" height="50" fill="#6366f1" rx="4" />
                <rect x="80" y="85" width="8" height="60" fill="#f59e0b" rx="4" />
                <rect x="95" y="90" width="8" height="55" fill="#ef4444" rx="4" />
              </svg>
              <span className="text-2xl font-bold text-foreground">PRESENT</span>
            </div>
            <div className="hidden gap-8 md:flex">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Benefits
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
            <Button
              onClick={() => onNavigate("login")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Welcome to PRESENT
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            A modern learning management system designed for seamless education. Connect, learn, and grow with PRESENT.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button
              onClick={() => onNavigate("login")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-muted px-8 py-6 text-lg bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Intuitive Dashboard", desc: "Clean, organized interface for all users" },
              { title: "Real-time Updates", desc: "Stay connected with instant notifications" },
              { title: "QR Attendance", desc: "Quick and reliable attendance tracking" },
              { title: "Task Management", desc: "Submit and track assignments easily" },
              { title: "Grade Tracking", desc: "Monitor your academic progress" },
              { title: "Secure Communication", desc: "Direct messaging between students and teachers" },
            ].map((feature, i) => (
              <Card key={i} className="bg-card border-border/40 hover:border-border/80 transition-colors">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="border-t border-border/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 bg-card/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose PRESENT?</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              {
                title: "For Students",
                desc: "Streamlined learning experience with easy access to all your courses and grades",
              },
              { title: "For Teachers", desc: "Efficient classroom management and student progress tracking" },
              { title: "For Admins", desc: "Comprehensive system oversight and user management" },
              { title: "For Everyone", desc: "Secure, reliable, and always available when you need it" },
            ].map((benefit, i) => (
              <div key={i} className="p-6 bg-background rounded-lg border border-border/40">
                <h3 className="text-lg font-semibold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/40 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">Join thousands of educators and students using PRESENT today.</p>
          <Button
            onClick={() => onNavigate("login")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
          >
            Login Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <svg
                className="h-6 w-6 text-primary"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 60 80 Q 50 80 50 90 L 50 160 Q 50 170 60 170 L 80 170 Q 90 170 90 160 L 90 110 M 90 110 L 110 60 Q 115 45 125 45 Q 135 45 140 55 L 140 160 Q 140 170 150 170 L 160 170 Q 170 170 170 160 L 170 90 M 90 110 L 100 70 Q 105 50 115 50 Q 125 50 130 60 L 130 160 Q 130 170 140 170 L 150 170 Q 160 170 160 160 L 160 100"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect x="65" y="95" width="8" height="50" fill="#6366f1" rx="4" />
                <rect x="80" y="85" width="8" height="60" fill="#f59e0b" rx="4" />
                <rect x="95" y="90" width="8" height="55" fill="#ef4444" rx="4" />
              </svg>
              <span className="font-bold text-foreground">PRESENT</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 PRESENT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
