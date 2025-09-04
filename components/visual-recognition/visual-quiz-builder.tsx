"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Image, Type, CheckCircle, Circle, Trash2, GripVertical } from "lucide-react"
import { GradientButton } from "@/components/ui/animated/animated-button"

interface Question {
  id: string
  type: "multiple-choice" | "image-based" | "drag-drop"
  question: string
  image?: string
  options: string[]
  correctAnswer: number
}

export function VisualQuizBuilder() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "image-based",
      question: "What programming concept is illustrated in this diagram?",
      image: "/placeholder.jpg",
      options: ["Recursion", "Iteration", "Inheritance", "Polymorphism"],
      correctAnswer: 0
    }
  ])

  const [selectedQuestion, setSelectedQuestion] = useState<string>("1")

  const addQuestion = (type: Question["type"]) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      question: "",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0
    }
    setQuestions([...questions, newQuestion])
    setSelectedQuestion(newQuestion.id)
  }

  const currentQuestion = questions.find(q => q.id === selectedQuestion)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Question List */}
      <div className="lg:col-span-1 space-y-4">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Questions</h3>
          
          <div className="space-y-2 mb-4">
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedQuestion(question.id)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all flex items-center gap-2",
                  selectedQuestion === question.id
                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Question {index + 1}</p>
                  <p className="text-xs text-muted-foreground capitalize">{question.type.replace("-", " ")}</p>
                </div>
                {question.type === "image-based" && <Image className="h-4 w-4 text-blue-500" />}
                {question.type === "multiple-choice" && <Type className="h-4 w-4 text-green-500" />}
              </motion.div>
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground mb-2">Add Question</p>
            <button
              onClick={() => addQuestion("multiple-choice")}
              className="w-full p-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Type className="h-4 w-4" />
              Text Question
            </button>
            <button
              onClick={() => addQuestion("image-based")}
              className="w-full p-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <Image className="h-4 w-4" />
              Image Question
            </button>
          </div>
        </div>
      </div>

      {/* Question Editor */}
      <div className="lg:col-span-2">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Edit Question</h3>
              <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* Question Type Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-sm font-medium">
                {currentQuestion.type.replace("-", " ").toUpperCase()}
              </span>
            </div>

            {/* Image Upload Area (for image-based questions) */}
            {currentQuestion.type === "image-based" && (
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-muted-foreground">
                  Drag & drop an image or click to browse
                </p>
              </div>
            )}

            {/* Question Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Question</label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 resize-none"
                rows={3}
                placeholder="Enter your question..."
                value={currentQuestion.question}
              />
            </div>

            {/* Answer Options */}
            <div>
              <label className="block text-sm font-medium mb-2">Answer Options</label>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const updated = [...questions]
                        const q = updated.find(q => q.id === currentQuestion.id)
                        if (q) q.correctAnswer = index
                        setQuestions(updated)
                      }}
                      className="flex-shrink-0"
                    >
                      {currentQuestion.correctAnswer === index ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <input
                      type="text"
                      className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                      value={option}
                      onChange={(e) => {
                        const updated = [...questions]
                        const q = updated.find(q => q.id === currentQuestion.id)
                        if (q) q.options[index] = e.target.value
                        setQuestions(updated)
                      }}
                    />
                    {currentQuestion.type === "image-based" && (
                      <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        <Image className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium">
                + Add Option
              </button>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <GradientButton variant="primary">
                Save Question
              </GradientButton>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}