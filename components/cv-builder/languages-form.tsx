"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder, type Language } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Plus, Trash2, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface LanguagesFormProps {
  onNext: () => void
  onBack: () => void
}

export default function LanguagesForm({ onNext, onBack }: LanguagesFormProps) {
  const { language } = useLanguage()
  const { cvData, addLanguage, removeLanguage } = useCVBuilder()
  const { languages } = cvData

  const [showForm, setShowForm] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<Omit<Language, "id">>({
    name: "",
    proficiency: "intermediate",
  })

  const proficiencyLevels = [
    { value: "beginner", label: language === "fr" ? "Débutant" : "Beginner" },
    { value: "intermediate", label: language === "fr" ? "Intermédiaire" : "Intermediate" },
    { value: "advanced", label: language === "fr" ? "Avancé" : "Advanced" },
    { value: "fluent", label: language === "fr" ? "Courant" : "Fluent" },
    { value: "native", label: language === "fr" ? "Langue maternelle" : "Native" },
  ]

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLanguage((prev) => ({ ...prev, name: e.target.value }))
  }

  const handleProficiencyChange = (value: string) => {
    setCurrentLanguage((prev) => ({
      ...prev,
      proficiency: value as "beginner" | "intermediate" | "advanced" | "fluent" | "native",
    }))
  }

  const handleAddLanguage = () => {
    addLanguage(currentLanguage)
    setCurrentLanguage({
      name: "",
      proficiency: "intermediate",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isFormValid = () => {
    return currentLanguage.name.trim() !== ""
  }

  const getProficiencyLabel = (proficiency: string) => {
    return proficiencyLevels.find((level) => level.value === proficiency)?.label || proficiency
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "beginner":
        return "bg-yellow-500"
      case "intermediate":
        return "bg-yellow-600"
      case "advanced":
        return "bg-teal-500"
      case "fluent":
        return "bg-teal-600"
      case "native":
        return "bg-teal-700"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{language === "fr" ? "Langues" : "Languages"}</h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Ajoutez les langues que vous parlez et votre niveau de maîtrise."
            : "Add the languages you speak and your proficiency level."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <AnimatePresence>
            {languages.map((lang) => (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-teal-600" />
                        <span className="font-medium">{lang.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs text-white ${getProficiencyColor(lang.proficiency)}`}
                        >
                          {getProficiencyLabel(lang.proficiency)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                          onClick={() => removeLanguage(lang.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {showForm ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">
                      {language === "fr" ? "Ajouter une langue" : "Add Language"}
                    </h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {language === "fr" ? "Langue" : "Language"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={currentLanguage.name}
                          onChange={handleNameChange}
                          required
                          placeholder={language === "fr" ? "Français" : "English"}
                        />
                      </div>
                      <div className="space-y-3">
                        <Label>{language === "fr" ? "Niveau de maîtrise" : "Proficiency Level"}</Label>
                        <RadioGroup
                          value={currentLanguage.proficiency}
                          onValueChange={handleProficiencyChange}
                          className="grid grid-cols-1 md:grid-cols-2 gap-2"
                        >
                          {proficiencyLevels.map((level) => (
                            <div key={level.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={level.value} id={`proficiency-${level.value}`} />
                              <Label htmlFor={`proficiency-${level.value}`} className="cursor-pointer">
                                {level.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        {language === "fr" ? "Annuler" : "Cancel"}
                      </Button>
                      <Button
                        type="button"
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={handleAddLanguage}
                        disabled={!isFormValid()}
                      >
                        {language === "fr" ? "Ajouter" : "Add"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full py-6 border-dashed flex items-center gap-2"
                  onClick={() => setShowForm(true)}
                >
                  <Plus className="h-4 w-4" />
                  {language === "fr" ? "Ajouter une langue" : "Add Language"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {language === "fr" ? "Retour" : "Back"}
          </Button>
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
            {language === "fr" ? "Continuer" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

