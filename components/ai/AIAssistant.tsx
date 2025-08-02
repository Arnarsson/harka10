'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import {
  Bot,
  Send,
  Loader2,
  Sparkles,
  HelpCircle,
  BookOpen,
  Code,
  Lightbulb,
  CheckCircle,
  AlertCircle,
  User
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  relatedLesson?: {
    id: string
    title: string
  }
  suggestions?: string[]
  codeExample?: {
    language: string
    code: string
  }
}

interface AIAssistantProps {
  currentLessonId?: string
  currentLessonTitle?: string
  courseContext?: string
}

export function AIAssistant({ 
  currentLessonId, 
  currentLessonTitle,
  courseContext 
}: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hej! Jeg er din AI læringsassistent. Jeg kan hjælpe dig med spørgsmål om kurset, forklare koncepter, og give kodeeksempler. Hvad kan jeg hjælpe dig med i dag?',
      timestamp: new Date(),
      suggestions: [
        'Forklar MCP protokollen',
        'Vis et n8n automation eksempel',
        'Hvordan bruger jeg Claude API?',
        'Hvad er forskellen på AI agents og automationer?'
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, currentLessonTitle)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string, lessonContext?: string): Message => {
    const lowerInput = userInput.toLowerCase()
    
    // Context-aware responses based on current lesson
    if (lessonContext && lowerInput.includes('dette')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: `I forhold til lektionen "${lessonContext}", kan jeg forklare det sådan her:\n\n${getContextualExplanation(lessonContext)}`,
        timestamp: new Date(),
        relatedLesson: {
          id: currentLessonId || '',
          title: lessonContext
        }
      }
    }

    // MCP Protocol explanation
    if (lowerInput.includes('mcp')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'MCP (Model Context Protocol) er en revolutionerende standard for AI-integration:\n\n**Hvad er MCP?**\n- En åben protokol udviklet af Anthropic\n- Standardiserer kommunikation mellem AI og eksterne værktøjer\n- Fungerer som "USB for AI" - plug and play\n\n**Fordele:**\n- Ensartet integration på tværs af AI-modeller\n- Reducerer udviklingskompleksitet\n- Muliggør sikker datadeling',
        timestamp: new Date(),
        codeExample: {
          language: 'json',
          code: `{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "tools": [
    {
      "name": "getData",
      "description": "Fetch data from database",
      "parameters": {
        "query": "string"
      }
    }
  ]
}`
        },
        suggestions: [
          'Vis MCP implementation eksempel',
          'Hvordan bygger jeg min egen MCP server?',
          'Hvilke tools understøtter MCP?'
        ]
      }
    }

    // n8n automation example
    if (lowerInput.includes('n8n')) {
      return {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'n8n er et kraftfuldt automation værktøj perfekt til AI workflows:\n\n**Eksempel: AI Email Processor**\n1. Trigger: Modtag email\n2. AI Node: Analyser indhold med Claude\n3. Router: Kategoriser baseret på AI output\n4. Action: Send til relevant system\n\n**Fordele ved n8n:**\n- Visual workflow builder\n- 400+ integrations\n- Self-hosted mulighed\n- AI-ready med Claude, OpenAI nodes',
        timestamp: new Date(),
        codeExample: {
          language: 'javascript',
          code: `// n8n Function Node eksempel
const emailContent = items[0].json.content;
const aiAnalysis = items[0].json.aiAnalysis;

if (aiAnalysis.category === 'urgent') {
  return [{
    json: {
      priority: 'high',
      assignTo: 'support-team',
      responseTime: '2 hours'
    }
  }];
}`
        },
        suggestions: [
          'Vis flere n8n automation eksempler',
          'Hvordan integrerer jeg n8n med Claude?',
          'Best practices for n8n workflows'
        ]
      }
    }

    // Default helpful response
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'Det er et godt spørgsmål! Lad mig hjælpe dig med det.\n\nBaseret på dit spørgsmål, tror jeg du kunne være interesseret i at lære mere om AI-integration og automation. Vil du have mig til at forklare et specifikt koncept eller vise et praktisk eksempel?',
      timestamp: new Date(),
      suggestions: [
        'Forklar AI agents',
        'Vis automation eksempel',
        'Hjælp med API integration',
        'Best practices for AI projekter'
      ]
    }
  }

  const getContextualExplanation = (lessonTitle: string): string => {
    // Provide context-aware explanations based on lesson
    const explanations: Record<string, string> = {
      'Introduction to AI APIs': 'AI APIs giver dig adgang til kraftfulde AI-modeller gennem simple HTTP requests. Det vigtigste er at forstå authentication, rate limits, og hvordan du strukturerer dine prompts effektivt.',
      'Understanding MCP': 'MCP revolutionerer måden vi integrerer AI med eksterne systemer. Tænk på det som en universel adapter der lader AI-modeller kommunikere sikkert med databaser, APIs, og andre værktøjer.',
      'Building with n8n': 'n8n gør det muligt at bygge komplekse AI workflows visuelt. Du kan kombinere AI-modeller med 400+ integrationer uden at skrive kode.',
    }
    
    return explanations[lessonTitle] || 'Dette er et vigtigt koncept i AI-udvikling. Lad mig forklare det nærmere...'
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Læringsassistent
        </CardTitle>
        <CardDescription>
          Få hjælp med kurset, stil spørgsmål, og udforsk koncepter
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] space-y-2 ${
                    message.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {message.relatedLesson && (
                    <Badge variant="secondary" className="text-xs">
                      <BookOpen className="mr-1 h-3 w-3" />
                      {message.relatedLesson.title}
                    </Badge>
                  )}

                  {message.codeExample && (
                    <div className="mt-2">
                      <div className="bg-gray-900 text-gray-100 rounded-lg p-3 text-xs">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {message.codeExample.language}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs"
                            onClick={() => {
                              navigator.clipboard.writeText(message.codeExample!.code)
                              toast({
                                title: 'Kopieret!',
                                description: 'Koden er kopieret til udklipsholder',
                              })
                            }}
                          >
                            <Code className="h-3 w-3 mr-1" />
                            Kopier
                          </Button>
                        </div>
                        <pre className="overflow-x-auto">
                          <code>{message.codeExample.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-500 mb-1">Forslag:</p>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <Lightbulb className="mr-1 h-3 w-3" />
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex gap-2"
          >
            <Input
              placeholder="Stil et spørgsmål..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              className="flex-1"
            />
            <Button type="submit" disabled={isTyping || !input.trim()}>
              {isTyping ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
          
          {currentLessonTitle && (
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI-assistenten er kontekst-aware og kan hjælpe med "{currentLessonTitle}"
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}