"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, FileText, History, Plus, Settings, User } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; email?: string; phone?: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login?redirect=/profile")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (e) {
      console.error("Error parsing user data", e)
      router.push("/login?redirect=/profile")
    }

    setIsLoading(false)
  }, [router])

  const getUserInitials = () => {
    if (!user?.name) return user?.email?.charAt(0).toUpperCase() || "U"

    const nameParts = user.name.split(" ")
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase()

    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
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
      <div className="flex flex-col space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">{language === "fr" ? "Mon profil" : "My profile"}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarFallback className="bg-teal-600 text-white text-2xl">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold">
                      {user?.name || language === "fr" ? "Utilisateur" : "User"}
                    </h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                    {user?.phone && <p className="text-muted-foreground">{user.phone}</p>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === "fr" ? "Crédit disponible" : "Available credit"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-teal-600">0 FCFA</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {language === "fr" ? "Aucun abonnement actif" : "No active subscription"}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/profile/add-credit" className="w-full">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      <Plus className="mr-2 h-4 w-4" />
                      {language === "fr" ? "Ajouter du crédit" : "Add credit"}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {language === "fr" ? "Navigation rapide" : "Quick navigation"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/profile/subscriptions">
                    <Button variant="outline" className="w-full justify-start">
                      <History className="mr-2 h-4 w-4" />
                      {language === "fr" ? "Mes abonnements" : "My subscriptions"}
                    </Button>
                  </Link>
                  <Link href="/profile/receipts">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      {language === "fr" ? "Mes reçus" : "My receipts"}
                    </Button>
                  </Link>
                  <Link href="/my-cvs">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      {language === "fr" ? "Mes CV" : "My CVs"}
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      {language === "fr" ? "Paramètres" : "Settings"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{language === "fr" ? "Informations personnelles" : "Personal information"}</CardTitle>
                  <CardDescription>
                    {language === "fr"
                      ? "Gérez vos informations personnelles et vos préférences"
                      : "Manage your personal information and preferences"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="profile">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      <TabsTrigger value="profile" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{language === "fr" ? "Profil" : "Profile"}</span>
                      </TabsTrigger>
                      <TabsTrigger value="subscriptions" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>{language === "fr" ? "Abonnements" : "Subscriptions"}</span>
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        <span>{language === "fr" ? "Paramètres" : "Settings"}</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            {language === "fr" ? "Détails du compte" : "Account details"}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">{language === "fr" ? "Nom" : "Name"}</p>
                              <p>{user?.name || "-"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p>{user?.email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {language === "fr" ? "Téléphone" : "Phone"}
                              </p>
                              <p>{user?.phone || "-"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {language === "fr" ? "Date d'inscription" : "Registration date"}
                              </p>
                              <p>{new Date().toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-teal-600 hover:bg-teal-700">
                            {language === "fr" ? "Modifier le profil" : "Edit profile"}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="subscriptions">
                      <div className="space-y-6">
                        <div className="text-center py-8">
                          <p className="text-muted-foreground mb-4">
                            {language === "fr"
                              ? "Vous n'avez aucun abonnement actif"
                              : "You don't have any active subscriptions"}
                          </p>
                          <Link href="/pricing">
                            <Button className="bg-teal-600 hover:bg-teal-700">
                              {language === "fr" ? "Voir les plans" : "View plans"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="settings">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">
                            {language === "fr" ? "Préférences" : "Preferences"}
                          </h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{language === "fr" ? "Langue" : "Language"}</p>
                                <p className="text-sm text-muted-foreground">
                                  {language === "fr" ? "Français" : "English"}
                                </p>
                              </div>
                              <Button variant="outline">{language === "fr" ? "Modifier" : "Change"}</Button>
                            </div>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{language === "fr" ? "Notifications" : "Notifications"}</p>
                                <p className="text-sm text-muted-foreground">
                                  {language === "fr" ? "Activées" : "Enabled"}
                                </p>
                              </div>
                              <Button variant="outline">{language === "fr" ? "Gérer" : "Manage"}</Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button className="bg-teal-600 hover:bg-teal-700">
                            {language === "fr" ? "Enregistrer les modifications" : "Save changes"}
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

