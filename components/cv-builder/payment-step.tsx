"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { useCVBuilder } from "./cv-builder-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Copy, Lock, AlertCircle, Phone, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface PaymentStepProps {
  onNext: () => void
  onBack: () => void
}

export default function PaymentStep({ onNext, onBack }: PaymentStepProps) {
  const { language } = useLanguage()
  const { cvData } = useCVBuilder()
  const [paymentMethod, setPaymentMethod] = useState<string>("orange")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [copiedOrange, setCopiedOrange] = useState(false)
  const [copiedMtn, setCopiedMtn] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false)

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "orange") setCopiedOrange(true)
      if (type === "mtn") setCopiedMtn(true)
      if (type === "email") setCopiedEmail(true)
      if (type === "whatsapp") setCopiedWhatsapp(true)

      setTimeout(() => {
        if (type === "orange") setCopiedOrange(false)
        if (type === "mtn") setCopiedMtn(false)
        if (type === "email") setCopiedEmail(false)
        if (type === "whatsapp") setCopiedWhatsapp(false)
      }, 2000)
    })
  }

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      // Proceed to next step after showing success message
      setTimeout(() => {
        onNext()
      }, 1500)
    }, 2000)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">{language === "fr" ? "Paiement" : "Payment"}</h1>
        <p className="text-muted-foreground">
          {language === "fr"
            ? "Finalisez votre achat pour créer votre CV professionnel."
            : "Complete your purchase to create your professional resume."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Méthode de paiement" : "Payment Method"}</CardTitle>
              <CardDescription>
                {language === "fr"
                  ? "Choisissez votre méthode de paiement préférée"
                  : "Choose your preferred payment method"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                defaultValue="orange"
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
              >
                <div>
                  <RadioGroupItem value="orange" id="orange" className="peer sr-only" />
                  <Label
                    htmlFor="orange"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-600 [&:has([data-state=checked])]:border-teal-600"
                  >
                    <div className="mb-3 w-full h-12 relative flex items-center justify-center">
                      <span className="text-xl font-bold text-orange-500">Orange Money</span>
                    </div>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="mtn" id="mtn" className="peer sr-only" />
                  <Label
                    htmlFor="mtn"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-600 [&:has([data-state=checked])]:border-teal-600"
                  >
                    <div className="mb-3 w-full h-12 relative flex items-center justify-center">
                      <span className="text-xl font-bold text-yellow-500">MTN Mobile Money</span>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <Alert className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                <AlertTitle className="text-amber-800 dark:text-amber-500">
                  {language === "fr" ? "Instructions de paiement" : "Payment Instructions"}
                </AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-400">
                  {language === "fr"
                    ? "Veuillez effectuer votre paiement directement au numéro indiqué ci-dessous. Après paiement, envoyez une preuve par WhatsApp ou email pour validation rapide."
                    : "Please make your payment directly to the number indicated below. After payment, send proof via WhatsApp or email for quick validation."}
                </AlertDescription>
              </Alert>

              {paymentMethod === "orange" && (
                <div className="p-4 rounded-lg border bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-orange-800 dark:text-orange-400">Orange Money</h4>
                    <div className="flex items-center text-orange-700 dark:text-orange-500 text-sm">
                      <span>{language === "fr" ? "Cameroun uniquement" : "Cameroon only"}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">{language === "fr" ? "Numéro" : "Number"}</p>
                        <p className="font-medium">+237 694 19 34 93</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy("+237 694 19 34 93", "orange")}
                        className="flex items-center gap-1"
                      >
                        {copiedOrange ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span>
                          {copiedOrange
                            ? language === "fr"
                              ? "Copié"
                              : "Copied"
                            : language === "fr"
                              ? "Copier"
                              : "Copy"}
                        </span>
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === "fr" ? "Nom" : "Name"}</p>
                      <p className="font-medium">TENEKEU MODJOU</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === "fr" ? "Montant" : "Amount"}</p>
                      <p className="font-medium">{cvData.template?.price} FCFA</p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "mtn" && (
                <div className="p-4 rounded-lg border bg-yellow-50/50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-yellow-800 dark:text-yellow-400">MTN Mobile Money</h4>
                    <div className="flex items-center text-yellow-700 dark:text-yellow-500 text-sm">
                      <span>{language === "fr" ? "Cameroun uniquement" : "Cameroon only"}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">{language === "fr" ? "Numéro" : "Number"}</p>
                        <p className="font-medium">+237 650 50 00 18</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy("+237 650 50 00 18", "mtn")}
                        className="flex items-center gap-1"
                      >
                        {copiedMtn ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span>
                          {copiedMtn ? (language === "fr" ? "Copié" : "Copied") : language === "fr" ? "Copier" : "Copy"}
                        </span>
                      </Button>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === "fr" ? "Nom" : "Name"}</p>
                      <p className="font-medium">FONGANG COLINCE</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{language === "fr" ? "Montant" : "Amount"}</p>
                      <p className="font-medium">{cvData.template?.price} FCFA</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="font-medium mb-3">
                  {language === "fr" ? "Envoyez votre preuve de paiement" : "Send your payment proof"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="h-5 w-5 text-teal-600" />
                      <h4 className="font-medium">WhatsApp</h4>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>+237 694 19 34 93</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy("+237 694 19 34 93", "whatsapp")}
                        className="flex items-center gap-1"
                      >
                        {copiedWhatsapp ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span>
                          {copiedWhatsapp
                            ? language === "fr"
                              ? "Copié"
                              : "Copied"
                            : language === "fr"
                              ? "Copier"
                              : "Copy"}
                        </span>
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-5 w-5 text-teal-600" />
                      <h4 className="font-medium">Email</h4>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>contact@gmail.com</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy("contact@gmail.com", "email")}
                        className="flex items-center gap-1"
                      >
                        {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        <span>
                          {copiedEmail
                            ? language === "fr"
                              ? "Copié"
                              : "Copied"
                            : language === "fr"
                              ? "Copier"
                              : "Copy"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                {language === "fr" ? "Retour" : "Back"}
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isProcessing || isComplete}
                className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {language === "fr" ? "Traitement..." : "Processing..."}
                  </>
                ) : isComplete ? (
                  <>
                    <Check className="h-4 w-4" />
                    {language === "fr" ? "Payé" : "Paid"}
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    {language === "fr" ? "Simuler le paiement" : "Simulate Payment"}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Résumé de la commande" : "Order Summary"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>{language === "fr" ? "Modèle" : "Template"}:</span>
                  <span className="font-medium">{cvData.template?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "fr" ? "Type" : "Type"}:</span>
                  <span className="font-medium capitalize">{cvData.template?.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === "fr" ? "Prix" : "Price"}:</span>
                  <span className="font-bold text-teal-600">{cvData.template?.price} FCFA</span>
                </div>
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>{language === "fr" ? "Total" : "Total"}:</span>
                    <span>{cvData.template?.price} FCFA</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <div className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                <h4 className="font-medium text-sm mb-1">
                  {language === "fr" ? "Crédit disponible" : "Available Credit"}
                </h4>
                <p className="text-xl font-bold text-teal-600">0 FCFA</p>
              </div>
              <div className="text-xs text-muted-foreground flex items-center gap-2 w-full justify-center">
                <Lock className="h-3 w-3" />
                {language === "fr" ? "Paiement sécurisé" : "Secure payment"}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

