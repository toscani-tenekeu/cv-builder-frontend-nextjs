"use client"
import { ArrowRight, FileDown, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const { language, t } = useLanguage()

  return (
    <section className="py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-700">
            {language === "fr"
              ? "Créez un CV professionnel en quelques minutes"
              : "Create a professional CV in minutes"}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground">
            {language === "fr"
              ? "CV Builder vous aide à créer un CV qui se démarque et augmente vos chances de décrocher l'emploi de vos rêves."
              : "CV Builder helps you create a standout resume that increases your chances of landing your dream job."}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/create-cv">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                {language === "fr" ? "Créer sur le site" : "Create on site"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/download">
              <Button size="lg" variant="outline">
                {language === "fr" ? "Télécharger l'application" : "Download App"} <FileDown className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
            {/* Removed the blur effect and made the background more solid */}
            <div className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl z-0"></div>
            <div className="absolute inset-0 p-6 overflow-auto">
              {/* CV Preview Content */}
              <div className="flex flex-col items-center text-center mb-4 pb-4 border-b border-teal-200 dark:border-teal-700">
                <div className="h-24 w-24 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                  SD
                </div>
                <h1 className="text-2xl font-bold">Sophie Dubois</h1>
                <p className="text-teal-600 dark:text-teal-400 font-medium">Développeuse Full Stack</p>
                <div className="flex flex-wrap justify-center gap-2 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                    sophie.dubois@email.com
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                    +237 691 23 45 67
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                    Yaoundé, Cameroun
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-1 text-teal-600 dark:text-teal-400 border-b border-teal-200 dark:border-teal-700 pb-1">
                  Résumé
                </h2>
                <p className="text-sm">
                  Développeuse Full Stack passionnée avec 5 ans d'expérience dans la création d'applications web et
                  mobiles. Expertise en React, Node.js et bases de données SQL/NoSQL.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h2 className="text-lg font-semibold mb-1 text-teal-600 dark:text-teal-400 border-b border-teal-200 dark:border-teal-700 pb-1">
                    Expérience professionnelle
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-sm font-medium">Développeuse Full Stack Senior</h3>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">TechInnovate</span>
                        <span className="text-muted-foreground">2021 - Présent</span>
                      </div>
                      <p className="text-xs mt-1">
                        Développement d'applications web avec React et Node.js. Gestion d'équipe de 5 développeurs.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Développeuse Front-end</h3>
                      <div className="flex justify-between text-xs">
                        <span className="font-medium">WebSolutions</span>
                        <span className="text-muted-foreground">2019 - 2021</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-1 text-teal-600 dark:text-teal-400 border-b border-teal-200 dark:border-teal-700 pb-1">
                    Formation
                  </h2>
                  <div>
                    <h3 className="text-sm font-medium">Master en Informatique</h3>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">Université de Yaoundé I</span>
                      <span className="text-muted-foreground">2017 - 2019</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-1 text-teal-600 dark:text-teal-400 border-b border-teal-200 dark:border-teal-700 pb-1">
                    Compétences
                  </h2>
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-100 text-xs px-2 py-1 rounded">
                      JavaScript
                    </span>
                    <span className="bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-100 text-xs px-2 py-1 rounded">
                      React
                    </span>
                    <span className="bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-100 text-xs px-2 py-1 rounded">
                      Node.js
                    </span>
                    <span className="bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-100 text-xs px-2 py-1 rounded">
                      TypeScript
                    </span>
                    <span className="bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-100 text-xs px-2 py-1 rounded">
                      MongoDB
                    </span>
                    <span className="bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-100 text-xs px-2 py-1 rounded">
                      SQL
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-1 text-teal-600 dark:text-teal-400 border-b border-teal-200 dark:border-teal-700 pb-1">
                    Langues
                  </h2>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex justify-between text-xs">
                      <span>Français</span>
                      <span className="text-muted-foreground">Langue maternelle</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Anglais</span>
                      <span className="text-muted-foreground">Courant</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark */}
              <div className="absolute bottom-4 right-4 opacity-80">
                <Badge className="bg-teal-600 text-white">CV Builder</Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

