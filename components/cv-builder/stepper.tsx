"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

interface CVBuilderStepperProps {
  currentStep: number
  totalSteps: number
}

export default function CVBuilderStepper({ currentStep, totalSteps }: CVBuilderStepperProps) {
  const { t, language } = useLanguage()

  // Update the step titles to match the correct sequence
  const stepTitles = [
    language === "fr" ? "Type de CV" : "CV Type",
    language === "fr" ? "Modèle" : "Template",
    language === "fr" ? "Informations personnelles" : "Personal Information",
    language === "fr" ? "Éducation" : "Education",
    language === "fr" ? "Expérience" : "Experience",
    language === "fr" ? "Compétences" : "Skills",
    language === "fr" ? "Langues" : "Languages",
    language === "fr" ? "Projets" : "Projects",
    language === "fr" ? "Intérêts" : "Interests",
    language === "fr" ? "Références" : "References",
    language === "fr" ? "Aperçu" : "Preview",
    language === "fr" ? "Paiement" : "Payment",
    language === "fr" ? "Téléchargement" : "Download",
  ]

  return (
    <div className="relative">
      <div className="hidden md:block">
        <div className="flex justify-between items-center">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                  index + 1 <= currentStep ? "bg-teal-600 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-xs text-center ${
                  index + 1 === currentStep ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {stepTitles[index]}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
          <motion.div
            className="h-full bg-teal-600"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{stepTitles[currentStep - 1]}</h2>
          <div className="text-sm text-muted-foreground">
            {language === "fr" ? "Étape" : "Step"} {currentStep}/{totalSteps}
          </div>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-teal-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}

