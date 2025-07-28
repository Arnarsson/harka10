"use client"

import { motion } from "framer-motion"
import { Award, Download, Share2, ExternalLink, CheckCircle } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { cardHover } from "@/lib/animations"

interface CertificatePreviewProps {
  id: string
  courseName: string
  userName: string
  completionDate: string
  skills: string[]
  verificationUrl: string
  issuedBy?: string
}

export function CertificatePreview({
  id,
  courseName,
  userName,
  completionDate,
  skills,
  verificationUrl,
  issuedBy = "AI Platform",
}: CertificatePreviewProps) {
  const handleShare = () => {
    const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
      courseName
    )}&organizationId=12345&issueYear=${new Date(completionDate).getFullYear()}&issueMonth=${
      new Date(completionDate).getMonth() + 1
    }&certId=${id}&certUrl=${encodeURIComponent(verificationUrl)}`
    
    window.open(linkedinUrl, "_blank")
  }

  return (
    <AnimatedCard className="overflow-hidden">
      <div className="p-6 space-y-4">
        {/* Certificate Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-medium">{courseName}</h3>
            <p className="text-sm text-muted-foreground">Issued by {issuedBy}</p>
          </div>
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-primary/10 p-2 rounded-full"
          >
            <Award className="h-5 w-5 text-primary" />
          </motion.div>
        </div>

        {/* Certificate Details */}
        <div className="space-y-2 py-4 border-y">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Awarded to</span>
            <span className="font-medium">{userName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Completion Date</span>
            <span>{new Date(completionDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Certificate ID</span>
            <span className="font-mono text-xs">{id.slice(0, 8)}</span>
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Skills Earned</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-muted text-xs rounded-full"
                >
                  <CheckCircle className="h-3 w-3" />
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <AnimatedButton
            onClick={handleShare}
            size="sm"
            className="flex-1"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share on LinkedIn
          </AnimatedButton>
          <AnimatedButton
            variant="outline"
            size="sm"
            onClick={() => window.open(verificationUrl, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
          </AnimatedButton>
        </div>
      </div>
    </AnimatedCard>
  )
}

export function CertificateGrid({ certificates }: { certificates: CertificatePreviewProps[] }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {certificates.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <CertificatePreview {...cert} />
        </motion.div>
      ))}
    </motion.div>
  )
}