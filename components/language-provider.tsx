"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "en"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  fr: {
    "nav.home": "Accueil",
    "nav.features": "Fonctionnalités",
    "nav.pricing": "Tarifs",
    "nav.download": "Télécharger",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",

    "hero.title": "Créez un CV professionnel en quelques minutes",
    "hero.subtitle":
      "CV Builder vous aide à créer un CV qui se démarque et augmente vos chances de décrocher l'emploi de vos rêves.",
    "hero.getStarted": "Commencer",
    "hero.download": "Télécharger l'application",

    "features.title": "Fonctionnalités exceptionnelles",
    "features.subtitle": "Des outils puissants pour créer un CV parfait",
    "features.feature1.title": "Modèles professionnels",
    "features.feature1.description": "Choisissez parmi une variété de modèles conçus par des experts en recrutement.",
    "features.feature2.title": "Éditeur intuitif",
    "features.feature2.description": "Interface simple et intuitive pour créer et modifier votre CV facilement.",
    "features.feature3.title": "Analyse ATS",
    "features.feature3.description": "Optimisez votre CV pour les systèmes de suivi des candidatures (ATS).",

    "testimonials.title": "Ce que disent nos utilisateurs",
    "testimonials.subtitle": "Découvrez comment CV Builder a aidé des milliers de personnes à trouver un emploi",
    "testimonials.testimonial1.name": "Marie Dupont",
    "testimonials.testimonial1.position": "Designer Graphique",
    "testimonials.testimonial1.initials": "MD",
    "testimonials.testimonial1.quote":
      "Grâce à CV Builder, j'ai pu créer un CV qui reflète parfaitement mes compétences. J'ai décroché un entretien en moins d'une semaine !",
    "testimonials.testimonial2.name": "Jean Martin",
    "testimonials.testimonial2.position": "Développeur Web",
    "testimonials.testimonial2.initials": "JM",
    "testimonials.testimonial2.quote":
      "L'interface est intuitive et les modèles sont vraiment professionnels. CV Builder m'a fait gagner beaucoup de temps.",

    "cta.title": "Prêt à booster votre carrière ?",
    "cta.subtitle": "Rejoignez des milliers d'utilisateurs satisfaits et créez un CV qui vous démarque.",
    "cta.getStarted": "Commencer maintenant",
    "cta.viewPricing": "Voir les tarifs",

    "pricing.title": "Tarifs simples et transparents",
    "pricing.subtitle": "Choisissez le plan qui correspond à vos besoins",
    "pricing.popular": "Populaire",
    "pricing.perDay": "/ jour",
    "pricing.perWeek": "/ semaine",
    "pricing.perMonth": "/ mois",

    "pricing.free.name": "Gratuit",
    "pricing.free.price": "0 FCFA",
    "pricing.free.description": "Pour essayer l'application",
    "pricing.free.feature1": "1 CV uniquement",
    "pricing.free.feature2": "Modèle basique",
    "pricing.free.feature3": "Exportation en PDF uniquement",
    "pricing.free.button": "Commencer gratuitement",

    "pricing.daily.name": "Jour",
    "pricing.daily.price": "600 FCFA",
    "pricing.daily.description": "Accès complet pendant 24h",
    "pricing.daily.feature1": "CV illimités",
    "pricing.daily.feature2": "Lettres de motivation",
    "pricing.daily.feature3": "Tous les modèles basiques + (01) Modèle premium",
    "pricing.daily.feature4": "Exportation en PDF et DOCX",
    "pricing.daily.button": "Acheter (1 jour)",

    "pricing.weekly.name": "3 Jours",
    "pricing.weekly.price": "1 399 FCFA",
    "pricing.weekly.description": "Accès complet pendant 3 jours",
    "pricing.weekly.feature1": "CV illimités",
    "pricing.weekly.feature2": "Lettres de motivation",
    "pricing.weekly.feature3": "Tous les modèles premium",
    "pricing.weekly.feature4": "Exportation en PDF et DOCX",
    "pricing.weekly.feature5": "Support prioritaire",
    "pricing.weekly.button": "Acheter (3 jours)",

    "pricing.monthly.name": "Semaine",
    "pricing.monthly.price": "3 499 FCFA",
    "pricing.monthly.description": "Accès complet pendant 7 jours",
    "pricing.monthly.feature1": "CV illimités",
    "pricing.monthly.feature2": "Lettres de motivation",
    "pricing.monthly.feature3": "Tous les modèles premium",
    "pricing.monthly.feature4": "Exportation en PDF et DOCX",
    "pricing.monthly.feature5": "Support prioritaire",
    "pricing.monthly.feature6": "Conseils personnalisés",
    "pricing.monthly.button": "Acheter (7 jours)",

    "pricing.contact.text": "Besoin d'une solution sur mesure pour votre entreprise ?",
    "pricing.contact.button": "Contactez-nous",

    "download.title": "Téléchargez CV Builder",
    "download.subtitle": "Disponible sur Android et iOS",
    "download.latestVersion": "Dernière version",
    "download.downloadApk": "Télécharger l'APK",
    "download.appStore": "App Store",
    "download.history": "Historique",
    "download.downloadVersion": "Télécharger",
    "download.versions.v250.feature1": "Nouveau design de l'interface utilisateur",
    "download.versions.v250.feature2": "Amélioration de l'analyse ATS",
    "download.versions.v250.feature3": "Nouveaux modèles premium",
    "download.versions.v240.feature1": "Support pour les langues supplémentaires",
    "download.versions.v240.feature2": "Correction de bugs et améliorations de performance",
    "download.versions.v230.feature1": "Ajout de l'exportation en format DOCX",
    "download.versions.v230.feature2": "Nouvelles options de personnalisation",
    "download.versions.v230.feature3": "Amélioration de la synchronisation cloud",

    "footer.company": "Entreprise",
    "footer.about": "À propos",
    "footer.faq": "FAQ",
    "footer.legal": "Légal",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions d'utilisation",
    "footer.cookies": "Politique de cookies",
    "footer.contact": "Contact",
    "footer.contactText": "Des questions ou des suggestions ? N'hésitez pas à nous contacter.",
    "footer.contactUs": "Contactez-nous",
    "footer.rights": "Tous droits réservés.",

    // Traductions pour les pages d'authentification
    "auth.login.title": "Connexion",
    "auth.login.subtitle": "Entrez vos identifiants pour accéder à votre compte",
    "auth.login.email": "Email",
    "auth.login.password": "Mot de passe",
    "auth.login.forgotPassword": "Mot de passe oublié?",
    "auth.login.button": "Se connecter",
    "auth.login.loading": "Connexion en cours...",
    "auth.login.noAccount": "Vous n'avez pas de compte?",
    "auth.login.signUp": "S'inscrire",
    "auth.login.continueWith": "Ou continuer avec",
    "auth.login.error.required": "Veuillez remplir tous les champs",

    "auth.register.title": "Créer un compte",
    "auth.register.subtitle": "Entrez vos informations pour créer un compte",
    "auth.register.fullName": "Nom complet",
    "auth.register.email": "Email",
    "auth.register.phone": "Téléphone",
    "auth.register.password": "Mot de passe",
    "auth.register.confirmPassword": "Confirmer le mot de passe",
    "auth.register.button": "Créer un compte",
    "auth.register.loading": "Création en cours...",
    "auth.register.hasAccount": "Vous avez déjà un compte?",
    "auth.register.login": "Se connecter",
    "auth.register.continueWith": "Ou continuer avec",
    "auth.register.verificationNote": "Un code de vérification sera envoyé à cette adresse",
    "auth.register.phoneVerificationNote": "Un code de vérification sera envoyé à ce numéro",
    "auth.register.error.required": "Ce champ est requis",
    "auth.register.error.email": "Format d'email invalide",
    "auth.register.error.phone": "Format de téléphone invalide",
    "auth.register.error.password": "Le mot de passe doit contenir au moins 6 caractères",
    "auth.register.error.passwordMatch": "Les mots de passe ne correspondent pas",

    "auth.verify.title": "Vérification",
    "auth.verify.subtitle": "Entrez le code à 6 chiffres envoyé à votre",
    "auth.verify.email": "Email",
    "auth.verify.phone": "téléphone",
    "auth.verify.button": "Vérifier",
    "auth.verify.loading": "Vérification...",
    "auth.verify.resend": "Vous n'avez pas reçu le code? Réessayez dans",
    "auth.verify.resendButton": "Renvoyer le code",
    "auth.verify.error": "Code de vérification incorrect",
    "auth.verify.errorComplete": "Veuillez entrer le code complet à 6 chiffres",

    "user.profile": "Mon profil",
    "user.cvs": "Mes CV",
    "user.settings": "Paramètres",
    "user.logout": "Déconnexion",
  },
  en: {
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.download": "Download",
    "nav.login": "Login",
    "nav.signup": "Sign Up",

    "hero.title": "Create a professional CV in minutes",
    "hero.subtitle":
      "CV Builder helps you create a standout resume that increases your chances of landing your dream job.",
    "hero.getStarted": "Get Started",
    "hero.download": "Download App",

    "features.title": "Outstanding Features",
    "features.subtitle": "Powerful tools to create the perfect resume",
    "features.feature1.title": "Professional Templates",
    "features.feature1.description": "Choose from a variety of templates designed by recruitment experts.",
    "features.feature2.title": "Intuitive Editor",
    "features.feature2.description": "Simple and intuitive interface to create and edit your CV easily.",
    "features.feature3.title": "ATS Analysis",
    "features.feature3.description": "Optimize your resume for Applicant Tracking Systems (ATS).",

    "testimonials.title": "What Our Users Say",
    "testimonials.subtitle": "Discover how CV Builder has helped thousands of people find employment",
    "testimonials.testimonial1.name": "Mary Smith",
    "testimonials.testimonial1.position": "Graphic Designer",
    "testimonials.testimonial1.initials": "MS",
    "testimonials.testimonial1.quote":
      "Thanks to CV Builder, I was able to create a resume that perfectly reflects my skills. I landed an interview in less than a week!",
    "testimonials.testimonial2.name": "John Davis",
    "testimonials.testimonial2.position": "Web Developer",
    "testimonials.testimonial2.initials": "JD",
    "testimonials.testimonial2.quote":
      "The interface is intuitive and the templates are truly professional. CV Builder saved me a lot of time.",

    "cta.title": "Ready to boost your career?",
    "cta.subtitle": "Join thousands of satisfied users and create a resume that stands out.",
    "cta.getStarted": "Get Started Now",
    "cta.viewPricing": "View Pricing",

    "pricing.title": "Simple and Transparent Pricing",
    "pricing.subtitle": "Choose the plan that fits your needs",
    "pricing.popular": "Popular",
    "pricing.perDay": "/ day",
    "pricing.perWeek": "/ week",
    "pricing.perMonth": "/ month",

    "pricing.free.name": "Free",
    "pricing.free.price": "0 FCFA",
    "pricing.free.description": "To try the application",
    "pricing.free.feature1": "1 CV only",
    "pricing.free.feature2": "Basic template",
    "pricing.free.feature3": "PDF export only",
    "pricing.free.button": "Start for Free",

    "pricing.daily.name": "Day",
    "pricing.daily.price": "600 FCFA",
    "pricing.daily.description": "Full access for 24 hours",
    "pricing.daily.feature1": "Unlimited CVs",
    "pricing.daily.feature2": "Cover letters",
    "pricing.daily.feature3": "All basic templates + (01) Premium template",
    "pricing.daily.feature4": "PDF and DOCX export",
    "pricing.daily.button": "Buy (1 day)",

    "pricing.weekly.name": "3 Days",
    "pricing.weekly.price": "1,399 FCFA",
    "pricing.weekly.description": "Full access for 3 days",
    "pricing.weekly.feature1": "Unlimited CVs",
    "pricing.weekly.feature2": "Cover letters",
    "pricing.weekly.feature3": "All premium templates",
    "pricing.weekly.feature4": "PDF and DOCX export",
    "pricing.weekly.feature5": "Priority support",
    "pricing.weekly.button": "Buy (3 days)",

    "pricing.monthly.name": "Week",
    "pricing.monthly.price": "3,499 FCFA",
    "pricing.monthly.description": "Full access for 7 days",
    "pricing.monthly.feature1": "Unlimited CVs",
    "pricing.monthly.feature2": "Cover letters",
    "pricing.monthly.feature3": "All premium templates",
    "pricing.monthly.feature4": "PDF and DOCX export",
    "pricing.monthly.feature5": "Priority support",
    "pricing.monthly.feature6": "Personalized advice",
    "pricing.monthly.button": "Buy (7 days)",

    "pricing.contact.text": "Need a custom solution for your enterprise?",
    "pricing.contact.button": "Contact Us",

    "download.title": "Download CV Builder",
    "download.subtitle": "Available on Android and iOS",
    "download.latestVersion": "Latest version",
    "download.downloadApk": "Download APK",
    "download.appStore": "App Store",
    "download.history": "History",
    "download.downloadVersion": "Download",
    "download.versions.v250.feature1": "New UI design",
    "download.versions.v250.feature2": "Improved ATS analysis",
    "download.versions.v250.feature3": "New premium templates",
    "download.versions.v240.feature1": "Support for additional languages",
    "download.versions.v240.feature2": "Bug fixes and performance improvements",
    "download.versions.v230.feature1": "Added DOCX export",
    "download.versions.v230.feature2": "New customization options",
    "download.versions.v230.feature3": "Improved cloud synchronization",

    "footer.company": "Company",
    "footer.about": "About Us",
    "footer.faq": "FAQ",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.cookies": "Cookie Policy",
    "footer.contact": "Contact",
    "footer.contactText": "Questions or suggestions? Feel free to reach out to us.",
    "footer.contactUs": "Contact Us",
    "footer.rights": "All rights reserved.",

    // Authentication page translations
    "auth.login.title": "Login",
    "auth.login.subtitle": "Enter your credentials to access your account",
    "auth.login.email": "Email",
    "auth.login.password": "Password",
    "auth.login.forgotPassword": "Forgot password?",
    "auth.login.button": "Login",
    "auth.login.loading": "Logging in...",
    "auth.login.noAccount": "Don't have an account?",
    "auth.login.signUp": "Sign up",
    "auth.login.continueWith": "Or continue with",
    "auth.login.error.required": "Please fill in all fields",

    "auth.register.title": "Create an account",
    "auth.register.subtitle": "Enter your information to create an account",
    "auth.register.fullName": "Full name",
    "auth.register.email": "Email",
    "auth.register.phone": "Phone",
    "auth.register.password": "Password",
    "auth.register.confirmPassword": "Confirm password",
    "auth.register.button": "Create account",
    "auth.register.loading": "Creating account...",
    "auth.register.hasAccount": "Already have an account?",
    "auth.register.login": "Login",
    "auth.register.continueWith": "Or continue with",
    "auth.register.verificationNote": "A verification code will be sent to this address",
    "auth.register.phoneVerificationNote": "A verification code will be sent to this number",
    "auth.register.error.required": "This field is required",
    "auth.register.error.email": "Invalid email format",
    "auth.register.error.phone": "Invalid phone format",
    "auth.register.error.password": "Password must be at least 6 characters",
    "auth.register.error.passwordMatch": "Passwords do not match",

    "auth.verify.title": "Verification",
    "auth.verify.subtitle": "Enter the 6-digit code sent to your",
    "auth.verify.email": "Email",
    "auth.verify.phone": "phone",
    "auth.verify.button": "Verify",
    "auth.verify.loading": "Verifying...",
    "auth.verify.resend": "Didn't receive the code? Try again in",
    "auth.verify.resendButton": "Resend code",
    "auth.verify.error": "Incorrect verification code",
    "auth.verify.errorComplete": "Please enter the complete 6-digit code",

    "user.profile": "My profile",
    "user.cvs": "My CVs",
    "user.settings": "Settings",
    "user.logout": "Logout",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

