'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Save, Video, FileText, BarChart, PenTool, 
  Eye, Settings, Plus, Trash2, GripVertical,
  CheckCircle, AlertCircle, HelpCircle, Image as ImageIcon
} from 'lucide-react'
import { VideoUpload } from './video-upload'
import { VideoPlayer } from '@/components/ui/video-player'
import type { Lesson, QuizQuestion } from '@/lib/types/course'

interface LessonEditorProps {
  lesson: Lesson
  moduleId: string
  onSave: (moduleId: string, lesson: Lesson) => void
  onClose: () => void
}

export function LessonEditor({ lesson, moduleId, onSave, onClose }: LessonEditorProps) {
  const [editedLesson, setEditedLesson] = useState<Lesson>(lesson)
  const [activeTab, setActiveTab] = useState<'content' | 'settings'>('content')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Rich text editor state for text lessons
  const [textContent, setTextContent] = useState(lesson.content.text?.content || '')

  // Quiz state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(
    lesson.content.quiz?.questions || []
  )

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    try {
      // Validate lesson
      if (!editedLesson.title.trim()) {
        throw new Error('Lesson title is required')
      }

      if (editedLesson.type === 'video' && !editedLesson.content.video?.url) {
        throw new Error('Please add a video')
      }

      if (editedLesson.type === 'text' && !textContent.trim()) {
        throw new Error('Please add lesson content')
      }

      if (editedLesson.type === 'quiz' && quizQuestions.length === 0) {
        throw new Error('Please add at least one question')
      }

      // Update content based on type
      const updatedLesson = { ...editedLesson }
      
      if (editedLesson.type === 'text') {
        updatedLesson.content.text = {
          content: textContent,
          estimatedReadTime: Math.ceil(textContent.split(' ').length / 200) // 200 words per minute
        }
      }

      if (editedLesson.type === 'quiz') {
        updatedLesson.content.quiz = {
          questions: quizQuestions,
          passingScore: editedLesson.content.quiz?.passingScore || 70,
          timeLimit: editedLesson.content.quiz?.timeLimit
        }
      }

      await onSave(moduleId, updatedLesson)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to save lesson')
    } finally {
      setSaving(false)
    }
  }

  const handleVideoUploaded = (url: string, metadata: any) => {
    setEditedLesson({
      ...editedLesson,
      content: {
        ...editedLesson.content,
        video: {
          url,
          duration: metadata.duration || 0,
          transcript: editedLesson.content.video?.transcript
        }
      }
    })
  }

  const addQuizQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      question: '',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1
    }
    setQuizQuestions([...quizQuestions, newQuestion])
  }

  const updateQuizQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const updated = [...quizQuestions]
    updated[index] = { ...updated[index], [field]: value }
    setQuizQuestions(updated)
  }

  const removeQuizQuestion = (index: number) => {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== index))
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {editedLesson.type === 'video' && <Video size={24} />}
              {editedLesson.type === 'text' && <FileText size={24} />}
              {editedLesson.type === 'quiz' && <BarChart size={24} />}
              {editedLesson.type === 'assignment' && <PenTool size={24} />}
              <h2 className="text-xl font-semibold">Edit Lesson</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('content')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'content'
                  ? 'border-black text-black'
                  : 'border-transparent text-zinc-600 hover:text-black'
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-black text-black'
                  : 'border-transparent text-zinc-600 hover:text-black'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Title and Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Lesson Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editedLesson.title}
                  onChange={(e) => setEditedLesson({ ...editedLesson, title: e.target.value })}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  placeholder="Enter lesson title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={editedLesson.description}
                  onChange={(e) => setEditedLesson({ ...editedLesson, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Brief description of what students will learn"
                />
              </div>

              {/* Video Content */}
              {editedLesson.type === 'video' && (
                <div className="space-y-4">
                  {editedLesson.content.video?.url ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">Video Preview</h3>
                        <button
                          onClick={() => setEditedLesson({
                            ...editedLesson,
                            content: { ...editedLesson.content, video: undefined }
                          })}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Video
                        </button>
                      </div>
                      <VideoPlayer
                        url={editedLesson.content.video.url}
                        title={editedLesson.title}
                      />
                    </div>
                  ) : (
                    <VideoUpload
                      onVideoUploaded={handleVideoUploaded}
                    />
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Video Transcript (Optional)
                    </label>
                    <textarea
                      value={editedLesson.content.video?.transcript || ''}
                      onChange={(e) => setEditedLesson({
                        ...editedLesson,
                        content: {
                          ...editedLesson.content,
                          video: {
                            ...editedLesson.content.video!,
                            transcript: e.target.value
                          }
                        }
                      })}
                      rows={6}
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none font-mono text-sm"
                      placeholder="Add video transcript for accessibility and SEO"
                    />
                  </div>
                </div>
              )}

              {/* Text Content */}
              {editedLesson.type === 'text' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Lesson Content <span className="text-red-500">*</span>
                  </label>
                  <div className="border border-zinc-200 rounded-lg overflow-hidden">
                    {/* Simple toolbar */}
                    <div className="bg-zinc-50 border-b border-zinc-200 p-2 flex items-center gap-2">
                      <button className="p-2 hover:bg-zinc-200 rounded transition-colors" title="Bold">
                        <strong>B</strong>
                      </button>
                      <button className="p-2 hover:bg-zinc-200 rounded transition-colors" title="Italic">
                        <em>I</em>
                      </button>
                      <div className="w-px h-6 bg-zinc-300" />
                      <button className="p-2 hover:bg-zinc-200 rounded transition-colors" title="Heading">
                        H1
                      </button>
                      <button className="p-2 hover:bg-zinc-200 rounded transition-colors" title="List">
                        • List
                      </button>
                      <button className="p-2 hover:bg-zinc-200 rounded transition-colors" title="Link">
                        🔗
                      </button>
                      <button className="p-2 hover:bg-zinc-200 rounded transition-colors" title="Image">
                        <ImageIcon size={16} />
                      </button>
                    </div>
                    <textarea
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      className="w-full p-4 min-h-[400px] focus:outline-none resize-none"
                      placeholder="Write your lesson content here. You can use Markdown formatting."
                    />
                  </div>
                  <p className="text-xs text-zinc-600 mt-2">
                    Supports Markdown formatting. Estimated read time: {Math.ceil(textContent.split(' ').length / 200)} minutes
                  </p>
                </div>
              )}

              {/* Quiz Content */}
              {editedLesson.type === 'quiz' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Quiz Questions</h3>
                    <button
                      onClick={addQuizQuestion}
                      className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                      <Plus size={20} />
                      Add Question
                    </button>
                  </div>

                  {quizQuestions.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-zinc-300 rounded-lg">
                      <BarChart size={48} className="mx-auto text-zinc-400 mb-4" />
                      <p className="text-zinc-600">No questions added yet</p>
                      <p className="text-sm text-zinc-500">Click "Add Question" to create your first quiz question</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {quizQuestions.map((question, index) => (
                        <div key={question.id} className="border border-zinc-200 rounded-lg p-4 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <GripVertical size={20} className="text-zinc-400 cursor-move" />
                              <span className="font-medium">Question {index + 1}</span>
                            </div>
                            <button
                              onClick={() => removeQuizQuestion(index)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div>
                            <input
                              type="text"
                              value={question.question}
                              onChange={(e) => updateQuizQuestion(index, 'question', e.target.value)}
                              className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                              placeholder="Enter your question"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2">Question Type</label>
                            <select
                              value={question.type}
                              onChange={(e) => updateQuizQuestion(index, 'type', e.target.value)}
                              className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                            >
                              <option value="multiple-choice">Multiple Choice</option>
                              <option value="true-false">True/False</option>
                              <option value="short-answer">Short Answer</option>
                            </select>
                          </div>

                          {question.type === 'multiple-choice' && (
                            <div className="space-y-2">
                              <label className="block text-sm font-medium mb-1">Options</label>
                              {question.options?.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`correct-${question.id}`}
                                    checked={question.correctAnswer === option}
                                    onChange={() => updateQuizQuestion(index, 'correctAnswer', option)}
                                    className="w-4 h-4"
                                  />
                                  <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...(question.options || [])]
                                      newOptions[optionIndex] = e.target.value
                                      updateQuizQuestion(index, 'options', newOptions)
                                    }}
                                    className="flex-1 px-3 py-1 border border-zinc-200 rounded focus:outline-none focus:border-black transition-colors"
                                    placeholder={`Option ${optionIndex + 1}`}
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {question.type === 'true-false' && (
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${question.id}`}
                                  checked={question.correctAnswer === 'true'}
                                  onChange={() => updateQuizQuestion(index, 'correctAnswer', 'true')}
                                  className="w-4 h-4"
                                />
                                True
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`correct-${question.id}`}
                                  checked={question.correctAnswer === 'false'}
                                  onChange={() => updateQuizQuestion(index, 'correctAnswer', 'false')}
                                  className="w-4 h-4"
                                />
                                False
                              </label>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Points</label>
                              <input
                                type="number"
                                value={question.points}
                                onChange={(e) => updateQuizQuestion(index, 'points', parseInt(e.target.value) || 1)}
                                min="1"
                                className="w-full px-3 py-1 border border-zinc-200 rounded focus:outline-none focus:border-black transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Explanation (Optional)</label>
                              <input
                                type="text"
                                value={question.explanation || ''}
                                onChange={(e) => updateQuizQuestion(index, 'explanation', e.target.value)}
                                className="w-full px-3 py-1 border border-zinc-200 rounded focus:outline-none focus:border-black transition-colors"
                                placeholder="Explain the answer"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Assignment Content */}
              {editedLesson.type === 'assignment' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Assignment Instructions <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={editedLesson.content.assignment?.instructions || ''}
                      onChange={(e) => setEditedLesson({
                        ...editedLesson,
                        content: {
                          ...editedLesson.content,
                          assignment: {
                            ...editedLesson.content.assignment!,
                            instructions: e.target.value
                          }
                        }
                      })}
                      rows={6}
                      className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                      placeholder="Provide clear instructions for the assignment"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Submission Type
                    </label>
                    <select
                      value={editedLesson.content.assignment?.submissionType || 'text'}
                      onChange={(e) => setEditedLesson({
                        ...editedLesson,
                        content: {
                          ...editedLesson.content,
                          assignment: {
                            ...editedLesson.content.assignment!,
                            submissionType: e.target.value as any
                          }
                        }
                      })}
                      className="px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                    >
                      <option value="text">Text Response</option>
                      <option value="file">File Upload</option>
                      <option value="url">URL Submission</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={editedLesson.duration}
                  onChange={(e) => setEditedLesson({ 
                    ...editedLesson, 
                    duration: parseInt(e.target.value) || 0 
                  })}
                  min="0"
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={editedLesson.isPreview}
                    onChange={(e) => setEditedLesson({ 
                      ...editedLesson, 
                      isPreview: e.target.checked 
                    })}
                    className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black"
                  />
                  <span className="text-sm">Allow preview (visible to non-enrolled students)</span>
                </label>
              </div>

              {editedLesson.type === 'quiz' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Passing Score (%)
                  </label>
                  <input
                    type="number"
                    value={editedLesson.content.quiz?.passingScore || 70}
                    onChange={(e) => setEditedLesson({
                      ...editedLesson,
                      content: {
                        ...editedLesson.content,
                        quiz: {
                          ...editedLesson.content.quiz!,
                          passingScore: parseInt(e.target.value) || 70
                        }
                      }
                    })}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-200">
          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Save size={20} />
                  </motion.div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Lesson
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}