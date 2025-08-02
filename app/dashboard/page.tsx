'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  MessageSquare, 
  Bookmark, 
  Trophy, 
  Target,
  Play,
  Clock,
  Star,
  ChevronRight,
  BrainCircuit
} from 'lucide-react';

export default function DashboardPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const stats = {
    coursesCompleted: 3,
    totalCourses: 12,
    studyStreak: 7,
    certificatesEarned: 2,
    teamMembers: 8,
    hoursLearned: 24
  };

  const recentCourses = [
    {
      id: 1,
      title: "AI Fundamentals",
      progress: 75,
      timeLeft: "2 hours",
      status: "In Progress",
      badge: "beginner"
    },
    {
      id: 2,
      title: "Prompt Engineering",
      progress: 100,
      timeLeft: "Completed",
      status: "Completed",
      badge: "intermediate"
    },
    {
      id: 3,
      title: "MCP Development",
      progress: 30,
      timeLeft: "6 hours",
      status: "In Progress", 
      badge: "advanced"
    }
  ];

  const teamActivity = [
    { name: "Anna Nielsen", action: "completed", course: "AI Ethics", time: "2 hours ago" },
    { name: "Lars Hansen", action: "started", course: "Machine Learning", time: "4 hours ago" },
    { name: "Sofia Andersen", action: "earned certificate", course: "NLP Basics", time: "1 day ago" }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Ready to continue your AI journey?</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Play className="w-4 h-4 mr-2" />
          Continue Learning
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coursesCompleted}/{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">25% completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.studyStreak} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
            <p className="text-xs text-muted-foreground">2 more to unlock advanced track</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teamMembers}</div>
            <p className="text-xs text-muted-foreground">Active learners</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notes">Notes & Bookmarks</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5" />
                  48-Hour AI Mastery Program
                </CardTitle>
                <CardDescription>
                  Intensive AI training program designed for rapid skill acquisition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">Progress: 60%</div>
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  <Badge variant="outline">Featured</Badge>
                </div>
                <Button className="w-full">Continue Program</Button>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              <h3 className="text-lg font-semibold">Recent Courses</h3>
              {recentCourses.map((course) => (
                <Card key={course.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-3 h-3" />
                            {course.timeLeft}
                            <Badge variant="outline" className="ml-2">
                              {course.badge}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{course.progress}%</div>
                          <div className="w-16 bg-gray-200 rounded-full h-1">
                            <div 
                              className="bg-green-600 h-1 rounded-full" 
                              style={{width: `${course.progress}%`}}
                            ></div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
              <CardDescription>Recent activity from your team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {activity.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.name}</span> {activity.action} <span className="font-medium">{activity.course}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Manage Team
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notes & Bookmarks</CardTitle>
              <CardDescription>Your saved learning materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bookmark className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">Neural Network Architectures</p>
                    <p className="text-xs text-gray-500">From: AI Fundamentals, Lesson 5</p>
                  </div>
                </div>
                <Badge variant="outline">Note</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">Best Practices for Prompt Engineering</p>
                    <p className="text-xs text-gray-500">From: Prompt Engineering, Lesson 2</p>
                  </div>
                </div>
                <Badge variant="outline">Bookmark</Badge>
              </div>
              <Button variant="outline" className="w-full">
                <Bookmark className="w-4 h-4 mr-2" />
                Manage Notes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Assistant Tab */}
        <TabsContent value="ai-assistant" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Learning Assistant</CardTitle>
              <CardDescription>Get personalized help with your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  👋 Hi! I'm your AI learning assistant. I can help you with course material, answer questions, and provide coding examples.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">Explain neural networks</Button>
                  <Button variant="outline" size="sm">Show me Python examples</Button>
                  <Button variant="outline" size="sm">Quiz me on AI concepts</Button>
                </div>
              </div>
              <Button className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start Conversation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}