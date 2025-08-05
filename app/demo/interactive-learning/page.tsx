'use client'

import { useState } from 'react'
import { InteractiveCodeEditor } from '@/components/playground/interactive-code-editor'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { demoLessons } from '@/lib/demo-lessons'
import { Play, Users, Trophy, Sparkles, Clock, Target } from 'lucide-react'

export default function InteractiveLearningDemo() {
  const [selectedLesson, setSelectedLesson] = useState(demoLessons[0])
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [savedBranches, setSavedBranches] = useState<Record<string, string>>({})
  
  const handleSave = (lessonId: string, code: string) => {
    setSavedBranches(prev => ({ ...prev, [lessonId]: code }))
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId])
    }
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
        
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge className="mb-4" variant="secondary">
              <Sparkles className="h-3 w-3 mr-1" />
              Scrimba-Inspired Interactive Learning
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
              Learn by Doing, Not Watching
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Pause any lesson, edit the code, and learn with AI assistance. 
              This is how coding education should be.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={() => setSelectedLesson(demoLessons[0])}>
                <Play className="h-4 w-4 mr-2" />
                Try Interactive Demo
              </Button>
              <Button size="lg" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Join Power Hour
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">2.5x</div>
              <div className="text-sm text-muted-foreground">Faster Learning</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">89%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold">4.9/5</div>
              <div className="text-sm text-muted-foreground">User Rating</div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Interactive Demo Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Interactive Learning Demo</h2>
          <p className="text-muted-foreground">
            Select a lesson below and experience the power of interactive learning
          </p>
        </div>
        
        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="progress">Your Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lessons" className="space-y-8">
            {/* Lesson Selector */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {demoLessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                    selectedLesson.id === lesson.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{lesson.title}</h3>
                    {completedLessons.includes(lesson.id) && (
                      <Badge variant="success">
                        <Trophy className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {lesson.duration} min
                    </span>
                    <Badge variant="outline">{lesson.language}</Badge>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Interactive Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{selectedLesson.title}</h3>
                  <p className="text-muted-foreground">{selectedLesson.description}</p>
                </div>
              </div>
              
              {/* Learning Objectives */}
              <Card className="p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Learning Objectives
                </h4>
                <ul className="space-y-1">
                  {selectedLesson.objectives.map((objective, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </Card>
              
              {/* The Interactive Editor */}
              <InteractiveCodeEditor
                lesson={selectedLesson}
                onSave={(code) => handleSave(selectedLesson.id, code)}
                onBranch={(code) => console.log('Branch created:', code)}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Your Learning Progress</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Lessons Completed</span>
                    <span className="text-sm text-muted-foreground">
                      {completedLessons.length} / {demoLessons.length}
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(completedLessons.length / demoLessons.length) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Saved Code Branches</h4>
                  <div className="space-y-2">
                    {Object.entries(savedBranches).map(([lessonId, code]) => {
                      const lesson = demoLessons.find(l => l.id === lessonId)
                      return (
                        <div key={lessonId} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm">{lesson?.title}</span>
                          <Badge variant="outline">Modified</Badge>
                        </div>
                      )
                    })}
                    {Object.keys(savedBranches).length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No saved branches yet. Try pausing and editing a lesson!
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Achievements</h4>
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-3xl mb-1">🔍</div>
                      <p className="text-xs">Explorer</p>
                    </div>
                    {completedLessons.length > 0 && (
                      <div className="text-center">
                        <div className="text-3xl mb-1">🎯</div>
                        <p className="text-xs">First Complete</p>
                      </div>
                    )}
                    {Object.keys(savedBranches).length > 0 && (
                      <div className="text-center">
                        <div className="text-3xl mb-1">🌳</div>
                        <p className="text-xs">Branch Master</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Interactive Learning Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <div className="text-4xl mb-4">⏸️</div>
              <h3 className="font-semibold mb-2">Pause & Experiment</h3>
              <p className="text-sm text-muted-foreground">
                Stop any lesson at any time and try things out. Your changes are saved 
                in branches you can return to later.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-semibold mb-2">AI Pair Programming</h3>
              <p className="text-sm text-muted-foreground">
                Get real-time suggestions, error fixes, and explanations from an AI 
                that understands your learning style.
              </p>
            </Card>
            
            <Card className="p-6">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="font-semibold mb-2">Learn Together</h3>
              <p className="text-sm text-muted-foreground">
                Join Power Hours for focused learning sessions, collaborate on code, 
                and get help from the community.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience the Future of Learning?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are mastering AI and automation through 
            interactive, hands-on learning.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              Start Learning Free
            </Button>
            <Button size="lg" variant="outline">
              View All Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}