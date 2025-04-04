"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder, type Education } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Plus, Trash2, GraduationCap, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface EducationFormProps {
  onNext: () => void
  onBack: () => void
}

export default function EducationForm({ onNext, onBack }: EducationFormProps) {
  const { language } = useLanguage()
  const { cvData, addEducation, updateEducation, removeEducation } = useCVBuilder()
  const { education } = cvData

  const [showForm, setShowForm] = useState(false)
  const [currentEducation, setCurrentEducation] = useState<Omit<Education, "id">>({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    current: false,
    location: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentEducation((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setCurrentEducation((prev) => ({ ...prev, current: checked }))
  }

  const handleAddEducation = () => {
    addEducation(currentEducation)
    setCurrentEducation({
      institution: "",
      degree: "",
      field: "",
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
      currentEducation.institution.trim() !== "" &&
      currentEducation.degree.trim() !== "" &&
      currentEducation.startDate.trim() !== ""
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{language === "fr" ? "Éducation" : "Education"}</h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Ajoutez vos diplômes et formations pour mettre en valeur votre parcours académique."
            : "Add your degrees and education to highlight your academic background."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <AnimatePresence>
            {education.map((edu) => (
              <motion.div
                key={edu.id}
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
                          <GraduationCap className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{edu.institution}</h3>
                          <p>
                            {edu.degree}, {edu.field}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {edu.startDate} -{" "}
                              {edu.current ? (language === "fr" ? "Présent" : "Present") : edu.endDate}
                            </span>
                          </div>
                          {edu.location && <p className="text-sm text-muted-foreground mt-1">{edu.location}</p>}
                          {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => removeEducation(edu.id)}
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
                      {language === "fr" ? "Ajouter une formation" : "Add Education"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="institution">
                          {language === "fr" ? "Établissement" : "Institution"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="institution"
                          name="institution"
                          value={currentEducation.institution}
                          onChange={handleChange}
                          required
                          placeholder={language === "fr" ? "Université de Yaoundé" : "Harvard University"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">{language === "fr" ? "Lieu" : "Location"}</Label>
                        <Input
                          id="location"
                          name="location"
                          value={currentEducation.location}
                          onChange={handleChange}
                          placeholder={language === "fr" ? "Yaoundé, Cameroun" : "Cambridge, MA"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="degree">
                          {language === "fr" ? "Diplôme" : "Degree"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="degree"
                          name="degree"
                          value={currentEducation.degree}
                          onChange={handleChange}
                          required
                          placeholder={language === "fr" ? "Licence" : "Bachelor's"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="field">
                          {language === "fr" ? "Domaine d'études" : "Field of Study"}{" "}
                          <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="field"
                          name="field"
                          value={currentEducation.field}
                          onChange={handleChange}
                          required
                          placeholder={language === "fr" ? "Informatique" : "Computer Science"}
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
                          value={currentEducation.startDate}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="endDate">{language === "fr" ? "Date de fin" : "End Date"}</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="current"
                              checked={currentEducation.current}
                              onCheckedChange={handleSwitchChange}
                            />
                            <Label htmlFor="current" className="text-sm">
                              {language === "fr" ? "En cours" : "Current"}
                            </Label>
                          </div>
                        </div>
                        <Input
                          id="endDate"
                          name="endDate"
                          type="month"
                          value={currentEducation.endDate}
                          onChange={handleChange}
                          disabled={currentEducation.current}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-6">
                      <Label htmlFor="description">{language === "fr" ? "Description" : "Description"}</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={currentEducation.description}
                        onChange={handleChange}
                        placeholder={
                          language === "fr"
                            ? "Décrivez vos réalisations, projets ou cours pertinents..."
                            : "Describe your achievements, relevant projects or courses..."
                        }
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        {language === "fr" ? "Annuler" : "Cancel"}
                      </Button>
                      <Button
                        type="button"
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={handleAddEducation}
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
                  {language === "fr" ? "Ajouter une formation" : "Add Education"}
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

