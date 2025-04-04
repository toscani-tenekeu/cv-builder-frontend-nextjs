"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, Download, FileText, Printer } from "lucide-react"

export default function ReceiptsPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login?redirect=/profile/receipts")
      return
    }

    setIsLoading(false)
  }, [router])

  // Mock receipts data
  const receipts = [
    {
      id: "sub_001",
      plan: language === "fr" ? "Premium" : "Premium",
      price: "1 399 FCFA",
      date: "2024-03-15",
      paymentMethod: "Orange Money",
      transactionId: "OM1234567890",
    },
    {
      id: "sub_002",
      plan: language === "fr" ? "Basique" : "Basic",
      price: "799 FCFA",
      date: "2024-02-20",
      paymentMethod: "MTN Mobile Money",
      transactionId: "MTN9876543210",
    },
  ]

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">{language === "fr" ? "Mes reçus" : "My receipts"}</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Historique des paiements" : "Payment history"}</CardTitle>
              <CardDescription>
                {language === "fr"
                  ? "Consultez et téléchargez vos reçus de paiement"
                  : "View and download your payment receipts"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {receipts.length > 0 ? (
                <div className="space-y-6">
                  {receipts.map((receipt) => (
                    <div key={receipt.id} id={receipt.id} className="border rounded-lg p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                          <h3 className="text-xl font-semibold">{receipt.plan}</h3>
                          <p className="text-muted-foreground">{new Date(receipt.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-2xl font-bold mt-2 md:mt-0">{receipt.price}</div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {language === "fr" ? "Méthode de paiement" : "Payment method"}
                          </p>
                          <p>{receipt.paymentMethod}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {language === "fr" ? "ID de transaction" : "Transaction ID"}
                          </p>
                          <p>{receipt.transactionId}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-end">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          {language === "fr" ? "Télécharger" : "Download"}
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Printer className="h-4 w-4" />
                          {language === "fr" ? "Imprimer" : "Print"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {language === "fr" ? "Aucun reçu disponible" : "No receipts available"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === "fr"
                      ? "Vous n'avez pas encore effectué de paiement"
                      : "You haven't made any payments yet"}
                  </p>
                  <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => router.push("/pricing")}>
                    {language === "fr" ? "Voir les plans" : "View plans"}
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {language === "fr"
                  ? "Les reçus sont disponibles pendant 12 mois après la date d'achat."
                  : "Receipts are available for 12 months after the purchase date."}
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

