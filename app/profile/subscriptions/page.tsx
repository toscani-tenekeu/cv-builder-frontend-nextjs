"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Download } from "lucide-react"
import Link from "next/link"

export default function SubscriptionsPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login?redirect=/profile/subscriptions")
      return
    }

    setIsLoading(false)
  }, [router])

  // Mock subscription data
  const activeSubscriptions: any[] = []

  const subscriptionHistory = [
    {
      id: "sub_001",
      plan: language === "fr" ? "Premium" : "Premium",
      price: "1 399 FCFA",
      startDate: "2024-03-15",
      endDate: "2024-03-16",
      status: "expired",
    },
    {
      id: "sub_002",
      plan: language === "fr" ? "Basique" : "Basic",
      price: "799 FCFA",
      startDate: "2024-02-20",
      endDate: "2024-02-21",
      status: "expired",
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
          <h1 className="text-3xl md:text-4xl font-bold">
            {language === "fr" ? "Mes abonnements" : "My subscriptions"}
          </h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Abonnements et historique" : "Subscriptions and history"}</CardTitle>
              <CardDescription>
                {language === "fr"
                  ? "Gérez vos abonnements et consultez votre historique"
                  : "Manage your subscriptions and view your history"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="active">
                    {language === "fr" ? "Abonnements actifs" : "Active subscriptions"}
                  </TabsTrigger>
                  <TabsTrigger value="history">{language === "fr" ? "Historique" : "History"}</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                  {activeSubscriptions.length > 0 ? (
                    <div className="space-y-4">
                      {activeSubscriptions.map((subscription) => (
                        <div key={subscription.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{subscription.plan}</h3>
                              <p className="text-sm text-muted-foreground">{subscription.price}</p>
                            </div>
                            <Badge className="bg-green-600">{language === "fr" ? "Actif" : "Active"}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {language === "fr" ? "Début" : "Start"}:{" "}
                                {new Date(subscription.startDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {language === "fr" ? "Fin" : "End"}:{" "}
                                {new Date(subscription.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        {language === "fr" ? "Aucun abonnement actif" : "No active subscriptions"}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {language === "fr"
                          ? "Vous n'avez actuellement aucun abonnement actif"
                          : "You currently don't have any active subscriptions"}
                      </p>
                      <Link href="/pricing">
                        <Button className="bg-teal-600 hover:bg-teal-700">
                          {language === "fr" ? "Voir les plans" : "View plans"}
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="history">
                  {subscriptionHistory.length > 0 ? (
                    <div className="space-y-4">
                      {subscriptionHistory.map((subscription) => (
                        <div key={subscription.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{subscription.plan}</h3>
                              <p className="text-sm text-muted-foreground">{subscription.price}</p>
                            </div>
                            <Badge variant="outline" className="text-muted-foreground">
                              {language === "fr" ? "Expiré" : "Expired"}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {language === "fr" ? "Début" : "Start"}:{" "}
                                {new Date(subscription.startDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>
                                {language === "fr" ? "Fin" : "End"}:{" "}
                                {new Date(subscription.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Link href={`/profile/receipts#${subscription.id}`}>
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                {language === "fr" ? "Voir le reçu" : "View receipt"}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        {language === "fr" ? "Aucun historique" : "No history"}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {language === "fr"
                          ? "Vous n'avez pas encore souscrit à un abonnement"
                          : "You haven't subscribed to any plan yet"}
                      </p>
                      <Link href="/pricing">
                        <Button className="bg-teal-600 hover:bg-teal-700">
                          {language === "fr" ? "Voir les plans" : "View plans"}
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {language === "fr"
                  ? "Besoin d'aide avec votre abonnement ? Contactez notre support."
                  : "Need help with your subscription? Contact our support."}
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

