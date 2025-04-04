"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder, type Reference } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Plus, Trash2, UserCheck, Mail, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ReferencesFormProps {
  onNext: () => void
  onBack: () => void
}

export default function ReferencesForm({ onNext, onBack }: ReferencesFormProps) {
  const { language } = useLanguage()
  const { cvData, addReference, removeReference } = useCVBuilder()
  const { references } = cvData

  const [showForm, setShowForm] = useState(false)
  const [currentReference, setCurrentReference] = useState<Omit<Reference, "id">>({
    name: "",
    company: "",
    position: "",
    email: "",
    phone: "",
    relationship: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentReference((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddReference = () => {
    addReference(currentReference)
    setCurrentReference({
      name: "",
      company: "",
      position: "",
      email: "",
      phone: "",
      relationship: "",
    })
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isFormValid = () => {
    return (
      currentReference.name.trim() !== "" &&
      currentReference.position.trim() !== "" &&
      currentReference.email.trim() !== ""
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{language === "fr" ? "Références" : "References"}</h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Ajoutez des personnes qui peuvent témoigner de vos compétences et de votre expérience."
            : "Add people who can vouch for your skills and experience."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <AnimatePresence>
            {references.map((reference) => (
              <motion.div
                key={reference.id}
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
                          <UserCheck className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{reference.name}</h3>
                          <p>
                            {reference.position}, {reference.company}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:gap-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5" />
                              <span>{reference.email}</span>
                            </div>
                            {reference.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3.5 w-3.5" />
                                <span>{reference.phone}</span>
                              </div>
                            )}
                          </div>
                          {reference.relationship && (
                            <p className="text-sm mt-2">
                              <span className="text-muted-foreground">
                                {language === "fr" ? "Relation: " : "Relationship: "}
                              </span>
                              {reference.relationship}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => removeReference(reference.id)}
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
                      {language === "fr" ? "Ajouter une référence" : "Add Reference"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {language === "fr" ? "Nom complet" : "Full Name"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={currentReference.name}
                          onChange={handleChange}
                          required
                          placeholder={language === "fr" ? "Jean Dupont" : "John Doe"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">
                          {language === "fr" ? "Entreprise" : "Company"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={currentReference.company}
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
                          value={currentReference.position}
                          onChange={handleChange}
                          required
                          placeholder={language === "fr" ? "Directeur Technique" : "Technical Director"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={currentReference.email}
                          onChange={handleChange}
                          required
                          placeholder="exemple@email.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{language === "fr" ? "Téléphone" : "Phone"}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={currentReference.phone || ""}
                          onChange={handleChange}
                          placeholder="+237 694 19 34 93"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="relationship">{language === "fr" ? "Relation" : "Relationship"}</Label>
                        <Input
                          id="relationship"
                          name="relationship"
                          value={currentReference.relationship || ""}
                          onChange={handleChange}
                          placeholder={language === "fr" ? "Ancien manager" : "Former manager"}
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
                        onClick={handleAddReference}
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
                  {language === "fr" ? "Ajouter une référence" : "Add Reference"}
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

