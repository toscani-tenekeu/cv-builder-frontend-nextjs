"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder, type Skill } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Plus, Trash2, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SkillsFormProps {
  onNext: () => void
  onBack: () => void
}

export default function SkillsForm({ onNext, onBack }: SkillsFormProps) {
  const { language } = useLanguage()
  const { cvData, addSkill, removeSkill } = useCVBuilder()
  const { skills } = cvData

  const [showForm, setShowForm] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: 3,
    category: "",
  })

  const skillCategories = [
    { value: "technical", label: language === "fr" ? "Techniques" : "Technical" },
    { value: "soft", label: language === "fr" ? "Relationnelles" : "Soft Skills" },
    { value: "languages", label: language === "fr" ? "Langages de programmation" : "Programming Languages" },
    { value: "tools", label: language === "fr" ? "Outils" : "Tools" },
    { value: "other", label: language === "fr" ? "Autres" : "Other" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentSkill((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setCurrentSkill((prev) => ({ ...prev, category: value }))
  }

  const handleLevelChange = (value: number[]) => {
    setCurrentSkill((prev) => ({ ...prev, level: value[0] }))
  }

  const handleAddSkill = () => {
    addSkill(currentSkill)
    setCurrentSkill({
      name: "",
      level: 3,
      category: currentSkill.category, // Keep the same category for convenience
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isFormValid = () => {
    return currentSkill.name.trim() !== ""
  }

  const getLevelText = (level: number) => {
    switch (level) {
      case 1:
        return language === "fr" ? "Débutant" : "Beginner"
      case 2:
        return language === "fr" ? "Intermédiaire" : "Intermediate"
      case 3:
        return language === "fr" ? "Compétent" : "Competent"
      case 4:
        return language === "fr" ? "Avancé" : "Advanced"
      case 5:
        return language === "fr" ? "Expert" : "Expert"
      default:
        return ""
    }
  }

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category || "other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{language === "fr" ? "Compétences" : "Skills"}</h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Ajoutez vos compétences techniques et personnelles pour mettre en valeur votre expertise."
            : "Add your technical and personal skills to highlight your expertise."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const categoryLabel = skillCategories.find((c) => c.value === category)?.label || category

            return (
              <div key={category} className="space-y-3">
                <h3 className="font-medium text-lg">{categoryLabel}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <AnimatePresence>
                    {categorySkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <Zap className="h-4 w-4 text-teal-600" />
                                <span className="font-medium">{skill.name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">{getLevelText(skill.level)}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                                  onClick={() => removeSkill(skill.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-teal-600 rounded-full"
                                  style={{ width: `${(skill.level / 5) * 100}%` }}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}

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
                      {language === "fr" ? "Ajouter une compétence" : "Add Skill"}
                    </h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            {language === "fr" ? "Compétence" : "Skill"} <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={currentSkill.name}
                            onChange={handleChange}
                            required
                            placeholder={language === "fr" ? "React.js" : "React.js"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">{language === "fr" ? "Catégorie" : "Category"}</Label>
                          <Select value={currentSkill.category} onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={language === "fr" ? "Sélectionner une catégorie" : "Select a category"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {skillCategories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="level">{language === "fr" ? "Niveau" : "Level"}</Label>
                          <span className="text-sm font-medium">{getLevelText(currentSkill.level)}</span>
                        </div>
                        <Slider
                          id="level"
                          min={1}
                          max={5}
                          step={1}
                          value={[currentSkill.level]}
                          onValueChange={handleLevelChange}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground px-1">
                          <span>{language === "fr" ? "Débutant" : "Beginner"}</span>
                          <span>{language === "fr" ? "Intermédiaire" : "Intermediate"}</span>
                          <span>{language === "fr" ? "Compétent" : "Competent"}</span>
                          <span>{language === "fr" ? "Avancé" : "Advanced"}</span>
                          <span>{language === "fr" ? "Expert" : "Expert"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        {language === "fr" ? "Annuler" : "Cancel"}
                      </Button>
                      <Button
                        type="button"
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={handleAddSkill}
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
                  {language === "fr" ? "Ajouter une compétence" : "Add Skill"}
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

