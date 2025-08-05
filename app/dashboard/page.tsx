import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  GraduationCap,
  Users,
  BookmarkIcon,
  Trophy,
  Clock,
  TrendingUp,
  Calendar,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  // Mock data - replace with real data from database
  const stats = {
    coursesCompleted: 2,
    totalCourses: 5,
    teamMembers: 4,
    notesCreated: 12,
    certificatesEarned: 1,
    hoursLearned: 24,
    currentStreak: 5
  }

  const recentActivity = [
    { type: 'course', title: 'Completed MCP Protocol lesson', time: '2 hours ago', icon: GraduationCap },
    { type: 'note', title: 'Added note about n8n automation', time: '5 hours ago', icon: BookmarkIcon },
    { type: 'team', title: 'Anna Nielsen joined the team', time: '1 day ago', icon: Users },
    { type: 'achievement', title: 'Earned AI Fundamentals certificate', time: '2 days ago', icon: Trophy }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Velkommen tilbage! 👋</h1>
          <p className="text-lg opacity-90 mb-4">
            Du er på {stats.currentStreak} dages stribe - fortsæt det gode arbejde!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/learn">
              <Button variant="secondary" size="lg">
                Fortsæt læring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/programs">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Sparkles className="mr-2 h-4 w-4" />
                48-timers AI Mastery
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kurser fuldført</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.coursesCompleted}/{stats.totalCourses}</div>
              <Progress value={(stats.coursesCompleted / stats.totalCourses) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round((stats.coursesCompleted / stats.totalCourses) * 100)}% gennemført
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team medlemmer</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.teamMembers}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Aktive medlemmer
              </p>
              <Link href="/team">
                <Button variant="link" className="px-0 mt-2" size="sm">
                  Administrer team →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Noter oprettet</CardTitle>
              <BookmarkIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.notesCreated}</div>
              <p className="text-xs text-muted-foreground mt-2">
                På tværs af alle kurser
              </p>
              <Link href="/notes">
                <Button variant="link" className="px-0 mt-2" size="sm">
                  Se alle noter →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Læringstid</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.hoursLearned} timer</div>
              <p className="text-xs text-muted-foreground mt-2">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% denne uge
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Next Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Seneste aktivitet</CardTitle>
              <CardDescription>Hvad der er sket på din læringsrejse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-2">
                        <Icon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Næste skridt</CardTitle>
              <CardDescription>Anbefalede handlinger for at fortsætte din fremgang</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Tilmeld dig 48-timers programmet</p>
                      <p className="text-sm text-gray-500">Start din intensive AI-rejse</p>
                    </div>
                  </div>
                  <Link href="/programs">
                    <Button size="sm">Start</Button>
                  </Link>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Inviter et teammedlem</p>
                      <p className="text-sm text-gray-500">Lær sammen med kolleger</p>
                    </div>
                  </div>
                  <Link href="/team">
                    <Button size="sm" variant="outline">Inviter</Button>
                  </Link>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Fortsæt n8n automation kurset</p>
                      <p className="text-sm text-gray-500">67% gennemført</p>
                    </div>
                  </div>
                  <Link href="/learn/n8n-automation">
                    <Button size="sm" variant="outline">Fortsæt</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}