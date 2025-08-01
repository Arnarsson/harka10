"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Award,
  Download,
  Share2,
  ExternalLink,
  Calendar,
  Clock,
  CheckCircle,
  Search,
  Filter,
  TrendingUp,
  Users,
  Star,
  Eye,
  Trophy,
  Medal,
  Target
} from "lucide-react"

export function HarkaCertificates() {
  const [searchQuery, setSearchQuery] = useState("")

  const certificates = [
    {
      id: "1",
      title: "AI Fundamentals Certification",
      course: "AI Fundamentals",
      completedDate: "2024-01-15",
      certificateNumber: "HARKA-AI-2024-001",
      instructor: "Dr. Sarah Chen",
      duration: "40 hours",
      skills: ["Machine Learning", "Neural Networks", "AI Ethics", "Data Processing"],
      grade: "A+",
      score: 95,
      verificationUrl: "https://verify.harka.com/cert/HARKA-AI-2024-001",
      status: "issued",
      creditsEarned: 4.0
    },
    {
      id: "2", 
      title: "Machine Learning Specialist",
      course: "Advanced Machine Learning",
      completedDate: "2023-12-20",
      certificateNumber: "HARKA-ML-2023-078",
      instructor: "Prof. Michael Zhang",
      duration: "60 hours", 
      skills: ["Deep Learning", "TensorFlow", "Model Optimization", "Computer Vision"],
      grade: "A",
      score: 88,
      verificationUrl: "https://verify.harka.com/cert/HARKA-ML-2023-078",
      status: "issued",
      creditsEarned: 6.0
    },
    {
      id: "3",
      title: "AI Ethics & Governance",
      course: "Ethics & Governance",
      completedDate: "2023-11-10", 
      certificateNumber: "HARKA-ETH-2023-156",
      instructor: "Dr. Emma Wilson",
      duration: "25 hours",
      skills: ["Ethical AI", "Bias Detection", "Regulatory Compliance", "Risk Assessment"],
      grade: "A+",
      score: 92,
      verificationUrl: "https://verify.harka.com/cert/HARKA-ETH-2023-156", 
      status: "issued",
      creditsEarned: 3.0
    }
  ]

  const stats = {
    totalCertificates: 3,
    totalCredits: 13.0,
    averageScore: 91.7,
    completionRate: 100
  }

  const achievements = [
    { name: "First Certificate", description: "Earned your first HARKA certificate", icon: "🏆", date: "2023-11-10" },
    { name: "High Achiever", description: "Scored 90+ on 3 certificates", icon: "⭐", date: "2024-01-15" },
    { name: "Ethics Champion", description: "Completed AI Ethics certification", icon: "🛡️", date: "2023-11-10" },
    { name: "ML Expert", description: "Mastered Machine Learning fundamentals", icon: "🧠", date: "2023-12-20" }
  ]

  const upcomingCertifications = [
    { name: "AI Implementation Specialist", progress: 75, estimatedCompletion: "2 weeks" },
    { name: "Advanced Neural Networks", progress: 45, estimatedCompletion: "1 month" },
    { name: "AI Project Management", progress: 20, estimatedCompletion: "6 weeks" }
  ]

  const handleDownload = (certificateId: string) => {
    console.log(`Downloading certificate ${certificateId}`)
  }

  const handleShare = (certificate: any) => {
    const shareText = `I just earned my ${certificate.title} from HARKA! Verify at: ${certificate.verificationUrl}`
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificate.verificationUrl)}&summary=${encodeURIComponent(shareText)}`
    window.open(linkedInUrl, '_blank')
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
      case "A":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
      case "B+":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Award className="h-8 w-8 text-primary" />
            Certificates
          </h1>
          <p className="text-muted-foreground mt-2">Your HARKA certification achievements and credentials</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <ExternalLink className="mr-2 h-4 w-4" />
            Verify Certificate
          </Button>
          <Button>
            <Trophy className="mr-2 h-4 w-4" />
            Browse Available
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCertificates}</div>
            <p className="text-xs text-muted-foreground">Across all programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCredits}</div>
            <p className="text-xs text-muted-foreground">Professional credits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Across all exams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Course completion</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>My Certificates</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search certificates..."
                      className="pl-10 w-80"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {certificates.map((certificate) => (
                  <Card key={certificate.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Certificate Header */}
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                                <Award className="h-6 w-6 text-primary-foreground" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">{certificate.title}</h3>
                                <p className="text-sm text-muted-foreground">{certificate.course}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getGradeColor(certificate.grade)}>
                              {certificate.grade}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {certificate.score}%
                            </Badge>
                          </div>
                        </div>

                        {/* Certificate Details */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Completed: {new Date(certificate.completedDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Duration: {certificate.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>Instructor: {certificate.instructor}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Target className="h-4 w-4" />
                            <span>Credits: {certificate.creditsEarned}</span>
                          </div>
                        </div>

                        {/* Skills */}
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Skills Verified:</p>
                          <div className="flex flex-wrap gap-2">
                            {certificate.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Certificate Number */}
                        <div className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                          Certificate ID: {certificate.certificateNumber}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-2">
                            <Button size="sm" onClick={() => handleDownload(certificate.id)}>
                              <Download className="mr-2 h-3 w-3" />
                              Download PDF
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleShare(certificate)}>
                              <Share2 className="mr-2 h-3 w-3" />
                              Share on LinkedIn
                            </Button>
                          </div>
                          <Button size="sm" variant="ghost" asChild>
                            <a href={certificate.verificationUrl} target="_blank" rel="noopener noreferrer">
                              <CheckCircle className="mr-2 h-3 w-3" />
                              Verify
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{achievement.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Earned {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* In Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                In Progress
              </CardTitle>
              <CardDescription>Certifications you're working towards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingCertifications.map((cert, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{cert.name}</h4>
                      <span className="text-xs text-muted-foreground">{cert.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div 
                        className="bg-primary h-1.5 rounded-full transition-all"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Est. completion: {cert.estimatedCompletion}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certificate Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Why HARKA Certificates?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Industry Recognition</p>
                    <p className="text-xs text-muted-foreground">Recognized by leading tech companies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Blockchain Verified</p>
                    <p className="text-xs text-muted-foreground">Tamper-proof digital credentials</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Career Advancement</p>
                    <p className="text-xs text-muted-foreground">Boost your professional profile</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Continuing Education</p>
                    <p className="text-xs text-muted-foreground">Earn professional development credits</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}