"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Pricing() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    setIsLoggedIn(!!user)
  }, [])

  const handlePurchase = () => {
    if (!isLoggedIn) {
      router.push("/login?redirect=pricing")
    } else {
      // Handle purchase logic
      console.log("Processing purchase...")
    }
  }

  // Définir les plans avec des valeurs directes plutôt que des clés de traduction
  const plans = [
    {
      name: language === "fr" ? "Gratuit" : "Free",
      price: "0 FCFA",
      description: language === "fr" ? "Pour essayer l'application" : "To try the application",
      features: [
        language === "fr" ? "1 CV uniquement" : "1 CV only",
        language === "fr" ? "Modèle basique" : "Basic template",
        language === "fr" ? "Exportation en PDF uniquement" : "PDF export only",
      ],
      buttonText: language === "fr" ? "Commencer gratuitement" : "Start for Free",
      popular: false,
    },
    {
      name: language === "fr" ? "Jour" : "Day",
      price: "600 FCFA",
      description: language === "fr" ? "Accès complet pendant 24h" : "Full access for 24 hours",
      features: [
        language === "fr" ? "CV illimités" : "Unlimited CVs",
        language === "fr"
          ? "Tous les modèles basiques + (01) Modèle premium"
          : "All basic templates + (01) Premium template",
        language === "fr" ? "Exportation en PDF et DOCX" : "PDF and DOCX export",
      ],
      buttonText: language === "fr" ? "Acheter (1 jour)" : "Buy (1 day)",
      popular: false,
    },
    {
      name: language === "fr" ? "3 Jours" : "3 Days",
      price: "1 399 FCFA",
      description: language === "fr" ? "Accès complet pendant 3 jours" : "Full access for 3 days",
      features: [
        language === "fr" ? "CV illimités" : "Unlimited CVs",
        language === "fr" ? "Lettres de motivation" : "Cover letters",
        language === "fr" ? "Tous les modèles premium" : "All premium templates",
        language === "fr" ? "Exportation en PDF et DOCX" : "PDF and DOCX export",
        language === "fr" ? "Support prioritaire" : "Priority support",
      ],
      buttonText: language === "fr" ? "Acheter (3 jours)" : "Buy (3 days)",
      popular: true,
    },
    {
      name: language === "fr" ? "Semaine" : "Week",
      price: "3 499 FCFA",
      description: language === "fr" ? "Accès complet pendant 7 jours" : "Full access for 7 days",
      features: [
        language === "fr" ? "CV illimités" : "Unlimited CVs",
        language === "fr" ? "Lettres de motivation" : "Cover letters",
        language === "fr" ? "Tous les modèles premium" : "All premium templates",
        language === "fr" ? "Exportation en PDF et DOCX" : "PDF and DOCX export",
        language === "fr" ? "Support prioritaire" : "Priority support",
        language === "fr" ? "Conseils personnalisés" : "Personalized advice",
      ],
      buttonText: language === "fr" ? "Acheter (7 jours)" : "Buy (7 days)",
      popular: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {language === "fr" ? "Tarifs simples et transparents" : "Simple and Transparent Pricing"}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {language === "fr"
            ? "Choisissez le plan qui correspond à vos besoins"
            : "Choose the plan that fits your needs"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative rounded-xl overflow-hidden ${
              plan.popular ? "md:scale-105 md:-translate-y-2 z-10" : ""
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-700/10 backdrop-blur-sm border border-white/10 rounded-xl"></div>
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                {language === "fr" ? "Populaire" : "Popular"}
              </div>
            )}
            <div className="relative z-10 p-6">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-2xl md:text-3xl font-bold">{plan.price}</span>
                {plan.price !== "0 FCFA" && (
                  <span className="text-muted-foreground ml-1 text-sm">
                    {index === 1
                      ? language === "fr"
                        ? "/ jour"
                        : "/ day"
                      : index === 2
                        ? language === "fr"
                          ? "/ 3 jours"
                          : "/ 3 days"
                        : language === "fr"
                          ? "/ semaine"
                          : "/ week"}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-6 text-sm">{plan.description}</p>
              <Button
                className={`w-full mb-6 ${
                  plan.popular ? "bg-teal-600 hover:bg-teal-700" : "bg-muted hover:bg-muted/80"
                }`}
                onClick={handlePurchase}
              >
                {plan.buttonText}
              </Button>
              <ul className="space-y-3 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-4 w-4 text-teal-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-4">
          {language === "fr"
            ? "Besoin d'une solution sur mesure pour votre entreprise ?"
            : "Need a custom solution for your enterprise?"}
        </p>
        <Button variant="outline" size="lg">
          {language === "fr" ? "Contactez-nous" : "Contact Us"}
        </Button>
      </div>
    </div>
  )
}

