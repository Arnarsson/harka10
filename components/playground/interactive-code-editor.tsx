'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Play, Pause, RotateCcw, Save, GitBranch, Users, Mic, MicOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InteractiveCodeEditorProps {
  lesson: {
    id: string
    title: string
    code: string
    language: string
    type: 'code' | 'workflow' | 'prompt'
  }
  onBranch?: (code: string) => void
  onSave?: (code: string) => void
  className?: string
}

export function InteractiveCodeEditor({
  lesson,
  onBranch,
  onSave,
  className
}: InteractiveCodeEditorProps) {
  const [code, setCode] = useState(lesson.code)
  const [isPlaying, setIsPlaying] = useState(true)
  const [output, setOutput] = useState('')
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])
  const [isAiActive, setIsAiActive] = useState(true)
  const [branches, setBranches] = useState<Array<{ id: string; name: string; code: string }>>([])
  const [activeBranch, setActiveBranch] = useState('main')
  const [collaborators, setCollaborators] = useState<string[]>([])
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const editorRef = useRef<HTMLTextAreaElement>(null)

  // Simulate AI suggestions
  useEffect(() => {
    if (isAiActive && code !== lesson.code) {
      const timer = setTimeout(() => {
        setAiSuggestions([
          'Consider adding error handling here',
          'This could be optimized using async/await',
          'Try using a more descriptive variable name'
        ])
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [code, isAiActive, lesson.code])

  const handlePauseAndEdit = () => {
    setIsPlaying(false)
    // Create a new branch when pausing
    const newBranch = {
      id: `branch-${Date.now()}`,
      name: `My Edit ${branches.length + 1}`,
      code: code
    }
    setBranches([...branches, newBranch])
    setActiveBranch(newBranch.id)
    onBranch?.(code)
  }

  const handleRun = async () => {
    setOutput('Running code...\n')
    // Simulate code execution
    setTimeout(() => {
      setOutput(prev => prev + 'Hello from HARKA Interactive Learning!\n')
      setOutput(prev => prev + 'Code executed successfully!')
    }, 1000)
  }

  const handleReset = () => {
    setCode(lesson.code)
    setOutput('')
    setActiveBranch('main')
    setIsPlaying(true)
  }

  const handleSave = () => {
    onSave?.(code)
    // Simulate saving
    setOutput('Progress saved!')
  }

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive)
    if (!isVoiceActive) {
      // Start voice interaction with AI
      setOutput('AI Assistant: Hi! I\'m here to help you code. What would you like to work on?')
    }
  }

  return (
    <Card className={cn('w-full max-w-6xl mx-auto', className)}>
      <div className="p-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold">{lesson.title}</h3>
            {!isPlaying && (
              <span className="text-sm text-muted-foreground">
                Editing on: {branches.find(b => b.id === activeBranch)?.name || 'Main'}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Collaborators */}
            {collaborators.length > 0 && (
              <div className="flex items-center gap-1 mr-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{collaborators.length}</span>
              </div>
            )}
            
            {/* Voice Control */}
            <Button
              variant={isVoiceActive ? 'default' : 'outline'}
              size="sm"
              onClick={toggleVoice}
            >
              {isVoiceActive ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            
            {/* Playback Controls */}
            {isPlaying ? (
              <Button variant="outline" size="sm" onClick={handlePauseAndEdit}>
                <Pause className="h-4 w-4 mr-1" />
                Pause & Edit
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsPlaying(true)}>
                <Play className="h-4 w-4 mr-1" />
                Resume
              </Button>
            )}
            
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            
            {branches.length > 0 && (
              <Button variant="outline" size="sm">
                <GitBranch className="h-4 w-4 mr-1" />
                {branches.length}
              </Button>
            )}
          </div>
        </div>

        {/* Main Editor Area */}
        <Tabs defaultValue="editor" className="w-full">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="output">Output</TabsTrigger>
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            {lesson.type === 'workflow' && <TabsTrigger value="visual">Visual</TabsTrigger>}
          </TabsList>

          {/* Editor Tab */}
          <TabsContent value="editor" className="mt-4">
            <div className="relative">
              <textarea
                ref={editorRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={cn(
                  "w-full h-[400px] p-4 font-mono text-sm rounded-md border bg-muted/50",
                  isPlaying && "opacity-75 cursor-not-allowed"
                )}
                disabled={isPlaying}
                placeholder="Start coding here..."
              />
              
              {/* AI Suggestions Overlay */}
              {isAiActive && aiSuggestions.length > 0 && !isPlaying && (
                <div className="absolute right-2 top-2 w-64 bg-background border rounded-md shadow-lg p-3">
                  <h4 className="text-sm font-medium mb-2">AI Suggestions</h4>
                  <ul className="space-y-2">
                    {aiSuggestions.map((suggestion, i) => (
                      <li key={i} className="text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                        💡 {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button onClick={handleRun} disabled={isPlaying}>
                  <Play className="h-4 w-4 mr-1" />
                  Run
                </Button>
                <Button variant="outline" onClick={handleSave} disabled={isPlaying}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {lesson.language} • {isAiActive ? 'AI Active' : 'AI Inactive'}
              </div>
            </div>
          </TabsContent>

          {/* Output Tab */}
          <TabsContent value="output" className="mt-4">
            <div className="h-[400px] p-4 font-mono text-sm rounded-md border bg-muted/50 overflow-auto">
              <pre className="whitespace-pre-wrap">{output || 'No output yet. Run your code to see results!'}</pre>
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai" className="mt-4">
            <div className="h-[400px] rounded-md border bg-muted/50 p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    🤖
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      Hi! I'm your AI pair programmer. I can help you understand this code, 
                      suggest improvements, or work through problems together.
                    </p>
                  </div>
                </div>
                
                {!isPlaying && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      🤖
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        I see you're editing the code! Here are some things we could work on:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>• Add error handling for edge cases</li>
                        <li>• Optimize the algorithm for better performance</li>
                        <li>• Refactor for better readability</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="mt-auto pt-4 border-t">
                  <input
                    type="text"
                    placeholder="Ask me anything about the code..."
                    className="w-full px-3 py-2 text-sm rounded-md border bg-background"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setOutput(prev => prev + '\nYou: ' + e.currentTarget.value)
                        setOutput(prev => prev + '\nAI: I'd be happy to help with that!')
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Visual Tab (for workflows) */}
          {lesson.type === 'workflow' && (
            <TabsContent value="visual" className="mt-4">
              <div className="h-[400px] rounded-md border bg-muted/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔄</div>
                  <p className="text-muted-foreground">Visual workflow editor coming soon!</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Drag and drop nodes to build automation workflows
                  </p>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Card>
  )
}