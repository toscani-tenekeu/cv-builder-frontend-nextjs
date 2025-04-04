"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle2, Crown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface TemplateOption {
  id: string
  name: {
    fr: string
    en: string
  }
  description: {
    fr: string
    en: string
  }
  price: number
  type: "basique" | "premium"
  image: string
  forCVTypes?: string[] // Optional: specific CV types this template is designed for
}

interface TemplateSelectorProps {
  onNext: () => void
  onBack: () => void
}

export default function TemplateSelector({ onNext, onBack }: TemplateSelectorProps) {
  const { language } = useLanguage()
  const { cvData, updateTemplate } = useCVBuilder()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(cvData.template?.id || null)
  const [filteredTemplates, setFilteredTemplates] = useState<TemplateOption[]>([])

  const templates: TemplateOption[] = [
    {
      id: "classic",
      name: {
        fr: "Classique",
        en: "Classic",
      },
      description: {
        fr: "Un design élégant et professionnel, parfait pour tous les secteurs traditionnels.",
        en: "An elegant and professional design, perfect for all traditional sectors.",
      },
      price: 500,
      type: "basique",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["professional", "canadian", "functional"],
    },
    {
      id: "modern",
      name: {
        fr: "Moderne",
        en: "Modern",
      },
      description: {
        fr: "Un design contemporain avec une mise en page épurée et des accents de couleur.",
        en: "A contemporary design with a clean layout and color accents.",
      },
      price: 650,
      type: "basique",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["professional", "student", "minimalist"],
    },
    {
      id: "creative",
      name: {
        fr: "Créatif",
        en: "Creative",
      },
      description: {
        fr: "Un design audacieux avec des éléments graphiques uniques pour les secteurs créatifs.",
        en: "A bold design with unique graphic elements for creative industries.",
      },
      price: 800,
      type: "premium",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["creative", "student"],
    },
    {
      id: "technical",
      name: {
        fr: "Technique",
        en: "Technical",
      },
      description: {
        fr: "Un design axé sur les compétences techniques avec des graphiques de progression.",
        en: "A design focused on technical skills with progress graphics.",
      },
      price: 750,
      type: "premium",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["technical", "functional"],
    },
    {
      id: "executive",
      name: {
        fr: "Exécutif",
        en: "Executive",
      },
      description: {
        fr: "Un design sophistiqué pour les cadres supérieurs et les professionnels expérimentés.",
        en: "A sophisticated design for senior executives and experienced professionals.",
      },
      price: 950,
      type: "premium",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["professional", "canadian"],
    },
    {
      id: "minimal",
      name: {
        fr: "Minimaliste",
        en: "Minimalist",
      },
      description: {
        fr: "Un design simple et épuré qui met l'accent sur le contenu.",
        en: "A simple, clean design that emphasizes content.",
      },
      price: 550,
      type: "basique",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["minimalist", "student", "functional"],
    },
    {
      id: "academic",
      name: {
        fr: "Académique",
        en: "Academic",
      },
      description: {
        fr: "Un design idéal pour les étudiants et les chercheurs.",
        en: "A design ideal for students and researchers.",
      },
      price: 600,
      type: "basique",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["student", "technical"],
    },
    {
      id: "innovative",
      name: {
        fr: "Innovant",
        en: "Innovative",
      },
      description: {
        fr: "Un design avant-gardiste avec une mise en page unique et des éléments interactifs.",
        en: "A cutting-edge design with unique layout and interactive elements.",
      },
      price: 1000,
      type: "premium",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["creative", "technical"],
    },
    // Adding more templates
    {
      id: "professional-plus",
      name: {
        fr: "Professionnel Plus",
        en: "Professional Plus",
      },
      description: {
        fr: "Une version améliorée du design professionnel avec des fonctionnalités supplémentaires.",
        en: "An enhanced version of the professional design with additional features.",
      },
      price: 850,
      type: "premium",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["professional", "canadian"],
    },
    {
      id: "compact",
      name: {
        fr: "Compact",
        en: "Compact",
      },
      description: {
        fr: "Un design condensé pour présenter beaucoup d'informations sur une seule page.",
        en: "A condensed design to present a lot of information on a single page.",
      },
      price: 580,
      type: "basique",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["professional", "technical", "functional"],
    },
    {
      id: "elegant",
      name: {
        fr: "Élégant",
        en: "Elegant",
      },
      description: {
        fr: "Un design raffiné avec une typographie soignée et des détails subtils.",
        en: "A refined design with careful typography and subtle details.",
      },
      price: 700,
      type: "basique",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["professional", "minimalist"],
    },
    {
      id: "bold",
      name: {
        fr: "Audacieux",
        en: "Bold",
      },
      description: {
        fr: "Un design qui se démarque avec des couleurs vives et une mise en page dynamique.",
        en: "A standout design with vibrant colors and dynamic layout.",
      },
      price: 780,
      type: "premium",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["creative", "student"],
    },
    {
      id: "infographic",
      name: {
        fr: "Infographique",
        en: "Infographic",
      },
      description: {
        fr: "Un design visuel qui présente vos compétences et expériences sous forme de graphiques.",
        en: "A visual design that presents your skills and experiences in graphic form.",
      },
      price: 920,
      type: "premium",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["creative", "technical"],
    },
    {
      id: "simple",
      name: {
        fr: "Simple",
        en: "Simple",
      },
      description: {
        fr: "Un design basique mais efficace, idéal pour les débutants.",
        en: "A basic but effective design, ideal for beginners.",
      },
      price: 500,
      type: "basique",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["student", "minimalist"],
    },
    {
      id: "chronological",
      name: {
        fr: "Chronologique",
        en: "Chronological",
      },
      description: {
        fr: "Un design qui met l'accent sur votre progression de carrière dans le temps.",
        en: "A design that emphasizes your career progression over time.",
      },
      price: 620,
      type: "basique",
      image: "/placeholder.svg?height=400&width=300",
      forCVTypes: ["professional", "canadian", "functional"],
    },
  ]

  // Filter templates based on selected CV type
  useEffect(() => {
    if (cvData.type) {
      const filtered = templates.filter(
        (template) => !template.forCVTypes || template.forCVTypes.includes(cvData.type || ""),
      )
      setFilteredTemplates(filtered.length > 0 ? filtered : templates)
    } else {
      setFilteredTemplates(templates)
    }
  }, [cvData.type])

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      updateTemplate({
        id: template.id,
        name: template.name[language === "fr" ? "fr" : "en"],
        price: template.price,
        type: template.type,
      })
    }
  }

  const handleContinue = () => {
    if (selectedTemplate) {
      onNext()
    }
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
          {language === "fr" ? "Choisissez votre modèle de CV" : "Choose your resume template"}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === "fr"
            ? "Sélectionnez un modèle qui correspond à votre style et à vos objectifs professionnels."
            : "Select a template that matches your style and professional goals."}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTemplates.map((template) => (
          <motion.div key={template.id} variants={item}>
            <Card
              className={`relative cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate === template.id
                  ? "border-teal-600 ring-2 ring-teal-600 ring-opacity-50"
                  : "hover:border-teal-600/50"
              }`}
              onClick={() => handleSelect(template.id)}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 z-10">
                  <CheckCircle2 className="h-6 w-6 text-teal-600" />
                </div>
              )}
              <div className="absolute top-2 left-2 z-10">
                <Badge
                  className={`${
                    template.type === "premium" ? "bg-amber-600 hover:bg-amber-700" : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  {template.type === "premium" ? (
                    <span className="flex items-center gap-1">
                      <Crown className="h-3 w-3" />
                      Premium
                    </span>
                  ) : (
                    "Basique"
                  )}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-md">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.name[language === "fr" ? "fr" : "en"]}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{template.name[language === "fr" ? "fr" : "en"]}</h3>
                  <span className="font-bold text-teal-600">{template.price} FCFA</span>
                </div>
                <p className="text-sm text-muted-foreground">{template.description[language === "fr" ? "fr" : "en"]}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 flex justify-between"
      >
        <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          {language === "fr" ? "Retour" : "Back"}
        </Button>
        <Button
          size="lg"
          className="bg-teal-600 hover:bg-teal-700 px-8"
          disabled={!selectedTemplate}
          onClick={handleContinue}
        >
          {language === "fr" ? "Continuer" : "Continue"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}

