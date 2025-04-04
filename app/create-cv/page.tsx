"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { motion, AnimatePresence } from "framer-motion"
import CVBuilderStepper from "@/components/cv-builder/stepper"
import CVTypeSelector from "@/components/cv-builder/cv-type-selector"
import PersonalInfoForm from "@/components/cv-builder/personal-info-form"
import EducationForm from "@/components/cv-builder/education-form"
import ExperienceForm from "@/components/cv-builder/experience-form"
import SkillsForm from "@/components/cv-builder/skills-form"
import LanguagesForm from "@/components/cv-builder/languages-form"
import ProjectsForm from "@/components/cv-builder/projects-form"
import InterestsForm from "@/components/cv-builder/interests-form"
import ReferencesForm from "@/components/cv-builder/references-form"
import CVPreview from "@/components/cv-builder/cv-preview"
import { CVBuilderProvider } from "@/components/cv-builder/cv-builder-context"
import { Loader2 } from "lucide-react"
import TemplateSelector from "@/components/cv-builder/template-selector"
import PaymentStep from "@/components/cv-builder/payment-step"
import StepPreview from "@/components/cv-builder/step-preview"
import FinalActions from "@/components/cv-builder/final-actions"

export default function CreateCVPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login?redirect=/create-cv")
      return
    }

    setIsLoading(false)
  }, [router])

  // Update the steps order to match the correct sequence
  const steps = [
    { id: 1, component: <CVTypeSelector onNext={() => setCurrentStep(2)} /> },
    { id: 2, component: <TemplateSelector onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} /> },
    { id: 3, component: <PersonalInfoForm onNext={() => setCurrentStep(4)} onBack={() => setCurrentStep(2)} /> },
    { id: 4, component: <EducationForm onNext={() => setCurrentStep(5)} onBack={() => setCurrentStep(3)} /> },
    { id: 5, component: <ExperienceForm onNext={() => setCurrentStep(6)} onBack={() => setCurrentStep(4)} /> },
    { id: 6, component: <SkillsForm onNext={() => setCurrentStep(7)} onBack={() => setCurrentStep(5)} /> },
    { id: 7, component: <LanguagesForm onNext={() => setCurrentStep(8)} onBack={() => setCurrentStep(6)} /> },
    { id: 8, component: <ProjectsForm onNext={() => setCurrentStep(9)} onBack={() => setCurrentStep(7)} /> },
    { id: 9, component: <InterestsForm onNext={() => setCurrentStep(10)} onBack={() => setCurrentStep(8)} /> },
    { id: 10, component: <ReferencesForm onNext={() => setCurrentStep(11)} onBack={() => setCurrentStep(9)} /> },
    { id: 11, component: <CVPreview onNext={() => setCurrentStep(12)} onBack={() => setCurrentStep(10)} /> },
    { id: 12, component: <PaymentStep onNext={() => setCurrentStep(13)} onBack={() => setCurrentStep(11)} /> },
    { id: 13, component: <FinalActions onBack={() => setCurrentStep(11)} /> },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
      </div>
    )
  }

  return (
    <CVBuilderProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <CVBuilderStepper currentStep={currentStep} totalSteps={steps.length} />

          <div className="mt-8 md:mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps.find((step) => step.id === currentStep)?.component}
              </motion.div>
            </AnimatePresence>

            {/* Add the step preview component for all steps except the preview and final steps */}
            {currentStep !== 11 && currentStep !== 12 && currentStep !== 13 && (
              <StepPreview currentStep={currentStep} />
            )}
          </div>
        </div>
      </div>
    </CVBuilderProvider>
  )
}

