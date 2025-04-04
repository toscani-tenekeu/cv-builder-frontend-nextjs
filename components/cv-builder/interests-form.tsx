"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder, type Interest } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Plus, Trash2, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface InterestsFormProps {
  onNext: () => void
  onBack: () => void
}

export default function InterestsForm({ onNext, onBack }: InterestsFormProps) {
  const { language } = useLanguage()
  const { cvData, addInterest, removeInterest } = useCVBuilder()
  const { interests } = cvData

  const [showForm, setShowForm] = useState(false)
  const [currentInterest, setCurrentInterest] = useState<Omit<Interest, "id">>({
    name: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentInterest((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddInterest = () => {
    addInterest(currentInterest)
    setCurrentInterest({
      name: "",
      description: "",
    })
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isFormValid = () => {
    return currentInterest.name.trim() !== ""
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{language === "fr" ? "Centres d'intérêt" : "Interests"}</h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Ajoutez vos centres d'intérêt et hobbies pour donner une touche personnelle à votre CV."
            : "Add your interests and hobbies to give a personal touch to your resume."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <AnimatePresence>
            {interests.map((interest) => (
              <motion.div
                key={interest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="mt-1">
                          <Heart className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{interest.name}</h3>
                          {interest.description && (
                            <p className="text-sm text-muted-foreground mt-1">{interest.description}</p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => removeInterest(interest.id)}
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
                      {language === "fr" ? "Ajouter un centre d'intérêt" : "Add Interest"}
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {language === "fr" ? "Centre d'intérêt" : "Interest"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={currentInterest.name}
                          onChange={handleChange}
                          required
                          placeholder={language === "fr" ? "Photographie" : "Photography"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">{language === "fr" ? "Description" : "Description"}</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={currentInterest.description || ""}
                          onChange={handleChange}
                          placeholder={
                            language === "fr"
                              ? "Décrivez brièvement votre intérêt..."
                              : "Briefly describe your interest..."
                          }
                          rows={3}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        {language === "fr" ? "Annuler" : "Cancel"}
                      </Button>
                      <Button
                        type="button"
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={handleAddInterest}
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
                  {language === "fr" ? "Ajouter un centre d'intérêt" : "Add Interest"}
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

