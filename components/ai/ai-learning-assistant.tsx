"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  Target,
  Clock,
  TrendingUp,
  MessageSquare,
  X,
  Minimize2,
  Maximize2,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Star
} from "lucide-react"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  context?: string
  suggestions?: string[]
  rating?: number
}

interface AILearningAssistantProps {
  isOpen: boolean
  onToggle: () => void
  currentCourse?: string
  currentModule?: string
  learnerProfile?: {
    name: string
    level: string
    progress: number
    goals: string[]
  }
}

export function AILearningAssistant({ 
  isOpen, 
  onToggle, 
  currentCourse = "AI Implementation Fundamentals",
  currentModule = "Getting Started with AI",
  learnerProfile = {
    name: "User",
    level: "Beginner",
    progress: 45,
    goals: ["Learn AI basics", "Implement AI in business"]
  }
}: AILearningAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: `Hi ${learnerProfile.name}! 👋 I'm your AI Learning Assistant. I'm here to help you with "${currentCourse}" and answer any questions about "${currentModule}". What would you like to know?`,
      timestamp: new Date(),
      suggestions: [
        "Explain AI fundamentals in simple terms",
        "What are the key benefits of AI?",
        "How do I start implementing AI?",
        "Quiz me on what I've learned"
      ]
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickActions = [
    { icon: Lightbulb, label: "Explain concept", color: "bg-yellow-500" },
    { icon: Target, label: "Check progress", color: "bg-blue-500" },
    { icon: BookOpen, label: "Quiz me", color: "bg-green-500" },
    { icon: TrendingUp, label: "Next steps", color: "bg-purple-500" }
  ]

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response (in real implementation, this would call your AI API)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue, currentModule, learnerProfile)
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string, module: string, profile: any): Message => {
    // Intelligent response generation based on context
    const lowerInput = userInput.toLowerCase()
    
    let response = ""
    let suggestions: string[] = []

    if (lowerInput.includes("explain") || lowerInput.includes("what is")) {
      response = `Great question! Based on your current progress in "${module}", let me break this down for you:\n\n🎯 **Key Concept**: ${getConceptExplanation(lowerInput)}\n\n📊 **Real-world Example**: ${getRealWorldExample(lowerInput)}\n\n💡 **How this applies to your goals**: This directly relates to your goal of "${profile.goals[0]}" by providing the foundational knowledge you need.`
      suggestions = [
        "Give me a practical example",
        "How can I apply this?",
        "What should I learn next?",
        "Test my understanding"
      ]
    } else if (lowerInput.includes("quiz") || lowerInput.includes("test")) {
      response = `Perfect! Let's test your knowledge of "${module}". Here's a question tailored to your ${profile.level} level:\n\n🤔 **Question**: What are the three most important considerations when implementing AI in a business context?\n\nA) Cost, Speed, Accuracy\nB) Ethics, Privacy, ROI  \nC) Technology, People, Process\nD) All of the above\n\nTake your time and explain your reasoning!`
      suggestions = [
        "I choose A",
        "I choose B", 
        "I choose C",
        "I choose D"
      ]
    } else if (lowerInput.includes("progress") || lowerInput.includes("how am i doing")) {
      response = `Let me check your progress! 📈\n\n**Current Status**:\n• Course Progress: ${profile.progress}% complete\n• Level: ${profile.level}\n• Modules Completed: 3/7\n• Time Spent Learning: 2.5 hours\n\n**Insights**:\n✅ You're doing great! Your pace is 20% faster than average\n🎯 You're on track to complete your goal: "${profile.goals[0]}"\n💡 Recommendation: Focus on practical exercises next\n\n**Next Milestone**: Complete "AI Ethics" module to reach 60%`
      suggestions = [
        "Show me my weak areas",
        "What should I focus on?",
        "How do I compare to others?",
        "Set a new learning goal"
      ]
    } else {
      response = `I understand you're asking about "${userInput}". Let me help you with that!\n\n🤖 **AI Insight**: Based on your learning pattern and current module "${module}", here's what I recommend:\n\n${getPersonalizedAdvice(userInput, profile)}\n\n📚 **Related Topics**: This connects well with concepts you'll encounter in upcoming modules.`
      suggestions = [
        "Explain this differently",
        "Give me examples",
        "How does this help my goals?",
        "What's the next concept?"
      ]
    }

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: response,
      timestamp: new Date(),
      context: module,
      suggestions
    }
  }

  const getConceptExplanation = (input: string): string => {
    if (input.includes("ai") || input.includes("artificial intelligence")) {
      return "AI is technology that can learn, reason, and make decisions like humans, but faster and more consistently."
    }
    return "This concept involves using technology to solve business problems more efficiently."
  }

  const getRealWorldExample = (input: string): string => {
    return "Like how Netflix recommends movies you'll love, or how your phone's camera recognizes faces - AI learns patterns to make smart predictions."
  }

  const getPersonalizedAdvice = (input: string, profile: any): string => {
    return `Since you're at the ${profile.level} level and working toward "${profile.goals[0]}", I recommend starting with small, practical applications you can implement immediately.`
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleQuickAction = (action: string) => {
    const quickPrompts = {
      "Explain concept": "Can you explain the current concept in simple terms?",
      "Check progress": "How am I doing with my learning progress?",
      "Quiz me": "Give me a quiz question about what I've learned",
      "Next steps": "What should I focus on learning next?"
    }
    setInputValue(quickPrompts[action as keyof typeof quickPrompts] || action)
  }

  const handleRating = (messageId: string, rating: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, rating } : msg
    ))
  }

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg z-50"
      >
        <Bot className="h-6 w-6 text-white" />
      </Button>
    )
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl border-0 z-50 transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    }`}>
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium">AI Learning Assistant</CardTitle>
              <p className="text-xs opacity-90">Always here to help • Online</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(600px-80px)]">
          {/* Context Bar */}
          <div className="px-4 py-2 bg-gray-50 border-b">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <BookOpen className="h-3 w-3" />
              <span className="font-medium">{currentCourse}</span>
              <span>•</span>
              <span>{currentModule}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-3 border-b bg-white">
            <div className="grid grid-cols-4 gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuickAction(action.label)}
                  className="flex flex-col gap-1 h-12 p-1 text-xs"
                >
                  <div className={`w-6 h-6 rounded-full ${action.color} flex items-center justify-center`}>
                    <action.icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-[10px] leading-tight">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.type === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                    <div className={`p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    
                    {message.type === 'assistant' && (
                      <div className="mt-2 space-y-2">
                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRating(message.id, 1)}
                            className={`h-6 w-6 p-0 ${message.rating === 1 ? 'text-green-600' : 'text-gray-400'}`}
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRating(message.id, -1)}
                            className={`h-6 w-6 p-0 ${message.rating === -1 ? 'text-red-600' : 'text-gray-400'}`}
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(message.content)}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Suggestions */}
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-1">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs h-6 px-2 bg-white hover:bg-blue-50 border-blue-200"
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="h-4 w-4 text-white animate-spin" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything about your learning..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}