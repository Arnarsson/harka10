"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  BookOpen, 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Award, 
  Star,
  Users,
  TrendingUp,
  Brain,
  Target,
  CheckCircle,
  Lock,
  Zap,
  Calendar,
  MessageSquare,
  Download
} from "lucide-react"

export function ComprehensiveLearning() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPath, setSelectedPath] = useState("all")

  const learningPaths = [
    {
      id: "fundamentals",
      title: "AI Fundamentals",
      description: "Master the basics of artificial intelligence",
      level: "Beginner",
      duration: "4 weeks",
      courses: 8,
      progress: 100,
      status: "completed",
      icon: Brain,
      color: "bg-green-500"
    },
    {
      id: "prompt-engineering",
      title: "Prompt Engineering",
      description: "Learn to craft effective AI prompts",
      level: "Intermediate",
      duration: "3 weeks",
      courses: 6,
      progress: 60,
      status: "in-progress",
      icon: MessageSquare,
      color: "bg-blue-500"
    },
    {
      id: "implementation",
      title: "AI Implementation",
      description: "Build real-world AI solutions",
      level: "Advanced",
      duration: "6 weeks",
      courses: 12,
      progress: 0,
      status: "locked",
      icon: Zap,
      color: "bg-purple-500"
    },
    {
      id: "ethics",
      title: "AI Ethics & Governance",
      description: "Responsible AI development",
      level: "Intermediate",
      duration: "2 weeks",
      courses: 4,
      progress: 25,
      status: "in-progress",
      icon: Award,
      color: "bg-orange-500"
    }
  ]

  const recommendedCourses = [
    {
      id: 1,
      title: "Advanced Prompt Techniques",
      instructor: "Sarah Johnson",
      duration: "2h 30m",
      level: "Intermediate",
      rating: 4.9,
      students: 1234,
      progress: 0,
      thumbnail: "/api/placeholder/300/200",
      isNew: true,
      tags: ["Prompt Engineering", "Advanced"]
    },
    {
      id: 2,
      title: "Building AI Chatbots",
      instructor: "Michael Chen",
      duration: "3h 15m",
      level: "Intermediate",
      rating: 4.8,
      students: 987,
      progress: 45,
      thumbnail: "/api/placeholder/300/200",
      isNew: false,
      tags: ["Implementation", "Chatbots"]
    },
    {
      id: 3,
      title: "AI in Customer Service",
      instructor: "Emma Wilson",
      duration: "1h 45m",
      level: "Beginner",
      rating: 4.7,
      students: 2156,
      progress: 0,
      thumbnail: "/api/placeholder/300/200",
      isNew: true,
      tags: ["Business", "Customer Service"]
    }
  ]

  const continueLearning = [
    {
      id: 1,
      title: "Prompt Engineering Masterclass",
      progress: 75,
      nextLesson: "Advanced Chain-of-Thought",
      timeLeft: "15 minutes",
      type: "video"
    },
    {
      id: 2,
      title: "AI Ethics Workshop",
      progress: 30,
      nextLesson: "Bias in AI Systems",
      timeLeft: "25 minutes",
      type: "interactive"
    }
  ]

  const achievements = [
    { name: "First Course Completed", earned: true, date: "2 days ago" },
    { name: "Week Streak", earned: true, date: "1 week ago" },
    { name: "Prompt Master", earned: false, requirement: "Complete 10 prompt exercises" },
    { name: "AI Pioneer", earned: false, requirement: "Build first AI application" }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "AI Implementation Workshop",
      date: "Tomorrow, 2:00 PM",
      type: "Live Session",
      instructor: "Dr. Alex Rodriguez"
    },
    {
      id: 2,
      title: "Prompt Engineering Q&A",
      date: "Friday, 10:00 AM",
      type: "Q&A Session",
      instructor: "Sarah Johnson"
    }
  ]

  const studyGroups = [
    {
      id: 1,
      name: "AI Beginners Circle",
      members: 24,
      activity: "Active now",
      topic: "Discussing neural networks basics"
    },
    {
      id: 2,
      name: "Prompt Engineers",
      members: 18,
      activity: "2 hours ago",
      topic: "Sharing prompt templates"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Learning Hub</h1>
          <p className="text-muted-foreground">Your personalized AI education journey</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download App
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search courses, topics, or instructors..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="courses">All Courses</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Continue Learning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {continueLearning.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">Next: {course.nextLesson}</p>
                      </div>
                      <Badge variant={course.type === "video" ? "default" : "secondary"}>
                        {course.type}
                      </Badge>
                    </div>
                    <Progress value={course.progress} className="mb-3" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{course.timeLeft}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-3" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Recommended for You
              </CardTitle>
              <CardDescription>Based on your progress and interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted relative">
                      {course.isNew && (
                        <Badge className="absolute top-2 left-2">New</Badge>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium line-clamp-2">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.students}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm">{course.rating}</span>
                          </div>
                          <Badge variant="outline">{course.level}</Badge>
                        </div>
                        {course.progress > 0 && (
                          <div className="space-y-1">
                            <Progress value={course.progress} className="h-2" />
                            <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
                          </div>
                        )}
                        <div className="flex gap-1 flex-wrap">
                          {course.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button className="w-full mt-3" size="sm">
                        {course.progress > 0 ? "Continue" : "Start Course"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Stats and Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                      <Award className={`h-4 w-4 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.earned ? achievement.date : achievement.requirement}
                      </p>
                    </div>
                    {achievement.earned && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.instructor}</p>
                        <p className="text-sm text-blue-600">{event.date}</p>
                      </div>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <Button size="sm" className="w-full mt-2">Join</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="paths" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${path.color.replace('bg-', 'bg-')}/10`}>
                        <path.icon className={`h-6 w-6 ${path.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{path.title}</CardTitle>
                        <CardDescription>{path.description}</CardDescription>
                      </div>
                    </div>
                    {path.status === "locked" && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">{path.level}</Badge>
                        <span className="text-muted-foreground">{path.duration}</span>
                        <span className="text-muted-foreground">{path.courses} courses</span>
                      </div>
                      <Badge variant={
                        path.status === "completed" ? "default" :
                        path.status === "in-progress" ? "secondary" : "outline"
                      }>
                        {path.status === "completed" ? "Completed" :
                         path.status === "in-progress" ? "In Progress" : "Locked"}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} />
                    </div>

                    <Button 
                      className="w-full" 
                      variant={path.status === "locked" ? "outline" : "default"}
                      disabled={path.status === "locked"}
                    >
                      {path.status === "completed" ? "Review" :
                       path.status === "in-progress" ? "Continue" : "Start Learning"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button 
              variant={selectedPath === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPath("all")}
            >
              All Courses
            </Button>
            {learningPaths.map((path) => (
              <Button
                key={path.id}
                variant={selectedPath === path.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPath(path.id)}
              >
                {path.title}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative">
                  {course.isNew && (
                    <Badge className="absolute top-2 left-2">New</Badge>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium line-clamp-2">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">by {course.instructor}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{course.rating}</span>
                      </div>
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-3" size="sm">
                    Start Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Study Groups
                </CardTitle>
                <CardDescription>Join peers on similar learning journeys</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {studyGroups.map((group) => (
                  <div key={group.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">{group.members} members</p>
                      </div>
                      <Badge variant="outline">{group.activity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{group.topic}</p>
                    <Button size="sm" className="w-full">Join Group</Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Create Study Group
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Learning Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-muted-foreground">Hours This Month</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-sm text-muted-foreground">Courses Completed</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold">#3</div>
                    <div className="text-sm text-muted-foreground">Leaderboard</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}