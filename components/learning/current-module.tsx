"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Maximize,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
} from "lucide-react"

const moduleContent = {
  overview: {
    title: "Understanding AI Bias and Fairness",
    description: "Learn how to identify, measure, and mitigate bias in AI systems to ensure fair and ethical outcomes.",
    duration: "45 minutes",
    objectives: [
      "Identify different types of bias in AI systems",
      "Understand the impact of biased AI on society",
      "Learn techniques for bias detection and measurement",
      "Implement bias mitigation strategies",
    ],
  },
  sections: [
    {
      id: 1,
      title: "Introduction to AI Bias",
      duration: "10 min",
      completed: true,
      type: "video",
    },
    {
      id: 2,
      title: "Types of Algorithmic Bias",
      duration: "15 min",
      completed: true,
      type: "interactive",
    },
    {
      id: 3,
      title: "Case Studies: Bias in Practice",
      duration: "12 min",
      completed: false,
      current: true,
      type: "video",
    },
    {
      id: 4,
      title: "Bias Detection Techniques",
      duration: "8 min",
      completed: false,
      type: "exercise",
    },
  ],
}

export function CurrentModule() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(420) // 7 minutes in seconds
  const [totalTime] = useState(720) // 12 minutes in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="stella-card border-primary/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Play className="h-5 w-5 text-primary" />
            <span>Current Module</span>
          </CardTitle>
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Ethics & Governance</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/20">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-white">
                    <h3 className="font-semibold">Case Studies: Bias in Practice</h3>
                    <p className="text-sm text-white/70">Real-world examples of AI bias</p>
                  </div>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-3">
                  <Progress value={(currentTime / totalTime) * 100} className="h-1" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                      <div className="text-white text-sm">
                        {formatTime(currentTime)} / {formatTime(totalTime)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Module Sections */}
            <div className="space-y-4">
              <h3 className="font-semibold">Module Sections</h3>
              <div className="space-y-3">
                {moduleContent.sections.map((section) => (
                  <div
                    key={section.id}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                      section.current
                        ? "border-primary/40 bg-primary/5"
                        : section.completed
                          ? "border-green-500/20 bg-green-500/5"
                          : "border-white/10 bg-muted/20"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          section.completed
                            ? "bg-green-500/20 text-green-400"
                            : section.current
                              ? "bg-primary/20 text-primary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {section.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : section.type === "video" ? (
                          <Play className="h-4 w-4" />
                        ) : section.type === "interactive" ? (
                          <MessageSquare className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{section.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{section.duration}</span>
                          <span>•</span>
                          <span className="capitalize">{section.type}</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant={section.current ? "default" : section.completed ? "outline" : "ghost"}
                      disabled={!section.completed && !section.current}
                    >
                      {section.completed ? "Review" : section.current ? "Continue" : "Locked"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4">
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Join the Discussion</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Connect with other learners and share insights about AI ethics
              </p>
              <Button>Start Discussion</Button>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Additional Resources</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Supplementary materials and references for deeper learning
              </p>
              <Button variant="outline">Browse Resources</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
