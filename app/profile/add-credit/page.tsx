"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { ArrowLeft, Copy, Phone, Mail, AlertCircle, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from "next/image"

export default function AddCreditPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<string>("orange")
  const [isLoading, setIsLoading] = useState(true)
  const [copiedOrange, setCopiedOrange] = useState(false)
  const [copiedMtn, setCopiedMtn] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login?redirect=/profile/add-credit")
      return
    }

    setIsLoading(false)
  }, [router])

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col space-y-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">{language === "fr" ? "Ajouter du crédit" : "Add credit"}</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Méthodes de paiement" : "Payment methods"}</CardTitle>
              <CardDescription>
                {language === "fr"
                  ? "Choisissez votre méthode de paiement préférée"
                  : "Choose your preferred payment method"}
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                    <div className="mb-3 w-full h-12 relative">
                      <Image
                        src="/placeholder.svg?height=48&width=120"
                        alt="Orange Money"
                        width={120}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span>Orange Money</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="mtn" id="mtn" className="peer sr-only" />
                  <Label
                    htmlFor="mtn"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-teal-600 [&:has([data-state=checked])]:border-teal-600"
                  >
                    <div className="mb-3 w-full h-12 relative">
                      <Image
                        src="/placeholder.svg?height=48&width=120"
                        alt="MTN Mobile Money"
                        width={120}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span>MTN Mobile Money</span>
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-6">
                <Alert className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                  <AlertTitle className="text-amber-800 dark:text-amber-500">
                    {language === "fr" ? "Important" : "Important"}
                  </AlertTitle>
                  <AlertDescription className="text-amber-700 dark:text-amber-400">
                    {language === "fr"
                      ? "Après avoir effectué votre paiement, veuillez envoyer une preuve de paiement via WhatsApp ou email. Votre compte sera crédité dans les minutes qui suivent."
                      : "After making your payment, please send proof of payment via WhatsApp or email. Your account will be credited within minutes."}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    {language === "fr" ? "Informations de paiement" : "Payment information"}
                  </h3>

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
                              {copiedMtn
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
                          <p className="font-medium">FONGANG COLINCE</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <h3 className="text-lg font-semibold mt-6">
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
                        <p>contact@toscanisoft.cm</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCopy("contact@toscanisoft.cm", "email")}
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
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => router.push("/pricing")}>
                {language === "fr" ? "Voir les plans disponibles" : "View available plans"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                {language === "fr"
                  ? "Besoin d'aide ? Contactez notre support via WhatsApp au +237 694 19 34 93"
                  : "Need help? Contact our support via WhatsApp at +237 694 19 34 93"}
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

