"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder, type Experience } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Plus, Trash2, Briefcase, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ExperienceFormProps {
  onNext: () => void
  onBack: () => void
}

export default function ExperienceForm({ onNext, onBack }: ExperienceFormProps) {
  const { language } = useLanguage()
  const { cvData, addExperience, updateExperience, removeExperience } = useCVBuilder()
  const { experience } = cvData

  const [showForm, setShowForm] = useState(false)
  const [currentExperience, setCurrentExperience] = useState<Omit<Experience, "id">>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    current: false,
    location: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentExperience((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setCurrentExperience((prev) => ({ ...prev, current: checked }))
  }

  const handleAddExperience = () => {
    addExperience(currentExperience)
    setCurrentExperience({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: "",
    })
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isFormValid = () => {
    return (
      currentExperience.company.trim() !== "" &&
      currentExperience.position.trim() !== "" &&
      currentExperience.startDate.trim() !== ""
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {language === "fr" ? "Expérience professionnelle" : "Work Experience"}
        </h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Ajoutez vos expériences professionnelles pour mettre en valeur votre parcours."
            : "Add your work experiences to highlight your professional journey."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <AnimatePresence>
            {experience.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="mt-1">
                          <Briefcase className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{exp.position}</h3>
                          <p>{exp.company}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {exp.startDate} -{" "}
                              {exp.current ? (language === "fr" ? "Présent" : "Present") : exp.endDate}
                            </span>
                          </div>
                          {exp.location && <p className="text-sm text-muted-foreground mt-1">{exp.location}</p>}
                          {exp.description && <p className="mt-2 text-sm">{exp.description}</p>}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => removeExperience(exp.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                      {language === "fr" ? "Ajouter une expérience" : "Add Experience"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">
                          {language === "fr" ? "Entreprise" : "Company"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={currentExperience.company}
                          onChange={handleChange}
                          required
                          placeholder={language === "fr" ? "ToscaniSoft" : "Google Inc."}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">
                          {language === "fr" ? "Poste" : "Position"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="position"
                          name="position"
                          value={currentExperience.position}
                          onChange={handleChange}
                          required
                          placeholder={language === "fr" ? "Développeur Web" : "Web Developer"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">{language === "fr" ? "Lieu" : "Location"}</Label>
                        <Input
                          id="location"
                          name="location"
                          value={currentExperience.location}
                          onChange={handleChange}
                          placeholder={language === "fr" ? "Yaoundé, Cameroun" : "San Francisco, CA"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">
                          {language === "fr" ? "Date de début" : "Start Date"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="startDate"
                          name="startDate"
                          type="month"
                          value={currentExperience.startDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-start-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="endDate">{language === "fr" ? "Date de fin" : "End Date"}</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="current"
                              checked={currentExperience.current}
                              onCheckedChange={handleSwitchChange}
                            />
                            <Label htmlFor="current" className="text-sm">
                              {language === "fr" ? "Poste actuel" : "Current Position"}
                            </Label>
                          </div>
                        </div>
                        <Input
                          id="endDate"
                          name="endDate"
                          type="month"
                          value={currentExperience.endDate}
                          onChange={handleChange}
                          disabled={currentExperience.current}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-6">
                      <Label htmlFor="description">{language === "fr" ? "Description" : "Description"}</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={currentExperience.description}
                        onChange={handleChange}
                        placeholder={
                          language === "fr"
                            ? "Décrivez vos responsabilités, réalisations et compétences utilisées..."
                            : "Describe your responsibilities, achievements, and skills used..."
                        }
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        {language === "fr" ? "Annuler" : "Cancel"}
                      </Button>
                      <Button
                        type="button"
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={handleAddExperience}
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
                  {language === "fr" ? "Ajouter une expérience" : "Add Experience"}
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

