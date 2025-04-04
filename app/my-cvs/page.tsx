"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { ArrowLeft, Download, Edit, Eye, FileText, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

export default function MyCvsPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login?redirect=/my-cvs")
      return
    }

    setIsLoading(false)
  }, [router])

  // Mock CVs data
  const cvs = [
    {
      id: "cv_001",
      title: language === "fr" ? "Mon CV professionnel" : "My professional CV",
      template: "Premium 1",
      lastModified: "2024-03-20",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "cv_002",
      title: language === "fr" ? "CV pour stage" : "CV for internship",
      template: "Basic 3",
      lastModified: "2024-03-15",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
  ]

  // Mock templates data
  const templates = [
    {
      id: "template_001",
      name: "Premium 1",
      category: "premium",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "template_002",
      name: "Premium 2",
      category: "premium",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "template_003",
      name: "Basic 1",
      category: "basic",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "template_004",
      name: "Basic 2",
      category: "basic",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "template_005",
      name: "Basic 3",
      category: "basic",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: "template_006",
      name: "Premium 3",
      category: "premium",
      thumbnail: "/placeholder.svg?height=400&width=300",
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
      <div className="flex flex-col space-y-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold">{language === "fr" ? "Mes CV" : "My CVs"}</h1>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>{language === "fr" ? "Mes CV et modèles" : "My CVs and templates"}</CardTitle>
                  <CardDescription>
                    {language === "fr" ? "Gérez vos CV et créez-en de nouveaux" : "Manage your CVs and create new ones"}
                  </CardDescription>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {language === "fr" ? "Créer un nouveau CV" : "Create new CV"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="my-cvs">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="my-cvs">{language === "fr" ? "Mes CV" : "My CVs"}</TabsTrigger>
                  <TabsTrigger value="templates">{language === "fr" ? "Modèles" : "Templates"}</TabsTrigger>
                </TabsList>

                <TabsContent value="my-cvs">
                  {cvs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cvs.map((cv) => (
                        <motion.div
                          key={cv.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          className="group relative rounded-lg overflow-hidden border"
                        >
                          <div className="aspect-[3/4] relative">
                            <Image
                              src={cv.thumbnail || "/placeholder.svg"}
                              alt={cv.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              <Button size="sm" variant="secondary" className="flex items-center gap-1">
                                <Edit className="h-4 w-4" />
                                <span>{language === "fr" ? "Modifier" : "Edit"}</span>
                              </Button>
                              <Button size="sm" variant="secondary" className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{language === "fr" ? "Voir" : "View"}</span>
                              </Button>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold truncate">{cv.title}</h3>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-sm text-muted-foreground">{cv.template}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(cv.lastModified).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex justify-between mt-4">
                              <Button size="sm" variant="outline" className="flex items-center gap-1">
                                <Download className="h-4 w-4" />
                                <span>PDF</span>
                              </Button>
                              <Button size="sm" variant="destructive" className="flex items-center gap-1">
                                <Trash2 className="h-4 w-4" />
                                <span>{language === "fr" ? "Supprimer" : "Delete"}</span>
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        {language === "fr" ? "Aucun CV trouvé" : "No CVs found"}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {language === "fr" ? "Vous n'avez pas encore créé de CV" : "You haven't created any CVs yet"}
                      </p>
                      <Button className="bg-teal-600 hover:bg-teal-700">
                        {language === "fr" ? "Créer mon premier CV" : "Create my first CV"}
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="templates">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map((template) => (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="group relative rounded-lg overflow-hidden border"
                      >
                        <div className="aspect-[3/4] relative">
                          <Image
                            src={template.thumbnail || "/placeholder.svg"}
                            alt={template.name}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button className="bg-teal-600 hover:bg-teal-700">
                              {language === "fr" ? "Utiliser ce modèle" : "Use this template"}
                            </Button>
                          </div>
                          {template.category === "premium" && (
                            <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-semibold px-2 py-1 rounded">
                              Premium
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{template.category}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

