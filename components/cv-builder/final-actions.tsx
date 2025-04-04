"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Printer, Share2, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FinalActionsProps {
  onBack: () => void
}

export default function FinalActions({ onBack }: FinalActionsProps) {
  const { language } = useLanguage()
  const { cvData } = useCVBuilder()
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [printStatus, setPrintStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [shareStatus, setShareStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleDownload = () => {
    setDownloadStatus("loading")
    // Simulate download process
    setTimeout(() => {
      setDownloadStatus("success")
      // Reset after 2 seconds
      setTimeout(() => setDownloadStatus("idle"), 2000)
    }, 1500)
  }

  const handlePrint = () => {
    setPrintStatus("loading")
    // Simulate print process
    setTimeout(() => {
      setPrintStatus("success")
      // Reset after 2 seconds
      setTimeout(() => setPrintStatus("idle"), 2000)
    }, 1500)
  }

  const handleShare = () => {
    setShareStatus("loading")
    // Simulate share process
    setTimeout(() => {
      setShareStatus("success")
      // Reset after 2 seconds
      setTimeout(() => setShareStatus("idle"), 2000)
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{language === "fr" ? "Félicitations !" : "Congratulations!"}</h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Votre CV est prêt. Vous pouvez maintenant le télécharger, l'imprimer ou le partager."
            : "Your resume is ready. You can now download, print, or share it."}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{language === "fr" ? "Actions disponibles" : "Available Actions"}</CardTitle>
          <CardDescription>
            {language === "fr"
              ? "Choisissez ce que vous souhaitez faire avec votre CV"
              : "Choose what you want to do with your resume"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800">
            <Check className="h-4 w-4 text-teal-600 dark:text-teal-500" />
            <AlertTitle className="text-teal-800 dark:text-teal-500">
              {language === "fr" ? "Paiement réussi" : "Payment Successful"}
            </AlertTitle>
            <AlertDescription className="text-teal-700 dark:text-teal-400">
              {language === "fr"
                ? `Votre paiement de ${cvData.template?.price} FCFA a été traité avec succès.`
                : `Your payment of ${cvData.template?.price} FCFA has been processed successfully.`}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{language === "fr" ? "Télécharger" : "Download"}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "fr"
                    ? "Téléchargez votre CV au format PDF pour le conserver ou l'envoyer par email."
                    : "Download your resume as a PDF to keep it or send it via email."}
                </p>
                <Button
                  onClick={handleDownload}
                  disabled={downloadStatus === "loading" || downloadStatus === "success"}
                  className="w-full bg-teal-600 hover:bg-teal-700"
                >
                  {downloadStatus === "loading" ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {language === "fr" ? "Téléchargement..." : "Downloading..."}
                    </span>
                  ) : downloadStatus === "success" ? (
                    <span className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      {language === "fr" ? "Téléchargé" : "Downloaded"}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      {language === "fr" ? "Télécharger PDF" : "Download PDF"}
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{language === "fr" ? "Imprimer" : "Print"}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "fr"
                    ? "Imprimez directement votre CV pour vos candidatures physiques."
                    : "Print your resume directly for your physical applications."}
                </p>
                <Button
                  onClick={handlePrint}
                  disabled={printStatus === "loading" || printStatus === "success"}
                  className="w-full"
                  variant="outline"
                >
                  {printStatus === "loading" ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      {language === "fr" ? "Préparation..." : "Preparing..."}
                    </span>
                  ) : printStatus === "success" ? (
                    <span className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      {language === "fr" ? "Envoyé à l'imprimante" : "Sent to printer"}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Printer className="h-4 w-4 mr-2" />
                      {language === "fr" ? "Imprimer" : "Print"}
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">{language === "fr" ? "Partager" : "Share"}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "fr"
                    ? "Partagez votre CV avec des recruteurs ou sur les réseaux sociaux."
                    : "Share your resume with recruiters or on social media."}
                </p>
                <Button
                  onClick={handleShare}
                  disabled={shareStatus === "loading" || shareStatus === "success"}
                  className="w-full"
                  variant="outline"
                >
                  {shareStatus === "loading" ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      {language === "fr" ? "Préparation..." : "Preparing..."}
                    </span>
                  ) : shareStatus === "success" ? (
                    <span className="flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      {language === "fr" ? "Lien copié" : "Link copied"}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Share2 className="h-4 w-4 mr-2" />
                      {language === "fr" ? "Partager" : "Share"}
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <Alert className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            <AlertTitle className="text-amber-800 dark:text-amber-500">
              {language === "fr" ? "Conseil" : "Tip"}
            </AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-400">
              {language === "fr"
                ? "N'oubliez pas de personnaliser votre CV pour chaque candidature pour augmenter vos chances de succès."
                : "Don't forget to customize your resume for each application to increase your chances of success."}
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {language === "fr" ? "Retour à l'aperçu" : "Back to preview"}
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => (window.location.href = "/my-cvs")}>
            {language === "fr" ? "Voir tous mes CV" : "View all my resumes"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

