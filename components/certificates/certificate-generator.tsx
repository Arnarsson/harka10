'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, Share2, Linkedin, Link, CheckCircle, 
  Loader2, Eye, Settings, Palette, FileDown,
  Award, X
} from 'lucide-react'
import { CertificateTemplate } from './certificate-template'
import { createClient } from '@/lib/supabase/client'
import confetti from 'canvas-confetti'

interface CertificateGeneratorProps {
  courseId: string
  courseTitle: string
  recipientName: string
  completionDate: string
  score?: number
  skills: string[]
  instructorName: string
  instructorTitle: string
  onCertificateGenerated?: (certificateId: string) => void
}

export function CertificateGenerator({
  courseId,
  courseTitle,
  recipientName,
  completionDate,
  score,
  skills,
  instructorName,
  instructorTitle,
  onCertificateGenerated
}: CertificateGeneratorProps) {
  const [generating, setGenerating] = useState(false)
  const [certificateData, setCertificateData] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'minimal'>('modern')
  const [showPreview, setShowPreview] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const supabase = createClient()

  const generateCertificate = async () => {
    setGenerating(true)

    try {
      // Generate unique certificate number
      const certificateNumber = `CERT-${courseId.substring(0, 4).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`
      const verificationUrl = `${window.location.origin}/certificates/verify/${certificateNumber}`

      const certData = {
        recipientName,
        courseTitle,
        completionDate,
        certificateNumber,
        instructorName,
        instructorTitle,
        skills,
        score,
        verificationUrl
      }

      setCertificateData(certData)
      setShowPreview(true)

      // Save certificate to database
      const { data, error } = await supabase
        .from('certificates')
        .insert({
          course_id: courseId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          certificate_number: certificateNumber,
          template_id: selectedTemplate,
          issued_at: new Date().toISOString(),
          grade: score,
          skills: skills,
          verification_hash: certificateNumber, // In production, use proper hash
          metadata: certData
        })
        .select()
        .single()

      if (error) throw error

      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      if (onCertificateGenerated) {
        onCertificateGenerated(data.id)
      }
    } catch (error) {
      console.error('Error generating certificate:', error)
    } finally {
      setGenerating(false)
    }
  }

  const handleCertificateRender = (canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas
    
    // Convert canvas to blob and create download URL
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        setDownloadUrl(url)
      }
    }, 'image/png', 1.0)
  }

  const downloadCertificate = () => {
    if (downloadUrl) {
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `certificate-${certificateData.certificateNumber}.png`
      link.click()
    }
  }

  const downloadPDF = async () => {
    if (!canvasRef.current) return

    // In a real implementation, you would use a library like jsPDF
    // For now, we'll download as high-quality PNG
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `certificate-${certificateData.certificateNumber}.pdf`
        link.click()
        URL.revokeObjectURL(url)
      }
    }, 'image/png', 1.0)
  }

  const shareOnLinkedIn = () => {
    if (!certificateData) return

    // LinkedIn sharing URL structure
    const shareUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(courseTitle)}&organizationName=${encodeURIComponent('AI Training Platform')}&issueYear=${new Date(completionDate).getFullYear()}&issueMonth=${new Date(completionDate).getMonth() + 1}&certId=${certificateData.certificateNumber}&certUrl=${encodeURIComponent(certificateData.verificationUrl)}`

    window.open(shareUrl, '_blank', 'width=550,height=600')
  }

  const copyVerificationLink = () => {
    if (certificateData?.verificationUrl) {
      navigator.clipboard.writeText(certificateData.verificationUrl)
      // You could add a toast notification here
    }
  }

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose Certificate Template</h3>
        <div className="grid grid-cols-3 gap-4">
          {(['modern', 'classic', 'minimal'] as const).map((template) => (
            <button
              key={template}
              onClick={() => setSelectedTemplate(template)}
              className={`relative p-4 border-2 rounded-lg transition-all ${
                selectedTemplate === template
                  ? 'border-black bg-zinc-50'
                  : 'border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div className="aspect-[1.414/1] bg-zinc-100 rounded mb-2" />
              <p className="text-sm font-medium capitalize">{template}</p>
              {selectedTemplate === template && (
                <CheckCircle className="absolute top-2 right-2 text-green-600" size={20} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={generateCertificate}
          disabled={generating}
          className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 text-lg font-medium"
        >
          {generating ? (
            <>
              <Loader2 size={24} className="animate-spin" />
              Generating Certificate...
            </>
          ) : (
            <>
              <Award size={24} />
              Generate Certificate
            </>
          )}
        </button>
      </div>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {showPreview && certificateData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Your Certificate is Ready! 🎉</h2>
                    <p className="text-zinc-600 mt-1">
                      Congratulations on completing {courseTitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Certificate Preview */}
              <div className="flex-1 overflow-y-auto p-6 bg-zinc-50">
                <CertificateTemplate
                  data={certificateData}
                  template={selectedTemplate}
                  onRenderComplete={handleCertificateRender}
                />
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-zinc-200 bg-white">
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={downloadCertificate}
                    className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
                  >
                    <Download size={20} />
                    Download Image
                  </button>
                  
                  <button
                    onClick={downloadPDF}
                    className="flex items-center gap-2 px-6 py-3 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    <FileDown size={20} />
                    Download PDF
                  </button>

                  <button
                    onClick={shareOnLinkedIn}
                    className="flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#006399] transition-colors"
                  >
                    <Linkedin size={20} />
                    Add to LinkedIn
                  </button>

                  <button
                    onClick={copyVerificationLink}
                    className="flex items-center gap-2 px-6 py-3 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    <Link size={20} />
                    Copy Verification Link
                  </button>
                </div>

                {/* Verification Info */}
                <div className="mt-6 p-4 bg-zinc-50 rounded-lg text-center">
                  <p className="text-sm text-zinc-600">
                    Certificate Number: <span className="font-mono font-medium">{certificateData.certificateNumber}</span>
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    This certificate can be verified at: {certificateData.verificationUrl}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}