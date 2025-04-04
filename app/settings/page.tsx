"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"
import { ArrowLeft, Bell, Globe, Moon, Shield, Sun, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState({
    email: true,
    app: true,
    marketing: false,
    updates: true,
  })

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login?redirect=/settings")
      return
    }

    setIsLoading(false)
  }, [router])

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
          <h1 className="text-3xl md:text-4xl font-bold">{language === "fr" ? "Paramètres" : "Settings"}</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>{language === "fr" ? "Préférences" : "Preferences"}</CardTitle>
              <CardDescription>
                {language === "fr"
                  ? "Gérez vos préférences et paramètres de compte"
                  : "Manage your preferences and account settings"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="general" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{language === "fr" ? "Général" : "General"}</span>
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    <span>{language === "fr" ? "Apparence" : "Appearance"}</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span>{language === "fr" ? "Notifications" : "Notifications"}</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">{language === "fr" ? "Langue" : "Language"}</h3>
                      <div className="flex items-center gap-4">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <RadioGroup
                          defaultValue={language}
                          onValueChange={(value) => setLanguage(value as "fr" | "en")}
                          className="flex gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fr" id="fr" />
                            <Label htmlFor="fr">Français</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="en" id="en" />
                            <Label htmlFor="en">English</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        {language === "fr" ? "Confidentialité et sécurité" : "Privacy and security"}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Shield className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <Label htmlFor="privacy-mode">{language === "fr" ? "Mode privé" : "Privacy mode"}</Label>
                              <p className="text-sm text-muted-foreground">
                                {language === "fr"
                                  ? "Masquer votre profil des recherches publiques"
                                  : "Hide your profile from public searches"}
                              </p>
                            </div>
                          </div>
                          <Switch id="privacy-mode" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="appearance">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">{language === "fr" ? "Thème" : "Theme"}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <RadioGroup defaultValue={theme || "system"} onValueChange={(value) => setTheme(value)}>
                            <div className="flex items-center justify-between rounded-lg border p-4 mb-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="light" id="light" />
                                <Label htmlFor="light" className="flex items-center gap-2">
                                  <Sun className="h-4 w-4" />
                                  <span>{language === "fr" ? "Clair" : "Light"}</span>
                                </Label>
                              </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4 mb-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dark" id="dark" />
                                <Label htmlFor="dark" className="flex items-center gap-2">
                                  <Moon className="h-4 w-4" />
                                  <span>{language === "fr" ? "Sombre" : "Dark"}</span>
                                </Label>
                              </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="system" id="system" />
                                <Label htmlFor="system">{language === "fr" ? "Système" : "System"}</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notifications">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        {language === "fr" ? "Préférences de notification" : "Notification preferences"}
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">
                              {language === "fr" ? "Notifications par email" : "Email notifications"}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {language === "fr"
                                ? "Recevoir des notifications par email"
                                : "Receive notifications via email"}
                            </p>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={notifications.email}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="app-notifications">
                              {language === "fr" ? "Notifications dans l'application" : "In-app notifications"}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {language === "fr"
                                ? "Recevoir des notifications dans l'application"
                                : "Receive in-app notifications"}
                            </p>
                          </div>
                          <Switch
                            id="app-notifications"
                            checked={notifications.app}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, app: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="marketing-notifications">
                              {language === "fr" ? "Emails marketing" : "Marketing emails"}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {language === "fr"
                                ? "Recevoir des offres et promotions"
                                : "Receive offers and promotions"}
                            </p>
                          </div>
                          <Switch
                            id="marketing-notifications"
                            checked={notifications.marketing}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="update-notifications">
                              {language === "fr" ? "Mises à jour du produit" : "Product updates"}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {language === "fr"
                                ? "Recevoir des informations sur les nouvelles fonctionnalités"
                                : "Receive information about new features"}
                            </p>
                          </div>
                          <Switch
                            id="update-notifications"
                            checked={notifications.updates}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, updates: checked })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-teal-600 hover:bg-teal-700">
                {language === "fr" ? "Enregistrer les modifications" : "Save changes"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

