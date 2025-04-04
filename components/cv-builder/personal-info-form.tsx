"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Upload, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PersonalInfoFormProps {
  onNext: () => void
  onBack: () => void
}

export default function PersonalInfoForm({ onNext, onBack }: PersonalInfoFormProps) {
  const { language } = useLanguage()
  const { cvData, updatePersonalInfo } = useCVBuilder()
  const { personalInfo } = cvData

  const [profileImage, setProfileImage] = useState<string | null>(personalInfo.profilePicture || null)

  // Add predefined options for common fields
  const professionalTitles = [
    "Software Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UX/UI Designer",
    "Graphic Designer",
    "Product Manager",
    "Project Manager",
    "Marketing Manager",
    "Sales Manager",
    "Customer Service Representative",
    "Data Analyst",
    "Data Scientist",
    "Business Analyst",
    "Financial Analyst",
    "Accountant",
    "Human Resources Manager",
    "Administrative Assistant",
    "Executive Assistant",
    "Operations Manager",
    "Content Writer",
    "Copywriter",
    "Social Media Manager",
    "Digital Marketing Specialist",
    "SEO Specialist",
    "Teacher",
    "Professor",
    "Researcher",
    "Consultant",
    "Développeur Logiciel",
    "Développeur Web",
    "Développeur Frontend",
    "Développeur Backend",
    "Développeur Full Stack",
    "Designer UX/UI",
    "Designer Graphique",
    "Chef de Produit",
    "Chef de Projet",
    "Responsable Marketing",
    "Responsable Commercial",
    "Représentant Service Client",
    "Analyste de Données",
    "Data Scientist",
    "Analyste d'Affaires",
    "Analyste Financier",
    "Comptable",
    "Responsable Ressources Humaines",
    "Assistant Administratif",
    "Assistant de Direction",
    "Responsable des Opérations",
    "Rédacteur de Contenu",
    "Copywriter",
    "Responsable Médias Sociaux",
    "Spécialiste Marketing Digital",
    "Spécialiste SEO",
    "Enseignant",
    "Professeur",
    "Chercheur",
    "Consultant",
  ]

  const countries = [
    { code: "CM", name: { fr: "Cameroun", en: "Cameroon" } },
    { code: "CA", name: { fr: "Canada", en: "Canada" } },
    { code: "FR", name: { fr: "France", en: "France" } },
    { code: "US", name: { fr: "États-Unis", en: "United States" } },
    { code: "GB", name: { fr: "Royaume-Uni", en: "United Kingdom" } },
    { code: "DE", name: { fr: "Allemagne", en: "Germany" } },
    { code: "JP", name: { fr: "Japon", en: "Japan" } },
    { code: "CN", name: { fr: "Chine", en: "China" } },
    { code: "AU", name: { fr: "Australie", en: "Australia" } },
    { code: "BR", name: { fr: "Brésil", en: "Brazil" } },
    { code: "IN", name: { fr: "Inde", en: "India" } },
    { code: "RU", name: { fr: "Russie", en: "Russia" } },
    { code: "ZA", name: { fr: "Afrique du Sud", en: "South Africa" } },
    { code: "MX", name: { fr: "Mexique", en: "Mexico" } },
    { code: "IT", name: { fr: "Italie", en: "Italy" } },
    { code: "ES", name: { fr: "Espagne", en: "Spain" } },
    { code: "NL", name: { fr: "Pays-Bas", en: "Netherlands" } },
    { code: "SE", name: { fr: "Suède", en: "Sweden" } },
    { code: "CH", name: { fr: "Suisse", en: "Switzerland" } },
    { code: "BE", name: { fr: "Belgique", en: "Belgium" } },
  ]

  // Add cities for Cameroon
  const cameroonCities = [
    "Yaoundé",
    "Douala",
    "Garoua",
    "Bamenda",
    "Maroua",
    "Nkongsamba",
    "Bafoussam",
    "Ngaoundéré",
    "Bertoua",
    "Loum",
    "Kumba",
    "Edéa",
    "Kumbo",
    "Foumban",
    "Mbouda",
    "Dschang",
    "Limbé",
    "Ebolowa",
    "Kousséri",
    "Guider",
    "Meiganga",
    "Yagoua",
    "Mbalmayo",
    "Bafang",
    "Tiko",
    "Bafia",
    "Wum",
    "Kribi",
    "Buea",
    "Sangmélima",
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setProfileImage(imageUrl)
        updatePersonalInfo({ profilePicture: imageUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updatePersonalInfo({ [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const isFormValid = () => {
    return (
      personalInfo.firstName.trim() !== "" &&
      personalInfo.lastName.trim() !== "" &&
      personalInfo.email.trim() !== "" &&
      personalInfo.phone.trim() !== ""
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {language === "fr" ? "Informations personnelles" : "Personal Information"}
        </h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Partagez vos coordonnées et informations de base pour votre CV."
            : "Share your contact details and basic information for your resume."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col items-center mb-6">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-2 border-border">
              <AvatarImage src={profileImage || ""} alt="Profile" />
              <AvatarFallback className="bg-muted text-4xl">
                <User className="h-12 w-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="profile-image"
              className="absolute inset-0 flex items-center justify-center bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Upload className="h-6 w-6" />
            </label>
            <input id="profile-image" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {language === "fr" ? "Cliquez pour ajouter une photo" : "Click to add a photo"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              {language === "fr" ? "Prénom" : "First Name"} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={personalInfo.firstName}
              onChange={handleChange}
              required
              placeholder={language === "fr" ? "Jean" : "John"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              {language === "fr" ? "Nom" : "Last Name"} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={personalInfo.lastName}
              onChange={handleChange}
              required
              placeholder={language === "fr" ? "Dupont" : "Doe"}
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
              value={personalInfo.email}
              onChange={handleChange}
              required
              placeholder="exemple@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              {language === "fr" ? "Téléphone" : "Phone"} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              required
              placeholder="+237 694 19 34 93"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">
              {language === "fr" ? "Titre professionnel" : "Professional Title"} <span className="text-red-500">*</span>
            </Label>
            <Select value={personalInfo.title} onValueChange={(value) => updatePersonalInfo({ title: value })}>
              <SelectTrigger id="title">
                <SelectValue placeholder={language === "fr" ? "Sélectionnez un titre" : "Select a title"} />
              </SelectTrigger>
              <SelectContent>
                {professionalTitles.map((title) => (
                  <SelectItem key={title} value={title}>
                    {title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">{language === "fr" ? "Site Web" : "Website"}</Label>
            <Input
              id="website"
              name="website"
              value={personalInfo.website || ""}
              onChange={handleChange}
              placeholder="https://monsite.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              name="linkedin"
              value={personalInfo.linkedin || ""}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              name="github"
              value={personalInfo.github || ""}
              onChange={handleChange}
              placeholder="https://github.com/username"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">{language === "fr" ? "Adresse" : "Address"}</Label>
          <Input
            id="address"
            name="address"
            value={personalInfo.address}
            onChange={handleChange}
            placeholder={language === "fr" ? "123 Rue Principale" : "123 Main Street"}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">{language === "fr" ? "Ville" : "City"}</Label>
            {personalInfo.country === "Cameroun" || personalInfo.country === "Cameroon" ? (
              <Select value={personalInfo.city} onValueChange={(value) => updatePersonalInfo({ city: value })}>
                <SelectTrigger id="city">
                  <SelectValue placeholder={language === "fr" ? "Sélectionnez une ville" : "Select a city"} />
                </SelectTrigger>
                <SelectContent>
                  {cameroonCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="city"
                name="city"
                value={personalInfo.city}
                onChange={handleChange}
                placeholder={language === "fr" ? "Yaoundé" : "New York"}
              />
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">{language === "fr" ? "Pays" : "Country"}</Label>
            <Select value={personalInfo.country} onValueChange={(value) => updatePersonalInfo({ country: value })}>
              <SelectTrigger id="country">
                <SelectValue placeholder={language === "fr" ? "Sélectionnez un pays" : "Select a country"} />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.name[language === "fr" ? "fr" : "en"]}>
                    {country.name[language === "fr" ? "fr" : "en"]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">{language === "fr" ? "Code Postal" : "Postal Code"}</Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={personalInfo.postalCode}
              onChange={handleChange}
              placeholder={language === "fr" ? "237" : "10001"}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">{language === "fr" ? "Résumé professionnel" : "Professional Summary"}</Label>
          <Textarea
            id="summary"
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            placeholder={
              language === "fr"
                ? "Bref aperçu de votre parcours et de vos objectifs professionnels..."
                : "Brief overview of your background and professional goals..."
            }
            rows={4}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {language === "fr" ? "Retour" : "Back"}
          </Button>
          <Button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
            disabled={!isFormValid()}
          >
            {language === "fr" ? "Continuer" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

