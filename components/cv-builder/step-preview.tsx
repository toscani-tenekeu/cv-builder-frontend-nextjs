"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface StepPreviewProps {
  currentStep: number
}

export default function StepPreview({ currentStep }: StepPreviewProps) {
  const { language } = useLanguage()
  const { cvData } = useCVBuilder()
  const [isExpanded, setIsExpanded] = useState(false)

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    const { firstName, lastName } = cvData.personalInfo
    if (!firstName && !lastName) return "CV"
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  // Get CV type label
  const getCVTypeLabel = () => {
    switch (cvData.type) {
      case "canadian":
        return language === "fr" ? "CV Canadien" : "Canadian Resume"
      case "professional":
        return language === "fr" ? "CV Professionnel" : "Professional Resume"
      case "student":
        return language === "fr" ? "CV Étudiant" : "Student Resume"
      case "creative":
        return language === "fr" ? "CV Créatif" : "Creative Resume"
      case "minimalist":
        return language === "fr" ? "CV Minimaliste" : "Minimalist Resume"
      case "technical":
        return language === "fr" ? "CV Technique" : "Technical Resume"
      case "functional":
        return language === "fr" ? "CV Fonctionnel" : "Functional Resume"
      default:
        return language === "fr" ? "CV" : "Resume"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8 mb-4"
    >
      <Card className="overflow-hidden">
        <div
          className="p-4 flex justify-between items-center cursor-pointer bg-muted/30"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-teal-600" />
            <h3 className="font-medium">{language === "fr" ? "Aperçu de votre CV" : "Resume Preview"}</h3>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {isExpanded && (
          <CardContent className="p-4">
            <div className="bg-white dark:bg-zinc-900 rounded-md p-4 max-h-[400px] overflow-auto">
              {/* CV Type */}
              {cvData.type && (
                <div className="mb-3">
                  <Badge className="bg-teal-600">{getCVTypeLabel()}</Badge>
                </div>
              )}

              {/* Template */}
              {cvData.template && (
                <div className="mb-3">
                  <Badge className={`${cvData.template.type === "premium" ? "bg-amber-600" : "bg-teal-600"}`}>
                    {cvData.template.name} - {cvData.template.price} FCFA
                  </Badge>
                </div>
              )}

              {/* Personal Info */}
              {(cvData.personalInfo.firstName || cvData.personalInfo.lastName) && (
                <div className="flex items-center gap-3 mb-3 pb-3 border-b">
                  {cvData.personalInfo.profilePicture && (
                    <Avatar className="h-12 w-12 border-2 border-teal-600">
                      <AvatarImage src={cvData.personalInfo.profilePicture} alt="Profile" />
                      <AvatarFallback className="bg-teal-600 text-white">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <h2 className="font-bold">
                      {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                    </h2>
                    {cvData.personalInfo.title && <p className="text-sm text-teal-600">{cvData.personalInfo.title}</p>}
                  </div>
                </div>
              )}

              {/* Education */}
              {cvData.education.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-sm font-semibold mb-1 text-teal-600 border-b pb-1">
                    {language === "fr" ? "Formation" : "Education"}
                  </h3>
                  <ul className="text-xs space-y-1">
                    {cvData.education.map((edu) => (
                      <li key={edu.id}>
                        <span className="font-medium">{edu.institution}</span> - {edu.degree}, {edu.field}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Experience */}
              {cvData.experience.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-sm font-semibold mb-1 text-teal-600 border-b pb-1">
                    {language === "fr" ? "Expérience" : "Experience"}
                  </h3>
                  <ul className="text-xs space-y-1">
                    {cvData.experience.map((exp) => (
                      <li key={exp.id}>
                        <span className="font-medium">{exp.company}</span> - {exp.position}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              {cvData.skills.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-sm font-semibold mb-1 text-teal-600 border-b pb-1">
                    {language === "fr" ? "Compétences" : "Skills"}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {cvData.skills.map((skill) => (
                      <Badge key={skill.id} variant="outline" className="text-xs">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {cvData.languages.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-sm font-semibold mb-1 text-teal-600 border-b pb-1">
                    {language === "fr" ? "Langues" : "Languages"}
                  </h3>
                  <ul className="text-xs space-y-1">
                    {cvData.languages.map((lang) => (
                      <li key={lang.id}>
                        {lang.name} - {lang.proficiency}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Projects */}
              {cvData.projects.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-sm font-semibold mb-1 text-teal-600 border-b pb-1">
                    {language === "fr" ? "Projets" : "Projects"}
                  </h3>
                  <ul className="text-xs space-y-1">
                    {cvData.projects.map((project) => (
                      <li key={project.id}>{project.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interests */}
              {cvData.interests.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-sm font-semibold mb-1 text-teal-600 border-b pb-1">
                    {language === "fr" ? "Centres d'intérêt" : "Interests"}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {cvData.interests.map((interest) => (
                      <Badge key={interest.id} variant="outline" className="text-xs">
                        {interest.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* References */}
              {cvData.references.length > 0 && (
                <div className="mb-3">
                  <h3 className="text-sm font-semibold mb-1 text-teal-600 border-b pb-1">
                    {language === "fr" ? "Références" : "References"}
                  </h3>
                  <ul className="text-xs space-y-1">
                    {cvData.references.map((reference) => (
                      <li key={reference.id}>
                        {reference.name} - {reference.position}, {reference.company}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Empty State */}
              {!cvData.type &&
                !cvData.template &&
                !cvData.personalInfo.firstName &&
                !cvData.personalInfo.lastName &&
                cvData.education.length === 0 &&
                cvData.experience.length === 0 &&
                cvData.skills.length === 0 &&
                cvData.languages.length === 0 &&
                cvData.projects.length === 0 &&
                cvData.interests.length === 0 &&
                cvData.references.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>
                      {language === "fr"
                        ? "Commencez à remplir les informations pour voir l'aperçu de votre CV"
                        : "Start filling in information to see your resume preview"}
                    </p>
                  </div>
                )}
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  )
}

