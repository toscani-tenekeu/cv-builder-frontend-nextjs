"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FileText, CheckCircle, Zap } from "lucide-react"

export default function Loading() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initialisation...")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const texts = [
      "Initialisation...",
      "Chargement des modèles...",
      "Préparation des templates...",
      "Presque prêt...",
      "Finalisation...",
    ]

    let interval: NodeJS.Timeout
    let textIndex = 0

    // Simulate loading progress
    interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15

        // Update loading text at certain progress points
        if (newProgress > 20 && textIndex === 0) {
          setLoadingText(texts[1])
          textIndex = 1
        } else if (newProgress > 40 && textIndex === 1) {
          setLoadingText(texts[2])
          textIndex = 2
        } else if (newProgress > 70 && textIndex === 2) {
          setLoadingText(texts[3])
          textIndex = 3
        } else if (newProgress > 90 && textIndex === 3) {
          setLoadingText(texts[4])
          textIndex = 4
        }

        // Complete loading
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          return 100
        }

        return newProgress
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <motion.div
        className="max-w-md w-full px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className="flex justify-center mb-8" variants={itemVariants}>
          <div className="relative">
            <motion.div
              className="h-32 w-32 rounded-full border-4 border-teal-600 flex items-center justify-center"
              animate={{
                rotate: isComplete ? 0 : 360,
                borderColor: isComplete ? "#10b981" : "#2d6e6e",
              }}
              transition={{
                duration: 2,
                repeat: isComplete ? 0 : Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {isComplete ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <FileText className="h-16 w-16 text-teal-600" />
              )}
            </motion.div>

            <motion.div
              className="absolute -top-2 -right-2"
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [0, 20, 0],
              }}
              transition={{
                delay: 0.5,
                duration: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            >
              <Zap className="h-8 w-8 text-yellow-500 drop-shadow-md" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1 className="text-2xl font-bold text-center mb-2" variants={itemVariants}>
          {isComplete ? "Prêt !" : "CV Builder"}
        </motion.h1>

        <motion.p className="text-muted-foreground text-center mb-6" variants={itemVariants}>
          {isComplete ? "Bienvenue dans votre créateur de CV" : loadingText}
        </motion.p>

        <motion.div className="w-full bg-muted rounded-full h-2 mb-4 overflow-hidden" variants={itemVariants}>
          <motion.div
            className="bg-teal-600 h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </motion.div>

        <motion.p className="text-xs text-muted-foreground text-center" variants={itemVariants}>
          {isComplete ? "Chargement terminé" : `${Math.round(progress)}%`}
        </motion.p>
      </motion.div>
    </div>
  )
}

