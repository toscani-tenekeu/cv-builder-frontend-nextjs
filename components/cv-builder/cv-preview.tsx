"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface CVPreviewProps {
  onBack: () => void
  onNext: () => void
}

export default function CVPreview({ onBack, onNext }: CVPreviewProps) {
  const { language } = useLanguage()
  const { cvData } = useCVBuilder()
  const [activeTemplate, setActiveTemplate] = useState<"preview" | "download">("preview")

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

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    const { firstName, lastName } = cvData.personalInfo
    if (!firstName && !lastName) return "CV"
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }

  // Update the CV preview component to be more mobile-friendly and look like a real PDF

  // Add a responsive design for mobile view
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{language === "fr" ? "Aperçu de votre CV" : "Resume Preview"}</h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Voici à quoi ressemble votre CV. Vous pouvez le télécharger ou l'imprimer."
            : "Here's what your resume looks like. You can download or print it."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden bg-white dark:bg-zinc-900 shadow-xl">
            <CardContent className="p-0">
              <div className="relative aspect-[210/297] w-full overflow-hidden">
                {/* CV Preview - This would be replaced with actual CV template rendering */}
                <div className="absolute inset-0 p-4 md:p-8 overflow-auto">
                  {/* Template indicator */}
                  {cvData.template && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className={`${cvData.template.type === "premium" ? "bg-amber-600" : "bg-teal-600"}`}>
                        {cvData.template.name}
                      </Badge>
                    </div>
                  )}

                  {/* Header - Responsive design */}
                  <div className="flex flex-col items-center text-center mb-4 pb-4 border-b">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                      {cvData.personalInfo.profilePicture ? (
                        <Avatar className="h-16 w-16 sm:h-24 sm:w-24 border-2 border-teal-600">
                          <AvatarImage src={cvData.personalInfo.profilePicture} alt="Profile" />
                          <AvatarFallback className="bg-teal-600 text-white text-sm sm:text-xl">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                      ) : null}
                      <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                          {cvData.personalInfo.firstName} {cvData.personalInfo.lastName}
                        </h1>
                        <p className="text-base sm:text-lg text-teal-600">{cvData.personalInfo.title}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
                      {cvData.personalInfo.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {cvData.personalInfo.email}
                        </span>
                      )}
                      {cvData.personalInfo.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          {cvData.personalInfo.phone}
                        </span>
                      )}
                      {cvData.personalInfo.address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          <span className="truncate max-w-[150px] sm:max-w-none">
                            {cvData.personalInfo.address}, {cvData.personalInfo.city}, {cvData.personalInfo.country}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Summary - Responsive */}
                  {cvData.personalInfo.summary && (
                    <div className="mb-4">
                      <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-teal-600 border-b pb-1">
                        {language === "fr" ? "Résumé" : "Summary"}
                      </h2>
                      <p className="text-xs sm:text-sm">{cvData.personalInfo.summary}</p>
                    </div>
                  )}

                  {/* Two column layout for desktop, single column for mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      {/* Experience - Responsive */}
                      {cvData.experience.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-teal-600 border-b pb-1">
                            {language === "fr" ? "Expérience professionnelle" : "Work Experience"}
                          </h2>
                          <div className="space-y-2 sm:space-y-4">
                            {cvData.experience.map((exp) => (
                              <div key={exp.id}>
                                <h3 className="text-xs sm:text-sm font-medium">{exp.position}</h3>
                                <div className="flex justify-between text-xs">
                                  <span className="font-medium">{exp.company}</span>
                                  <span className="text-muted-foreground">
                                    {exp.startDate} -{" "}
                                    {exp.current ? (language === "fr" ? "Présent" : "Present") : exp.endDate}
                                  </span>
                                </div>
                                {exp.location && <p className="text-xs text-muted-foreground">{exp.location}</p>}
                                {exp.description && <p className="text-xs mt-1">{exp.description}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Education - Responsive */}
                      {cvData.education.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-teal-600 border-b pb-1">
                            {language === "fr" ? "Formation" : "Education"}
                          </h2>
                          <div className="space-y-2 sm:space-y-4">
                            {cvData.education.map((edu) => (
                              <div key={edu.id}>
                                <h3 className="text-xs sm:text-sm font-medium">
                                  {edu.degree}, {edu.field}
                                </h3>
                                <div className="flex justify-between text-xs">
                                  <span className="font-medium">{edu.institution}</span>
                                  <span className="text-muted-foreground">
                                    {edu.startDate} -{" "}
                                    {edu.current ? (language === "fr" ? "Présent" : "Present") : edu.endDate}
                                  </span>
                                </div>
                                {edu.location && <p className="text-xs text-muted-foreground">{edu.location}</p>}
                                {edu.description && <p className="text-xs mt-1">{edu.description}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {/* Skills - Responsive */}
                      {cvData.skills.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-teal-600 border-b pb-1">
                            {language === "fr" ? "Compétences" : "Skills"}
                          </h2>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {cvData.skills.map((skill) => (
                              <Badge
                                key={skill.id}
                                variant="outline"
                                className="text-xs bg-teal-50 dark:bg-teal-950/30"
                              >
                                {skill.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Languages - Responsive */}
                      {cvData.languages.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-teal-600 border-b pb-1">
                            {language === "fr" ? "Langues" : "Languages"}
                          </h2>
                          <div className="grid grid-cols-1 gap-1 sm:gap-2">
                            {cvData.languages.map((lang) => (
                              <div key={lang.id} className="flex justify-between text-xs">
                                <span>{lang.name}</span>
                                <span className="text-muted-foreground">
                                  {lang.proficiency === "beginner" && (language === "fr" ? "Débutant" : "Beginner")}
                                  {lang.proficiency === "intermediate" &&
                                    (language === "fr" ? "Intermédiaire" : "Intermediate")}
                                  {lang.proficiency === "advanced" && (language === "fr" ? "Avancé" : "Advanced")}
                                  {lang.proficiency === "fluent" && (language === "fr" ? "Courant" : "Fluent")}
                                  {lang.proficiency === "native" &&
                                    (language === "fr" ? "Langue maternelle" : "Native")}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Projects - Responsive */}
                      {cvData.projects.length > 0 && (
                        <div className="mb-4">
                          <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-teal-600 border-b pb-1">
                            {language === "fr" ? "Projets" : "Projects"}
                          </h2>
                          <div className="space-y-2 sm:space-y-4">
                            {cvData.projects.map((project) => (
                              <div key={project.id}>
                                <h3 className="text-xs sm:text-sm font-medium">{project.name}</h3>
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">
                                    {project.startDate} -{" "}
                                    {project.current ? (language === "fr" ? "Présent" : "Present") : project.endDate}
                                  </span>
                                </div>
                                {project.url && (
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-teal-600 hover:underline truncate block"
                                  >
                                    {project.url}
                                  </a>
                                )}
                                {project.description && <p className="text-xs mt-1">{project.description}</p>}
                                {project.technologies && project.technologies.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {project.technologies.map((tech, index) => (
                                      <Badge key={index} variant="outline" className="text-[10px] px-1">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Interests - Responsive */}
                  {cvData.interests.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-teal-600 border-b pb-1">
                        {language === "fr" ? "Centres d'intérêt" : "Interests"}
                      </h2>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {cvData.interests.map((interest) => (
                          <Badge key={interest.id} variant="outline" className="text-xs">
                            {interest.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* References - Responsive */}
                  {cvData.references.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-teal-600 border-b pb-1">
                        {language === "fr" ? "Références" : "References"}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        {cvData.references.map((reference) => (
                          <div key={reference.id} className="text-xs">
                            <p className="font-medium">{reference.name}</p>
                            <p>
                              {reference.position}, {reference.company}
                            </p>
                            <p>{reference.email}</p>
                            {reference.phone && <p>{reference.phone}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                {language === "fr" ? "Votre CV est prêt !" : "Your resume is ready!"}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">{language === "fr" ? "Type de CV" : "Resume Type"}</h3>
                  <Badge className="bg-teal-600">{getCVTypeLabel()}</Badge>
                </div>

                <div>
                  <h3 className="font-medium mb-2">{language === "fr" ? "Modèle" : "Template"}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={`${cvData.template?.type === "premium" ? "bg-amber-600" : "bg-teal-600"}`}>
                      {cvData.template?.name}
                    </Badge>
                    <span className="text-sm font-bold">{cvData.template?.price} FCFA</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">{language === "fr" ? "Prochaine étape" : "Next Step"}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "fr"
                      ? "Pour télécharger votre CV, veuillez procéder au paiement à l'étape suivante."
                      : "To download your CV, please proceed to payment in the next step."}
                  </p>
                  <Button onClick={onNext} className="mt-4 w-full bg-teal-600 hover:bg-teal-700">
                    {language === "fr" ? "Continuer vers le paiement" : "Continue to payment"}
                  </Button>
                </div>

                <div>
                  <h3 className="font-medium mb-2">{language === "fr" ? "Conseils" : "Tips"}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      •{" "}
                      {language === "fr"
                        ? "Relisez attentivement votre CV pour éviter les fautes."
                        : "Proofread your resume carefully to avoid mistakes."}
                    </li>
                    <li>
                      •{" "}
                      {language === "fr"
                        ? "Adaptez votre CV à chaque offre d'emploi."
                        : "Tailor your resume to each job application."}
                    </li>
                    <li>
                      •{" "}
                      {language === "fr"
                        ? "Utilisez des mots-clés pertinents pour votre secteur."
                        : "Use relevant keywords for your industry."}
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          {language === "fr" ? "Retour" : "Back"}
        </Button>
      </div>
    </motion.div>
  )
}

