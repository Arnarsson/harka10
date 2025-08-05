'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { 
  Clock, Users, Zap, Target, Trophy, Calendar,
  Volume2, VolumeX, Play, Pause, Coffee, Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface PowerHourSession {
  id: string
  startTime: string
  endTime: string
  timezone: string
  participants: number
  maxParticipants: number
  focus: string
  host?: {
    name: string
    avatar: string
  }
}

interface Participant {
  id: string
  name: string
  avatar?: string
  status: 'active' | 'break' | 'completed'
  focusTime: number
}

export function PowerHour() {
  const [currentSession, setCurrentSession] = useState<PowerHourSession | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(3600) // 60 minutes in seconds
  const [participants, setParticipants] = useState<Participant[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [onBreak, setOnBreak] = useState(false)
  const [sessionsCompleted, setSessionsCompleted] = useState(0)

  // Mock upcoming sessions
  const upcomingSessions: PowerHourSession[] = [
    {
      id: '1',
      startTime: '09:00',
      endTime: '10:00',
      timezone: 'CET',
      participants: 24,
      maxParticipants: 50,
      focus: 'AI Automation Projects',
      host: { name: 'Sarah Chen', avatar: '/avatars/sarah.jpg' }
    },
    {
      id: '2',
      startTime: '13:00',
      endTime: '14:00',
      timezone: 'CET',
      participants: 18,
      maxParticipants: 50,
      focus: 'Deep Learning Study',
    },
    {
      id: '3',
      startTime: '17:00',
      endTime: '18:00',
      timezone: 'CET',
      participants: 31,
      maxParticipants: 50,
      focus: 'Code Review & Practice',
    },
    {
      id: '4',
      startTime: '21:00',
      endTime: '22:00',
      timezone: 'CET',
      participants: 12,
      maxParticipants: 50,
      focus: 'Open Study Session',
      host: { name: 'Alex Kumar', avatar: '/avatars/alex.jpg' }
    }
  ]

  // Timer countdown
  useEffect(() => {
    if (isActive && timeRemaining > 0 && !onBreak) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeRemaining === 0) {
      handleSessionComplete()
    }
  }, [isActive, timeRemaining, onBreak])

  // Mock participants
  useEffect(() => {
    if (isActive) {
      setParticipants([
        { id: '1', name: 'You', status: 'active', focusTime: 3600 - timeRemaining },
        { id: '2', name: 'Emma W.', avatar: '/avatars/emma.jpg', status: 'active', focusTime: 2400 },
        { id: '3', name: 'Marcus L.', status: 'break', focusTime: 2100 },
        { id: '4', name: 'Priya S.', avatar: '/avatars/priya.jpg', status: 'active', focusTime: 3000 },
        { id: '5', name: 'João M.', status: 'active', focusTime: 1800 },
      ])
    }
  }, [isActive, timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const joinSession = (session: PowerHourSession) => {
    setCurrentSession(session)
    setIsActive(true)
    setTimeRemaining(3600)
    if (soundEnabled) {
      // Play start sound
    }
  }

  const toggleBreak = () => {
    setOnBreak(!onBreak)
    if (soundEnabled) {
      // Play break sound
    }
  }

  const handleSessionComplete = () => {
    setIsActive(false)
    setSessionsCompleted(prev => prev + 1)
    if (soundEnabled) {
      // Play completion sound
    }
    // Show completion modal
  }

  const leaveSession = () => {
    setIsActive(false)
    setCurrentSession(null)
    setTimeRemaining(3600)
  }

  if (isActive && currentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Active Session Header */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    Power Hour in Progress
                  </h2>
                  <p className="text-muted-foreground">{currentSession.focus}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button variant="destructive" onClick={leaveSession}>
                    Leave Session
                  </Button>
                </div>
              </div>

              {/* Timer Display */}
              <div className="text-center py-8">
                <div className={cn(
                  "text-7xl font-mono font-bold mb-4 transition-colors",
                  timeRemaining < 300 && "text-destructive",
                  onBreak && "text-muted-foreground"
                )}>
                  {formatTime(timeRemaining)}
                </div>
                <Progress 
                  value={((3600 - timeRemaining) / 3600) * 100} 
                  className="w-full max-w-md mx-auto h-3"
                />
                <div className="flex justify-center gap-4 mt-6">
                  {onBreak ? (
                    <Button size="lg" onClick={toggleBreak}>
                      <Play className="h-5 w-5 mr-2" />
                      Resume Focus
                    </Button>
                  ) : (
                    <Button size="lg" variant="outline" onClick={toggleBreak}>
                      <Coffee className="h-5 w-5 mr-2" />
                      Take a Break
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Participants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Active Participants
                  </span>
                  <Badge>{participants.filter(p => p.status === 'active').length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {participants.map(participant => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          {participant.avatar && <AvatarImage src={participant.avatar} />}
                          <AvatarFallback>{participant.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{participant.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatTime(participant.focusTime)} focused
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant={participant.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {participant.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Session Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Your Focus Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold">🔥 5 days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Focus Time Today</p>
                    <p className="text-2xl font-bold">{formatTime(3600 - timeRemaining)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Power Hours Completed</p>
                    <p className="text-2xl font-bold">{sessionsCompleted}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-2">Achievements</p>
                    <div className="flex gap-2">
                      <div className="text-2xl" title="First Power Hour">🌟</div>
                      <div className="text-2xl" title="5 Day Streak">🔥</div>
                      <div className="text-2xl" title="Early Bird">🌅</div>
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

  // Session Selection View
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full">
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Power Hours</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join focused 60-minute learning sessions with the global HARKA community. 
          Distraction-free environment with AI productivity coaching.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold">Time-Boxed Focus</h3>
          <p className="text-sm text-muted-foreground">60 minutes of pure productivity</p>
        </Card>
        <Card className="text-center p-4">
          <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold">Community Support</h3>
          <p className="text-sm text-muted-foreground">Learn alongside motivated peers</p>
        </Card>
        <Card className="text-center p-4">
          <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold">Track Progress</h3>
          <p className="text-sm text-muted-foreground">Build streaks and earn achievements</p>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Sessions
            </span>
            <Badge variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              4 sessions available
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingSessions.map(session => (
              <div 
                key={session.id} 
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{session.startTime}</p>
                    <p className="text-xs text-muted-foreground">{session.timezone}</p>
                  </div>
                  <div>
                    <p className="font-semibold">{session.focus}</p>
                    {session.host && (
                      <p className="text-sm text-muted-foreground">
                        Hosted by {session.host.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {session.participants}/{session.maxParticipants}
                    </p>
                    <p className="text-xs text-muted-foreground">participants</p>
                  </div>
                  <Button onClick={() => joinSession(session)}>
                    Join Session
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Your Power Hour Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Sessions Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold">720</p>
              <p className="text-sm text-muted-foreground">Minutes Focused</p>
            </div>
            <div>
              <p className="text-3xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">Current Streak</p>
            </div>
            <div>
              <p className="text-3xl font-bold">89%</p>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}