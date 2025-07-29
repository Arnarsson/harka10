'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Flag,
  RotateCcw,
  Send,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import confetti from 'canvas-confetti'

interface Question {
  id: string
  type: 'single' | 'multiple' | 'text' | 'code'
  question: string
  description?: string
  options?: string[]
  correctAnswer?: string | string[]
  points: number
  hint?: string
  explanation?: string
  codeTemplate?: string
  testCases?: Array<{
    input: string
    expectedOutput: string
  }>
}

interface QuizEngineProps {
  quiz: {
    id: string
    title: string
    description: string
    timeLimit?: number // in minutes
    passingScore: number // percentage
    questions: Question[]
  }
  onComplete?: (results: QuizResults) => void
  certificateEligible?: boolean
}

interface QuizResults {
  score: number
  totalScore: number
  percentage: number
  passed: boolean
  timeSpent: number
  answers: Record<string, any>
}

export function QuizEngine({ quiz, onComplete, certificateEligible }: QuizEngineProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null)
  const [showHint, setShowHint] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [startTime] = useState(Date.now())

  const question = quiz.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quiz.questions.length - 1
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeRemaining])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleAnswer = (value: any) => {
    setAnswers({ ...answers, [question.id]: value })
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setShowHint(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setShowHint(false)
    }
  }

  const toggleFlag = () => {
    const newFlags = new Set(flaggedQuestions)
    if (newFlags.has(question.id)) {
      newFlags.delete(question.id)
    } else {
      newFlags.add(question.id)
    }
    setFlaggedQuestions(newFlags)
  }

  const calculateResults = (): QuizResults => {
    let score = 0
    const totalScore = quiz.questions.reduce((acc, q) => acc + q.points, 0)

    quiz.questions.forEach(q => {
      const userAnswer = answers[q.id]
      if (!userAnswer) return

      if (q.type === 'single' && userAnswer === q.correctAnswer) {
        score += q.points
      } else if (q.type === 'multiple' && Array.isArray(q.correctAnswer)) {
        const correct = q.correctAnswer.sort().join(',')
        const user = (userAnswer as string[]).sort().join(',')
        if (correct === user) {
          score += q.points
        }
      } else if (q.type === 'text' || q.type === 'code') {
        // In a real app, this would be graded by an instructor or AI
        score += q.points * 0.8 // Give partial credit for now
      }
    })

    const percentage = Math.round((score / totalScore) * 100)
    const passed = percentage >= quiz.passingScore

    return {
      score,
      totalScore,
      percentage,
      passed,
      timeSpent: Math.floor((Date.now() - startTime) / 1000),
      answers
    }
  }

  const handleSubmit = () => {
    const results = calculateResults()
    setShowResults(true)
    
    if (results.passed && certificateEligible) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }

    if (onComplete) {
      onComplete(results)
    }
  }

  if (showResults) {
    const results = calculateResults()
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-6"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={cn(
              "w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center",
              results.passed ? "bg-green-100" : "bg-red-100"
            )}
          >
            {results.passed ? (
              <CheckCircle className="h-12 w-12 text-green-600" />
            ) : (
              <XCircle className="h-12 w-12 text-red-600" />
            )}
          </motion.div>

          <h2 className="text-3xl font-bold mb-2">
            {results.passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {results.passed 
              ? 'You passed the assessment!' 
              : `You need ${quiz.passingScore}% to pass. Keep trying!`}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-gray-900">
                <AnimatedCounter value={results.percentage} suffix="%" />
              </div>
              <p className="text-sm text-gray-600">Your Score</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-gray-900">
                {results.score}/{results.totalScore}
              </div>
              <p className="text-sm text-gray-600">Points Earned</p>
            </div>
          </div>

          {certificateEligible && results.passed && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 mb-6"
            >
              <Award className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">Certificate Unlocked!</p>
              <p className="text-sm opacity-90">You can now claim your certificate</p>
            </motion.div>
          )}

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </Button>
            <Button onClick={() => console.log('Review answers')}>
              Review Answers
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-gray-600">{quiz.description}</p>
          </div>
          
          {timeRemaining !== null && (
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              timeRemaining < 300 ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"
            )}>
              <Clock className="h-5 w-5" />
              <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>

        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </p>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{question.question}</h3>
              {question.description && (
                <p className="text-gray-600 text-sm">{question.description}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm font-medium text-gray-600">
                {question.points} points
              </span>
              <button
                onClick={toggleFlag}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  flaggedQuestions.has(question.id)
                    ? "bg-orange-100 text-orange-600"
                    : "hover:bg-gray-100 text-gray-400"
                )}
              >
                <Flag className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Answer Input */}
          <div className="space-y-4">
            {question.type === 'single' && question.options && (
              <RadioGroup
                value={answers[question.id] || ''}
                onValueChange={(value) => handleAnswer(value)}
              >
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                  >
                    <RadioGroupItem value={option} />
                    <span>{option}</span>
                  </label>
                ))}
              </RadioGroup>
            )}

            {question.type === 'multiple' && question.options && (
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                  >
                    <Checkbox
                      checked={(answers[question.id] || []).includes(option)}
                      onCheckedChange={(checked) => {
                        const current = answers[question.id] || []
                        if (checked) {
                          handleAnswer([...current, option])
                        } else {
                          handleAnswer(current.filter((o: string) => o !== option))
                        }
                      }}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'text' && (
              <Textarea
                value={answers[question.id] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder="Type your answer here..."
                rows={6}
              />
            )}

            {question.type === 'code' && (
              <div className="space-y-4">
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  <pre>{question.codeTemplate || '// Write your code here'}</pre>
                </div>
                <Textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder="Write your code solution..."
                  rows={10}
                  className="font-mono"
                />
              </div>
            )}
          </div>

          {/* Hint */}
          {question.hint && (
            <div className="mt-4">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                <AlertCircle className="h-4 w-4" />
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
              
              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm"
                  >
                    {question.hint}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={cn(
                "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
                currentQuestion === index
                  ? "bg-black text-white"
                  : answers[quiz.questions[index].id]
                  ? "bg-gray-200 text-gray-700"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200",
                flaggedQuestions.has(quiz.questions[index].id) &&
                  "ring-2 ring-orange-500 ring-offset-2"
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            className="gap-2"
            disabled={Object.keys(answers).length < quiz.questions.length}
          >
            Submit
            <Send className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}