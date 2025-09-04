"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, Image, X, Loader2, Eye, Brain, FileText, Sparkles } from "lucide-react"
import { GradientButton } from "@/components/ui/animated/animated-button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onUpload?: (file: File) => void
  onAnalyze?: (file: File) => void
}

export function ImageUpload({ onUpload, onAnalyze }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      onUpload?.(file)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const handleAnalyze = async () => {
    if (!file) return
    
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        objects: ["Book", "Laptop", "Coffee cup", "Plant"],
        text: "Introduction to Machine Learning",
        concepts: ["Education", "Technology", "Learning"],
        suggestedTags: ["AI", "Study", "Computer Science"],
        description: "This image appears to show a learning environment with educational materials about machine learning. A textbook is visible alongside a laptop, suggesting active study or research.",
        learningRelevance: 95
      })
      setIsAnalyzing(false)
    }, 2000)
    
    onAnalyze?.(file)
  }

  const reset = () => {
    setPreview(null)
    setFile(null)
    setAnalysisResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={cn(
          "relative overflow-hidden rounded-xl border-2 border-dashed transition-all duration-200",
          isDragActive ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-300 dark:border-gray-700",
          preview ? "cursor-default" : "cursor-pointer hover:border-purple-400"
        )}
      >
        <input {...getInputProps()} disabled={!!preview} />
        
        {!preview ? (
          <div className="p-12 text-center">
            <motion.div
              animate={{
                y: isDragActive ? -10 : 0,
                scale: isDragActive ? 1.1 : 1
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            </motion.div>
            <p className="text-lg font-medium mb-2">
              {isDragActive ? "Drop your image here" : "Drag & drop an image"}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse (PNG, JPG, GIF up to 10MB)
            </p>
          </div>
        ) : (
          <div className="relative">
            <img 
              src={preview} 
              alt="Upload preview" 
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={(e) => {
                e.stopPropagation()
                reset()
              }}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {preview && !analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 justify-center"
        >
          <GradientButton
            variant="primary"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Analyze with AI
              </>
            )}
          </GradientButton>
          
          <GradientButton variant="secondary">
            <Eye className="h-4 w-4" />
            Extract Text (OCR)
          </GradientButton>
        </motion.div>
      )}

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* AI Analysis Card */}
            <div className="glass rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold gradient-text">AI Analysis Results</h3>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Description</h4>
                <p className="text-sm">{analysisResult.description}</p>
              </div>

              {/* Detected Objects */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Detected Objects</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.objects.map((obj: string) => (
                    <span key={obj} className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                      {obj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Extracted Text */}
              {analysisResult.text && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Extracted Text</h4>
                  <p className="text-sm font-mono bg-gray-100 dark:bg-gray-800 p-3 rounded">
                    "{analysisResult.text}"
                  </p>
                </div>
              )}

              {/* Learning Concepts */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Learning Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.concepts.map((concept: string) => (
                    <span key={concept} className="px-3 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>

              {/* Suggested Tags */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Suggested Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.suggestedTags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Relevance Score */}
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Learning Relevance</h4>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisResult.learningRelevance}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    />
                  </div>
                  <span className="text-sm font-semibold">{analysisResult.learningRelevance}%</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <GradientButton variant="primary">
                <FileText className="h-4 w-4" />
                Create Lesson from Image
              </GradientButton>
              <GradientButton variant="accent">
                <Image className="h-4 w-4" />
                Add to Content Library
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}