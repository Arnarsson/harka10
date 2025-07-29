'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, Save, Upload, Plus, X, Trash2, 
  GripVertical, Video, FileText, PenTool, BarChart,
  Globe, DollarSign, Clock, Award, Image as ImageIcon
} from 'lucide-react'
import type { Course, Module, Lesson } from '@/lib/types/course'

function NewCoursePage() {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Redirect if not signed in
  if (isLoaded && !isSignedIn) {
    router.push('/sign-in')
    return null
  }
  const [activeTab, setActiveTab] = useState<'basic' | 'curriculum' | 'pricing' | 'settings'>('basic')
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner' as Course['level'],
    language: 'English',
    thumbnail: '',
    price: 0,
    currency: 'USD',
    requirements: [''],
    objectives: [''],
    tags: ['']
  })

  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: '',
      description: '',
      order: 1,
      duration: 0,
      lessons: []
    }
  ])

  const categories = [
    'Development',
    'Business',
    'Design',
    'Marketing',
    'Data Science',
    'Personal Growth'
  ]

  const handleBasicInfoChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleArrayFieldChange = (field: 'requirements' | 'objectives' | 'tags', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayField = (field: 'requirements' | 'objectives' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayField = (field: 'requirements' | 'objectives' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: '',
      description: '',
      order: modules.length + 1,
      duration: 0,
      lessons: []
    }
    setModules([...modules, newModule])
  }

  const updateModule = (moduleId: string, field: string, value: any) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, [field]: value } : module
    ))
  }

  const removeModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId))
  }

  const addLesson = (moduleId: string, type: Lesson['type']) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: '',
      description: '',
      type,
      order: modules.find(m => m.id === moduleId)?.lessons.length || 0 + 1,
      duration: 0,
      isPreview: false,
      content: {}
    }

    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: [...module.lessons, newLesson] }
        : module
    ))
  }

  const saveCourse = async () => {
    setLoading(true)
    try {
      // TODO: Implement actual save to Supabase
      console.log('Saving course:', { formData, modules })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      router.push('/admin/courses')
    } catch (error) {
      console.error('Error saving course:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/courses"
                className="text-zinc-600 hover:text-black transition-colors"
              >
                <ChevronLeft size={20} />
              </Link>
              <h1 className="text-xl font-semibold">Create New Course</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                onClick={saveCourse}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? 'Publishing...' : 'Publish Course'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-white rounded-lg p-1 border border-zinc-200">
          {[
            { id: 'basic', label: 'Basic Information' },
            { id: 'curriculum', label: 'Curriculum' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'settings', label: 'Settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'text-zinc-600 hover:text-black'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg border border-zinc-200 p-6">
          {activeTab === 'basic' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleBasicInfoChange('title', e.target.value)}
                  placeholder="e.g., Complete Web Development Bootcamp"
                  className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleBasicInfoChange('description', e.target.value)}
                  placeholder="Provide a detailed description of what students will learn..."
                  rows={4}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              {/* Category and Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleBasicInfoChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => handleBasicInfoChange('level', e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Thumbnail
                </label>
                <div className="border-2 border-dashed border-zinc-300 rounded-lg p-8 text-center hover:border-zinc-400 transition-colors">
                  <ImageIcon size={48} className="mx-auto text-zinc-400 mb-4" />
                  <p className="text-sm text-zinc-600 mb-2">
                    Drag and drop an image here, or click to browse
                  </p>
                  <p className="text-xs text-zinc-500">
                    Recommended: 1920x1080px, max 5MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="inline-block mt-4 px-4 py-2 bg-zinc-100 rounded-lg cursor-pointer hover:bg-zinc-200 transition-colors"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Requirements
                </label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayFieldChange('requirements', index, e.target.value)}
                      placeholder="e.g., Basic computer skills"
                      className="flex-1 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />
                    <button
                      onClick={() => removeArrayField('requirements', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayField('requirements')}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  <Plus size={20} />
                  Add Requirement
                </button>
              </div>

              {/* Learning Objectives */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Learning Objectives
                </label>
                {formData.objectives.map((obj, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={obj}
                      onChange={(e) => handleArrayFieldChange('objectives', index, e.target.value)}
                      placeholder="e.g., Build 25+ web projects"
                      className="flex-1 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />
                    <button
                      onClick={() => removeArrayField('objectives', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayField('objectives')}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  <Plus size={20} />
                  Add Objective
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'curriculum' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Course Curriculum</h2>
                <button
                  onClick={addModule}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <Plus size={20} />
                  Add Module
                </button>
              </div>

              {modules.map((module, moduleIndex) => (
                <div key={module.id} className="border border-zinc-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <GripVertical size={20} className="text-zinc-400 mt-3 cursor-move" />
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                        placeholder={`Module ${moduleIndex + 1}: Enter module title`}
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        type="text"
                        value={module.description}
                        onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                        placeholder="Module description (optional)"
                        className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                      />
                    </div>
                    <button
                      onClick={() => removeModule(module.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Lessons */}
                  <div className="ml-8 space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center gap-2 p-3 bg-zinc-50 rounded-lg">
                        <GripVertical size={16} className="text-zinc-400 cursor-move" />
                        {lesson.type === 'video' && <Video size={16} />}
                        {lesson.type === 'text' && <FileText size={16} />}
                        {lesson.type === 'quiz' && <BarChart size={16} />}
                        {lesson.type === 'assignment' && <PenTool size={16} />}
                        <input
                          type="text"
                          value={lesson.title}
                          placeholder={`Lesson ${lessonIndex + 1}: Enter lesson title`}
                          className="flex-1 px-3 py-1 bg-white border border-zinc-200 rounded focus:outline-none focus:border-black transition-colors"
                        />
                        <button className="p-1 hover:bg-zinc-200 rounded transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    ))}

                    {/* Add Lesson Buttons */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => addLesson(module.id, 'video')}
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        <Video size={16} />
                        Video
                      </button>
                      <button
                        onClick={() => addLesson(module.id, 'text')}
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        <FileText size={16} />
                        Text
                      </button>
                      <button
                        onClick={() => addLesson(module.id, 'quiz')}
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        <BarChart size={16} />
                        Quiz
                      </button>
                      <button
                        onClick={() => addLesson(module.id, 'assignment')}
                        className="flex items-center gap-2 px-3 py-2 text-sm border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                      >
                        <PenTool size={16} />
                        Assignment
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'pricing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Price
                </label>
                <div className="flex gap-4">
                  <select
                    value={formData.currency}
                    onChange={(e) => handleBasicInfoChange('currency', e.target.value)}
                    className="px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleBasicInfoChange('price', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="flex-1 px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <p className="text-sm text-zinc-600 mt-2">
                  Set to 0 for a free course
                </p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-lg">
                <h3 className="font-medium mb-2">Pricing Tips</h3>
                <ul className="space-y-1 text-sm text-zinc-600">
                  <li>• Research similar courses in your category</li>
                  <li>• Consider offering an introductory price</li>
                  <li>• Free courses can help build your audience</li>
                  <li>• Premium pricing works for specialized content</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleBasicInfoChange('language', e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Portuguese">Portuguese</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Certificate Settings
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black"
                    />
                    <span className="text-sm">Issue certificate upon completion</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black"
                    />
                    <span className="text-sm">Enable LinkedIn sharing for certificates</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black"
                    />
                    <span className="text-sm">Require minimum score for certificate</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Course Tags
                </label>
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => handleArrayFieldChange('tags', index, e.target.value)}
                      placeholder="e.g., Web Development"
                      className="flex-1 px-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />
                    <button
                      onClick={() => removeArrayField('tags', index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayField('tags')}
                  className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  <Plus size={20} />
                  Add Tag
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewCoursePage