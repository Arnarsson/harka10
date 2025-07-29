"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { 
  Users, 
  Target, 
  Clock, 
  Award,
  PlayCircle,
  Calendar,
  FileText,
  BarChart3,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export function EnhancedDashboard() {
  const departmentData = [
    { name: 'Engineering', value: 35, color: '#3b82f6' },
    { name: 'Marketing', value: 25, color: '#f59e0b' },
    { name: 'Sales', value: 20, color: '#10b981' },
    { name: 'HR', value: 20, color: '#8b5cf6' }
  ]

  const phaseProgressData = [
    { name: 'Fundamentals', completed: 18, total: 24 },
    { name: 'Ethics', completed: 12, total: 24 },
    { name: 'Implementation', completed: 6, total: 24 }
  ]

  const topPerformers = [
    { name: 'Sarah Johnson', role: 'Senior Developer', progress: 95, modules: 12 },
    { name: 'Erik Lindqvist', role: 'Product Manager', progress: 88, modules: 10 },
    { name: 'Anna Svensson', role: 'Data Scientist', progress: 82, modules: 9 }
  ]

  const upcomingDeadlines = [
    { title: 'Ethics Assessment', type: 'high', date: 'Due Tomorrow' },
    { title: 'Team Workshop', type: 'medium', date: 'Due Dec 15' },
    { title: 'Project Proposal', type: 'high', date: 'Due Dec 20' },
    { title: 'Peer Review', type: 'low', date: 'Due Dec 22' }
  ]

  const recentActivity = [
    { action: 'Completed ML Fundamentals', user: 'with 95% score', time: '2 hours ago' },
    { action: 'Sarah commented on your prompt', desc: 'Customer service automation template', time: '4 hours ago' },
    { action: 'New team member joined', desc: 'EVA initialized joinee your organization', time: '1 day ago' },
    { action: 'New resource added', desc: 'AI Ethics Guidelines document', time: '2 days ago' },
    { action: 'Team milestone reached', desc: '75% completion rate achieved', time: '3 days ago' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, Sven!</h1>
        <p className="text-muted-foreground mt-2">Continue your learning journey</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
            <Progress value={73} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Active learners</p>
            <div className="text-xs text-green-600 mt-2">+3 this week</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.2 weeks</div>
            <p className="text-xs text-muted-foreground">Per phase</p>
            <div className="text-xs text-blue-600 mt-2">-0.8 weeks</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">This month</p>
            <div className="text-xs text-green-600 mt-2">+6 vs last month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Learning Phase Progress</CardTitle>
            <CardDescription>Track your team's progress through AI training phases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-medium">Fundamentals</span>
                    <Badge variant="secondary" className="text-xs">Completed</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm font-medium">Ethics & Governance</span>
                    <Badge variant="outline" className="text-xs">In Progress</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full" />
                    <span className="text-sm font-medium">Implementation</span>
                    <Badge variant="outline" className="text-xs">In Progress</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
            </div>

            <div className="text-right mt-2">
              <Button variant="link" className="text-xs">Updated 2 min ago</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <PlayCircle className="mr-2 h-4 w-4" />
              Continue Learning
              <span className="ml-auto text-xs text-muted-foreground">Resume AI Ethics module</span>
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Prompt Playground
              <span className="ml-auto text-xs text-muted-foreground">Experiment with AI</span>
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Team Progress
              <span className="ml-auto text-xs text-muted-foreground">View team analytics</span>
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Implementation Toolkit
              <span className="ml-auto text-xs text-muted-foreground">Access planning tools</span>
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Resource Library
              <span className="ml-auto text-xs text-muted-foreground">Browse materials</span>
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Workshop
              <span className="ml-auto text-xs text-muted-foreground">Book team session</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Analytics</CardTitle>
            <CardDescription>Monitor your team's learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Team Progress by Phase
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={phaseProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Fundamentals</p>
                    <p className="font-medium">18/24 completed</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ethics</p>
                    <p className="font-medium">12/24 completed</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Implementation</p>
                    <p className="font-medium">6/24 completed</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Top Performers
                </h4>
                <div className="space-y-3">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">#{index + 1}</span>
                        <div>
                          <p className="text-sm font-medium">{performer.name}</p>
                          <p className="text-xs text-muted-foreground">{performer.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{performer.progress}%</p>
                        <p className="text-xs text-muted-foreground">{performer.modules} modules</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>AI training adoption across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-sm">{dept.name}: {dept.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px]">
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        deadline.type === 'high' ? 'bg-red-500' : 
                        deadline.type === 'medium' ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{deadline.title}</p>
                        <p className="text-xs text-muted-foreground">Complete ethical framework evaluation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={deadline.type === 'high' ? 'destructive' : 
                                     deadline.type === 'medium' ? 'secondary' : 
                                     'outline'} className="text-xs">
                        {deadline.type}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{deadline.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Button variant="link" className="w-full mt-2" size="sm">View Full Report</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[280px]">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      {activity.user && <p className="text-xs text-muted-foreground">{activity.user}</p>}
                      {activity.desc && <p className="text-xs text-muted-foreground">{activity.desc}</p>}
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}