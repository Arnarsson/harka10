'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Award, Calendar, Shield, Link2 } from 'lucide-react'
import QRCode from 'qrcode'
import { useEffect, useState } from 'react'

interface CertificateTemplateProps {
  data: {
    recipientName: string
    courseTitle: string
    completionDate: string
    certificateNumber: string
    instructorName: string
    instructorTitle: string
    skills: string[]
    score?: number
    verificationUrl: string
  }
  template?: 'modern' | 'classic' | 'minimal'
  onRenderComplete?: (canvas: HTMLCanvasElement) => void
}

export function CertificateTemplate({ 
  data, 
  template = 'modern',
  onRenderComplete 
}: CertificateTemplateProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')

  useEffect(() => {
    // Generate QR code
    QRCode.toDataURL(data.verificationUrl, {
      width: 150,
      margin: 0,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).then(setQrCodeUrl)
  }, [data.verificationUrl])

  useEffect(() => {
    if (canvasRef.current && qrCodeUrl) {
      renderCertificate()
    }
  }, [qrCodeUrl, data, template])

  const renderCertificate = async () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size (A4 landscape at 300 DPI)
    canvas.width = 3508
    canvas.height = 2480

    // Background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (template === 'modern') {
      renderModernTemplate(ctx)
    } else if (template === 'classic') {
      renderClassicTemplate(ctx)
    } else {
      renderMinimalTemplate(ctx)
    }

    // Notify parent component
    if (onRenderComplete) {
      onRenderComplete(canvas)
    }
  }

  const renderModernTemplate = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, '#f8f9fa')
    gradient.addColorStop(0.5, '#ffffff')
    gradient.addColorStop(1, '#f8f9fa')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Border
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 8
    ctx.strokeRect(40, 40, width - 80, height - 80)

    // Header accent
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, width, 200)

    // Logo/Platform name
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 80px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('AI TRAINING PLATFORM', width / 2, 120)

    // Certificate title
    ctx.fillStyle = '#000000'
    ctx.font = '120px Georgia'
    ctx.textAlign = 'center'
    ctx.fillText('Certificate of Completion', width / 2, 500)

    // Decorative line
    ctx.beginPath()
    ctx.moveTo(width / 2 - 400, 580)
    ctx.lineTo(width / 2 + 400, 580)
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    ctx.stroke()

    // This certifies that
    ctx.font = '60px Arial'
    ctx.fillStyle = '#4b5563'
    ctx.fillText('This certifies that', width / 2, 750)

    // Recipient name
    ctx.font = 'bold 150px Georgia'
    ctx.fillStyle = '#000000'
    ctx.fillText(data.recipientName, width / 2, 950)

    // Has successfully completed
    ctx.font = '60px Arial'
    ctx.fillStyle = '#4b5563'
    ctx.fillText('has successfully completed', width / 2, 1150)

    // Course title
    ctx.font = 'bold 100px Arial'
    ctx.fillStyle = '#000000'
    ctx.fillText(data.courseTitle, width / 2, 1350)

    // Score if available
    if (data.score) {
      ctx.font = '50px Arial'
      ctx.fillStyle = '#16a34a'
      ctx.fillText(`with a score of ${data.score}%`, width / 2, 1450)
    }

    // Skills section
    if (data.skills.length > 0) {
      ctx.font = '40px Arial'
      ctx.fillStyle = '#6b7280'
      ctx.fillText('Skills acquired:', width / 2, 1600)
      
      ctx.font = '35px Arial'
      ctx.fillText(data.skills.join(' • '), width / 2, 1680)
    }

    // Date and signatures section
    const leftX = width * 0.25
    const rightX = width * 0.75
    const bottomY = height - 400

    // Date
    ctx.textAlign = 'left'
    ctx.font = '35px Arial'
    ctx.fillStyle = '#6b7280'
    ctx.fillText('Date of Completion', leftX, bottomY)
    ctx.font = 'bold 40px Arial'
    ctx.fillStyle = '#000000'
    ctx.fillText(new Date(data.completionDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }), leftX, bottomY + 60)

    // Instructor signature
    ctx.textAlign = 'right'
    ctx.font = '35px Arial'
    ctx.fillStyle = '#6b7280'
    ctx.fillText('Instructor', rightX, bottomY)
    ctx.font = 'bold 40px Arial'
    ctx.fillStyle = '#000000'
    ctx.fillText(data.instructorName, rightX, bottomY + 60)
    ctx.font = '30px Arial'
    ctx.fillStyle = '#6b7280'
    ctx.fillText(data.instructorTitle, rightX, bottomY + 100)

    // Certificate number and QR code
    ctx.textAlign = 'center'
    ctx.font = '30px Arial'
    ctx.fillStyle = '#9ca3af'
    ctx.fillText(`Certificate No: ${data.certificateNumber}`, width / 2, height - 200)

    // Draw QR code
    if (qrCodeUrl) {
      const qrImage = new window.Image()
      qrImage.onload = () => {
        ctx.drawImage(qrImage, width / 2 - 75, height - 180, 150, 150)
      }
      qrImage.src = qrCodeUrl
    }

    // Verification text
    ctx.font = '25px Arial'
    ctx.fillText('Scan to verify', width / 2, height - 20)
  }

  const renderClassicTemplate = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas

    // Classic border pattern
    ctx.strokeStyle = '#8b7355'
    ctx.lineWidth = 20
    ctx.strokeRect(100, 100, width - 200, height - 200)
    ctx.lineWidth = 10
    ctx.strokeRect(130, 130, width - 260, height - 260)
    ctx.lineWidth = 5
    ctx.strokeRect(150, 150, width - 300, height - 300)

    // Title
    ctx.fillStyle = '#8b7355'
    ctx.font = 'bold 180px Old English Text MT'
    ctx.textAlign = 'center'
    ctx.fillText('Certificate of Achievement', width / 2, 600)

    // Content similar to modern but with classic styling
    // ... (implement classic styling)
  }

  const renderMinimalTemplate = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas

    // Clean minimal design
    ctx.fillStyle = '#000000'
    ctx.font = '60px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.textAlign = 'left'
    ctx.fillText('CERTIFICATE', 200, 300)

    // Large recipient name
    ctx.font = 'bold 200px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.fillText(data.recipientName.toUpperCase(), 200, 600)

    // Course details
    ctx.font = '50px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto'
    ctx.fillStyle = '#4b5563'
    ctx.fillText(data.courseTitle, 200, 800)
    ctx.fillText(new Date(data.completionDate).toLocaleDateString(), 200, 900)

    // Minimal decoration
    ctx.beginPath()
    ctx.moveTo(200, 1000)
    ctx.lineTo(width - 200, 1000)
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full max-w-4xl mx-auto border border-zinc-200 rounded-lg shadow-lg"
        style={{ maxHeight: '600px' }}
      />
      
      {/* Preview overlay */}
      <div className="absolute top-4 right-4 flex gap-2">
        <div className="px-3 py-1 bg-black/80 text-white text-sm rounded-full">
          Preview
        </div>
      </div>
    </div>
  )
}