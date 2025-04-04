"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder, type Project } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Plus, Trash2, FolderKanban, Calendar, LinkIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface ProjectsFormProps {
  onNext: () => void
  onBack: () => void
}

export default function ProjectsForm({ onNext, onBack }: ProjectsFormProps) {
  const { language } = useLanguage()
  const { cvData, addProject, removeProject } = useCVBuilder()
  const { projects } = cvData

  const [showForm, setShowForm] = useState(false)
  const [currentProject, setCurrentProject] = useState<Omit<Project, "id">>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    current: false,
    url: "",
    technologies: [],
  })
  const [techInput, setTechInput] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setCurrentProject((prev) => ({ ...prev, current: checked }))
  }

  const handleTechInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechInput(e.target.value)
  }

  const handleTechInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim() !== "") {
      e.preventDefault()
      addTechnology()
    }
  }

  const addTechnology = () => {
    if (techInput.trim() === "") return

    setCurrentProject((prev) => ({
      ...prev,
      technologies: [...(prev.technologies || []), techInput.trim()],
    }))
    setTechInput("")
  }

  const removeTechnology = (tech: string) => {
    setCurrentProject((prev) => ({
      ...prev,
      technologies: prev.technologies?.filter((t) => t !== tech) || [],
    }))
  }

  const handleAddProject = () => {
    addProject(currentProject)
    setCurrentProject({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      current: false,
      url: "",
      technologies: [],
    })
    setShowForm(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isFormValid = () => {
    return currentProject.name.trim() !== "" && currentProject.startDate.trim() !== ""
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{language === "fr" ? "Projets" : "Projects"}</h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Ajoutez vos projets personnels ou professionnels pour mettre en valeur vos réalisations."
            : "Add your personal or professional projects to showcase your achievements."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
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
                          <FolderKanban className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>
                              {project.startDate} -{" "}
                              {project.current ? (language === "fr" ? "Présent" : "Present") : project.endDate}
                            </span>
                          </div>
                          {project.url && (
                            <div className="flex items-center text-sm text-teal-600 mt-1">
                              <LinkIcon className="h-3.5 w-3.5 mr-1" />
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {project.url}
                              </a>
                            </div>
                          )}
                          {project.description && <p className="mt-2 text-sm">{project.description}</p>}
                          {project.technologies && project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                        onClick={() => removeProject(project.id)}
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
                      {language === "fr" ? "Ajouter un projet" : "Add Project"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          {language === "fr" ? "Nom du projet" : "Project Name"} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={currentProject.name}
                          onChange={handleChange}
                          required
                          placeholder={language === "fr" ? "Portfolio personnel" : "Personal Portfolio"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="url">{language === "fr" ? "URL du projet" : "Project URL"}</Label>
                        <Input
                          id="url"
                          name="url"
                          value={currentProject.url || ""}
                          onChange={handleChange}
                          placeholder="https://github.com/username/project"
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
                          value={currentProject.startDate}
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
                              checked={currentProject.current}
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
                          value={currentProject.endDate}
                          onChange={handleChange}
                          disabled={currentProject.current}
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-6">
                      <Label htmlFor="description">{language === "fr" ? "Description" : "Description"}</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={currentProject.description}
                        onChange={handleChange}
                        placeholder={
                          language === "fr"
                            ? "Décrivez votre projet, ses objectifs et vos contributions..."
                            : "Describe your project, its goals, and your contributions..."
                        }
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2 mt-6">
                      <Label htmlFor="technologies">
                        {language === "fr" ? "Technologies utilisées" : "Technologies Used"}
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="technologies"
                          value={techInput}
                          onChange={handleTechInputChange}
                          onKeyDown={handleTechInputKeyDown}
                          placeholder={language === "fr" ? "React, Node.js, etc." : "React, Node.js, etc."}
                        />
                        <Button type="button" onClick={addTechnology} variant="outline">
                          {language === "fr" ? "Ajouter" : "Add"}
                        </Button>
                      </div>
                      {currentProject.technologies && currentProject.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {currentProject.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1 py-1 px-2">
                              {tech}
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-foreground"
                                onClick={() => removeTechnology(tech)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        {language === "fr" ? "Annuler" : "Cancel"}
                      </Button>
                      <Button
                        type="button"
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={handleAddProject}
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
                  {language === "fr" ? "Ajouter un projet" : "Add Project"}
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

