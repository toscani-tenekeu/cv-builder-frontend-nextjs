"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type CVType = "canadian" | "professional" | "student" | "creative" | "minimalist" | "technical" | "functional"

export type PersonalInfo = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  postalCode: string
  title: string
  summary: string
  profilePicture?: string
  website?: string
  linkedin?: string
  github?: string
}

export type Education = {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  description: string
}

export type Experience = {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  location: string
  description: string
}

export type Skill = {
  id: string
  name: string
  level: number // 1-5
  category?: string
}

export type Language = {
  id: string
  name: string
  proficiency: "beginner" | "intermediate" | "advanced" | "fluent" | "native"
}

export type Project = {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  current: boolean
  url?: string
  technologies?: string[]
}

export type Interest = {
  id: string
  name: string
  description?: string
}

export type Reference = {
  id: string
  name: string
  company: string
  position: string
  email: string
  phone?: string
  relationship?: string
}

// Update the CVData type to include template information
export type CVData = {
  type: CVType | null
  template: {
    id: string
    name: string
    price: number
    type: "basique" | "premium"
  } | null
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  languages: Language[]
  projects: Project[]
  interests: Interest[]
  references: Reference[]
}

// Add updateTemplate function to the context type
type CVBuilderContextType = {
  cvData: CVData
  setCVType: (type: CVType) => void
  updateTemplate: (template: CVData["template"]) => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addEducation: (education: Omit<Education, "id">) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addExperience: (experience: Omit<Experience, "id">) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addSkill: (skill: Omit<Skill, "id">) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  addLanguage: (language: Omit<Language, "id">) => void
  updateLanguage: (id: string, language: Partial<Language>) => void
  removeLanguage: (id: string) => void
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  addInterest: (interest: Omit<Interest, "id">) => void
  updateInterest: (id: string, interest: Partial<Interest>) => void
  removeInterest: (id: string) => void
  addReference: (reference: Omit<Reference, "id">) => void
  updateReference: (id: string, reference: Partial<Reference>) => void
  removeReference: (id: string) => void
}

// Update the default CVData
const defaultCVData: CVData = {
  type: null,
  template: null,
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    title: "",
    summary: "",
  },
  education: [],
  experience: [],
  skills: [],
  languages: [],
  projects: [],
  interests: [],
  references: [],
}

const CVBuilderContext = createContext<CVBuilderContextType | undefined>(undefined)

export function CVBuilderProvider({ children }: { children: ReactNode }) {
  const [cvData, setCvData] = useState<CVData>(defaultCVData)

  const setCVType = (type: CVType) => {
    setCvData((prev) => ({ ...prev, type }))
  }

  // Add the updateTemplate function implementation
  const updateTemplate = (template: CVData["template"]) => {
    setCvData((prev) => ({ ...prev, template }))
  }

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setCvData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info },
    }))
  }

  const generateId = () => Math.random().toString(36).substring(2, 9)

  // Education
  const addEducation = (education: Omit<Education, "id">) => {
    const newEducation = { ...education, id: generateId() }
    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }))
  }

  const updateEducation = (id: string, education: Partial<Education>) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...education } : item)),
    }))
  }

  const removeEducation = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }))
  }

  // Experience
  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience = { ...experience, id: generateId() }
    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }))
  }

  const updateExperience = (id: string, experience: Partial<Experience>) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, ...experience } : item)),
    }))
  }

  const removeExperience = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }))
  }

  // Skills
  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = { ...skill, id: generateId() }
    setCvData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }))
  }

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, ...skill } : item)),
    }))
  }

  const removeSkill = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }))
  }

  // Languages
  const addLanguage = (language: Omit<Language, "id">) => {
    const newLanguage = { ...language, id: generateId() }
    setCvData((prev) => ({
      ...prev,
      languages: [...prev.languages, newLanguage],
    }))
  }

  const updateLanguage = (id: string, language: Partial<Language>) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.map((item) => (item.id === id ? { ...item, ...language } : item)),
    }))
  }

  const removeLanguage = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      languages: prev.languages.filter((item) => item.id !== id),
    }))
  }

  // Projects
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: generateId() }
    setCvData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }))
  }

  const updateProject = (id: string, project: Partial<Project>) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, ...project } : item)),
    }))
  }

  const removeProject = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }))
  }

  // Interests
  const addInterest = (interest: Omit<Interest, "id">) => {
    const newInterest = { ...interest, id: generateId() }
    setCvData((prev) => ({
      ...prev,
      interests: [...prev.interests, newInterest],
    }))
  }

  const updateInterest = (id: string, interest: Partial<Interest>) => {
    setCvData((prev) => ({
      ...prev,
      interests: prev.interests.map((item) => (item.id === id ? { ...item, ...interest } : item)),
    }))
  }

  const removeInterest = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      interests: prev.interests.filter((item) => item.id !== id),
    }))
  }

  // References
  const addReference = (reference: Omit<Reference, "id">) => {
    const newReference = { ...reference, id: generateId() }
    setCvData((prev) => ({
      ...prev,
      references: [...prev.references, newReference],
    }))
  }

  const updateReference = (id: string, reference: Partial<Reference>) => {
    setCvData((prev) => ({
      ...prev,
      references: prev.references.map((item) => (item.id === id ? { ...item, ...reference } : item)),
    }))
  }

  const removeReference = (id: string) => {
    setCvData((prev) => ({
      ...prev,
      references: prev.references.filter((item) => item.id !== id),
    }))
  }

  // Add the function to the context provider value
  return (
    <CVBuilderContext.Provider
      value={{
        cvData,
        setCVType,
        updateTemplate,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addSkill,
        updateSkill,
        removeSkill,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addProject,
        updateProject,
        removeProject,
        addInterest,
        updateInterest,
        removeInterest,
        addReference,
        updateReference,
        removeReference,
      }}
    >
      {children}
    </CVBuilderContext.Provider>
  )
}

export function useCVBuilder() {
  const context = useContext(CVBuilderContext)
  if (context === undefined) {
    throw new Error("useCVBuilder must be used within a CVBuilderProvider")
  }
  return context
}

