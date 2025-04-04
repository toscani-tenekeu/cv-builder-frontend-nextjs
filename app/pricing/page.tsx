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
      name: language === "fr" ? "Demo" : "Demo",
      price: "499 FCFA",
      description:
        language === "fr"
          ? "Pour essayer l'application (non recommandé pour les projets sérieux)"
          : "To try the application (not recommended for serious projects)",
      features: [
        language === "fr" ? "1 CV uniquement" : "1 CV only",
        language === "fr" ? "Modèle basique (01)" : "Basic template (01)",
        language === "fr" ? "Exportation en PDF uniquement" : "PDF export only",
      ],
      buttonText: language === "fr" ? "Commencer" : "Start demo",
      popular: false,
      color: "",
    },
    {
      name: language === "fr" ? "Basique" : "Basic",
      price: "799 FCFA",
      description: language === "fr" ? "Accès complet pendant 24h" : "Full access for 24 hours",
      features: [
        language === "fr" ? "Retoutche illimités (pendant 24h)" : "Unlimited editing CVs (for 24h)",
        language === "fr"
          ? "Tous les modèles basiques + (01) Modèle premium"
          : "All basic templates + (01) Premium template",
        language === "fr" ? "Exportation en PDF et PNG (HD)" : "PDF and (HD) PNG export",
      ],
      buttonText: language === "fr" ? "Acheter (1 jour)" : "Buy (1 day)",
      popular: false,
      color: "",
    },
    {
      name: language === "fr" ? "Premium" : "Premium",
      price: "1 399 FCFA",
      description: language === "fr" ? "Accès complet pendant 24h" : "Full access for 24 hours",
      features: [
        language === "fr" ? "Retouche illimités (pendant 24h)" : "Unlimited Editing CVs (for 24h)",
        language === "fr" ? "Lettre de motivation gratuite (01)" : "Free cover letter (01)",
        language === "fr" ? "Tous les modèles premium" : "All premium templates",
        language === "fr" ? "Exportation en PDF, PNG and DOCX" : "PDF, PNG and DOCX export",
        language === "fr" ? "Accès basique à Tosca AI" : "Basic access to Tosca AI",
        language === "fr" ? "Création plus automatique" : "Enhanced automatic creation",
        language === "fr" ? "Support prioritaire" : "Priority support",
      ],
      buttonText: language === "fr" ? "Acheter (1 jour)" : "Buy (1 day)",
      popular: true,
      color: "bg-teal-600 hover:bg-teal-700",
    },
    {
      name: language === "fr" ? "Gold" : "Gold",
      price: "3 499 FCFA",
      description: language === "fr" ? "Accès complet pendant 24h" : "Full access for 24 hours",
      features: [
        language === "fr" ? "Toutes les fonctionnalités du plan Premium" : "All features from the Premium plan",
        language === "fr"
          ? "Création avancée via lien, document ou image contenant vos informations"
          : "Advanced creation from links, documents or images containing your information",
        language === "fr" ? "Lettre de motivation (tous les modèles)" : "Cover letter (all templates)",
        language === "fr" ? "Accès complet à Tosca AI" : "Full access to Tosca AI",
        language === "fr"
          ? "Lien de partage sécurisé pour collaborer sur vos CV"
          : "Secure sharing links to collaborate on your CVs",
        language === "fr"
          ? "Exportation avancée (PDF, DOCX, SVG, PNG)"
          : "Advanced export formats (PDF, DOCX, SVG, PNG)",
        language === "fr" ? "Portfolio CV en ligne (HTML + CSS)" : "Online CV portfolio (HTML + CSS)",
        language === "fr" ? "Support prioritaire 24/7" : "24/7 priority support",
        language === "fr" ? "Conseils personnalisés d'experts" : "Personalized expert advice",
      ],
      buttonText: language === "fr" ? "Acheter (1 jour)" : "Buy (1 day)",
      popular: false,
      color: "bg-amber-600 hover:bg-amber-700",
    },
    {
      name: language === "fr" ? "Gold PRO MAX" : "Gold PRO MAX",
      price: "19 499 FCFA",
      description: language === "fr" ? "Accès complet pendant 1 an" : "Full access for 1 year",
      features: [
        language === "fr" ? "Toutes les fonctionnalités du plan Gold" : "All features from the Gold plan",
        language === "fr"
          ? "Création avancée via lien, document ou image contenant vos informations"
          : "Advanced creation from links, documents or images containing your information",
        language === "fr" ? "Lettre de motivation (tous les modèles)" : "Cover letter (all templates)",
        language === "fr" ? "Accès complet à Tosca AI" : "Full access to Tosca AI",
        language === "fr"
          ? "Lien de partage sécurisé pour collaborer sur vos CV"
          : "Secure sharing links to collaborate on your CVs",
        language === "fr" ? "Exportation avancée (PDF, DOCX, SVG)" : "Advanced export formats (PDF, DOCX, SVG)",
        language === "fr" ? "Portfolio CV en ligne (HTML + CSS)" : "Online CV portfolio (HTML + CSS)",
        language === "fr" ? "Support prioritaire 24/7" : "24/7 priority support",
        language === "fr" ? "Conseils personnalisés d'experts" : "Personalized expert advice",
        language === "fr" ? "Mises à jour gratuites pendant 1 an" : "Free updates for 1 year",
      ],
      buttonText: language === "fr" ? "Acheter (1 an)" : "Buy (1 year)",
      popular: false,
      color: "bg-gradient-to-r from-yellow-500 to-amber-700 hover:from-yellow-600 hover:to-amber-800",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
            {index === 4 && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-amber-700 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                {language === "fr" ? "Meilleure valeur" : "Best Value"}
              </div>
            )}
            <div className="relative z-10 p-6">
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-2xl md:text-3xl font-bold">{plan.price}</span>
                {plan.price !== "0 FCFA" && (
                  <span className="text-muted-foreground ml-1 text-sm">
                    {index === 4 ? (language === "fr" ? "/ an" : "/ year") : language === "fr" ? "/ jour" : "/ day"}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-6 text-sm">{plan.description}</p>
              <Button
                className={`w-full mb-6 ${
                  plan.popular ? "bg-teal-600 hover:bg-teal-700" : plan.color || "bg-muted hover:bg-muted/80"
                }`}
                onClick={handlePurchase}
              >
                {plan.buttonText}
              </Button>
              <ul className="space-y-3 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check
                      className={`h-4 w-4 ${index === 4 ? "text-yellow-500" : "text-teal-500"} mr-2 shrink-0 mt-0.5`}
                    />
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

