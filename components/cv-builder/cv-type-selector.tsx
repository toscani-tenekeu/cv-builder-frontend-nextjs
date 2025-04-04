"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder, type CVType } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

interface CVTypeOption {
  id: CVType
  title: {
    fr: string
    en: string
  }
  description: {
    fr: string
    en: string
  }
  image: string
}

interface CVTypeSelectorProps {
  onNext: () => void
}

const cvTypes: CVTypeOption[] = [
  {
    id: "canadian",
    title: { fr: "Canadien", en: "Canadian" },
    description: {
      fr: "Adapté au marché du travail canadien.",
      en: "Adapted to the Canadian job market.",
    },
    image: "/images/cv-templates/canadian.png",
  },
  {
    id: "professional",
    title: { fr: "Professionnel", en: "Professional" },
    description: {
      fr: "Un CV soigné pour les cadres expérimentés.",
      en: "A polished resume for experienced executives.",
    },
    image: "/images/cv-templates/professional.png",
  },
  {
    id: "student",
    title: { fr: "Étudiant", en: "Student" },
    description: {
      fr: "Idéal pour les étudiants et jeunes diplômés.",
      en: "Ideal for students and recent graduates.",
    },
    image: "/images/cv-templates/student.png",
  },
  {
    id: "creative",
    title: { fr: "Créatif", en: "Creative" },
    description: {
      fr: "Mettez en valeur votre originalité et votre talent.",
      en: "Showcase your originality and talent.",
    },
    image: "/images/cv-templates/creative.png",
  },
  {
    id: "minimalist",
    title: { fr: "Minimaliste", en: "Minimalist" },
    description: {
      fr: "Un design épuré pour une communication claire.",
      en: "A clean design for clear communication.",
    },
    image: "/images/cv-templates/minimalist.png",
  },
  {
    id: "technical",
    title: { fr: "Technique", en: "Technical" },
    description: {
      fr: "Conçu pour les professionnels de l'informatique et de l'ingénierie.",
      en: "Designed for IT and engineering professionals.",
    },
    image: "/images/cv-templates/technical.png",
  },
  {
    id: "functional",
    title: { fr: "Fonctionnel", en: "Functional" },
    description: {
      fr: "Parfait pour ceux qui changent de carrière ou ont des lacunes dans leur parcours.",
      en: "Perfect for those changing careers or with gaps in their history.",
    },
    image: "/images/cv-templates/functional.png",
  },
]

// Update the CV type selector to include custom questions for each CV type
export default function CVTypeSelector({ onNext }: CVTypeSelectorProps) {
  const { language } = useLanguage()
  const { cvData, setCVType } = useCVBuilder()
  const [selectedType, setSelectedType] = useState<CVType | null>(cvData.type)
  const [showQuestions, setShowQuestions] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  // Custom questions for each CV type
  const typeQuestions: Record<CVType, { question: string; options: string[] }[]> = {
    canadian: [
      {
        question:
          language === "fr"
            ? "Avez-vous de l'expérience de travail au Canada?"
            : "Do you have work experience in Canada?",
        options: language === "fr" ? ["Oui", "Non"] : ["Yes", "No"],
      },
      {
        question: language === "fr" ? "Quel est votre statut au Canada?" : "What is your status in Canada?",
        options:
          language === "fr"
            ? ["Citoyen", "Résident permanent", "Permis de travail", "Étudiant international", "Autre"]
            : ["Citizen", "Permanent Resident", "Work Permit", "International Student", "Other"],
      },
    ],
    professional: [
      {
        question:
          language === "fr"
            ? "Combien d'années d'expérience professionnelle avez-vous?"
            : "How many years of professional experience do you have?",
        options: ["0-2", "3-5", "6-10", "10+"],
      },
      {
        question:
          language === "fr" ? "Quel est votre niveau hiérarchique actuel?" : "What is your current career level?",
        options:
          language === "fr"
            ? ["Débutant", "Intermédiaire", "Senior", "Direction"]
            : ["Entry-level", "Mid-level", "Senior", "Executive"],
      },
    ],
    student: [
      {
        question:
          language === "fr" ? "Quel est votre niveau d'études actuel?" : "What is your current education level?",
        options:
          language === "fr"
            ? ["Lycée", "Licence", "Master", "Doctorat"]
            : ["High School", "Bachelor's", "Master's", "PhD"],
      },
      {
        question: language === "fr" ? "Avez-vous effectué des stages?" : "Have you completed any internships?",
        options: language === "fr" ? ["Oui", "Non"] : ["Yes", "No"],
      },
    ],
    creative: [
      {
        question:
          language === "fr" ? "Dans quel domaine créatif travaillez-vous?" : "In which creative field do you work?",
        options:
          language === "fr"
            ? ["Design graphique", "Photographie", "Vidéo", "Art", "Autre"]
            : ["Graphic Design", "Photography", "Video", "Art", "Other"],
      },
      {
        question: language === "fr" ? "Avez-vous un portfolio en ligne?" : "Do you have an online portfolio?",
        options: language === "fr" ? ["Oui", "Non"] : ["Yes", "No"],
      },
    ],
    minimalist: [
      {
        question:
          language === "fr"
            ? "Préférez-vous mettre l'accent sur vos compétences ou votre expérience?"
            : "Do you prefer to emphasize your skills or experience?",
        options:
          language === "fr"
            ? ["Compétences", "Expérience", "Les deux également"]
            : ["Skills", "Experience", "Both equally"],
      },
    ],
    technical: [
      {
        question:
          language === "fr" ? "Dans quel domaine technique travaillez-vous?" : "In which technical field do you work?",
        options:
          language === "fr"
            ? ["Développement logiciel", "Ingénierie", "Sciences", "IT", "Autre"]
            : ["Software Development", "Engineering", "Sciences", "IT", "Other"],
      },
      {
        question:
          language === "fr"
            ? "Combien de compétences techniques souhaitez-vous mettre en avant?"
            : "How many technical skills would you like to highlight?",
        options: ["1-5", "6-10", "11-15", "15+"],
      },
    ],
    functional: [
      {
        question: language === "fr" ? "Changez-vous de carrière?" : "Are you changing careers?",
        options: language === "fr" ? ["Oui", "Non"] : ["Yes", "No"],
      },
      {
        question:
          language === "fr"
            ? "Avez-vous des périodes d'inactivité dans votre parcours professionnel?"
            : "Do you have gaps in your employment history?",
        options: language === "fr" ? ["Oui", "Non"] : ["Yes", "No"],
      },
    ],
  }

  const handleSelect = (type: CVType) => {
    setSelectedType(type)
    // Reset answers when changing type
    setAnswers({})
    setShowQuestions(false)
  }

  const handleContinue = () => {
    if (selectedType) {
      setCVType(selectedType)
      if (!showQuestions) {
        setShowQuestions(true)
      } else {
        onNext()
      }
    }
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${questionIndex}`]: answer,
    }))
  }

  const isQuestionsComplete = () => {
    if (!selectedType || !showQuestions) return true
    const questions = typeQuestions[selectedType]
    return questions.every((_, index) => answers[`q${index}`])
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {language === "fr" ? "Choisissez votre type de CV" : "Choose your resume type"}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === "fr"
            ? "Sélectionnez le format qui correspond le mieux à votre profil et à vos objectifs professionnels."
            : "Select the format that best matches your profile and professional goals."}
        </p>
      </div>

      {!showQuestions ? (
        <>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cvTypes.map((type) => (
              <motion.div key={type.id} variants={item}>
                <Card
                  className={`relative cursor-pointer transition-all hover:shadow-lg ${
                    selectedType === type.id
                      ? "border-teal-600 ring-2 ring-teal-600 ring-opacity-50"
                      : "hover:border-teal-600/50"
                  }`}
                  onClick={() => handleSelect(type.id)}
                >
                  {selectedType === type.id && (
                    <div className="absolute top-2 right-2 z-10">
                      <CheckCircle2 className="h-6 w-6 text-teal-600" />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-md">
                      <Image
                        src={type.image || "/placeholder.svg"}
                        alt={type.title[language === "fr" ? "fr" : "en"]}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{type.title[language === "fr" ? "fr" : "en"]}</h3>
                    <p className="text-sm text-muted-foreground">{type.description[language === "fr" ? "fr" : "en"]}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {language === "fr" ? "Quelques questions sur votre profil" : "A few questions about your profile"}
              </h2>

              {selectedType &&
                typeQuestions[selectedType].map((q, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-medium mb-3">{q.question}</h3>
                    <Select
                      value={answers[`q${index}`] || ""}
                      onValueChange={(value) => handleAnswerChange(index, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={language === "fr" ? "Sélectionnez une option" : "Select an option"} />
                      </SelectTrigger>
                      <SelectContent>
                        {q.options.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 flex justify-between"
      >
        {showQuestions && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowQuestions(false)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === "fr" ? "Retour" : "Back"}
          </Button>
        )}
        <div className="ml-auto">
          <Button
            size="lg"
            className="bg-teal-600 hover:bg-teal-700 px-8"
            disabled={!selectedType || (showQuestions && !isQuestionsComplete())}
            onClick={handleContinue}
          >
            {language === "fr" ? "Continuer" : "Continue"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

