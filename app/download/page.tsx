"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Download, Apple, Smartphone, History } from "lucide-react"

export default function DownloadPage() {
  const { t } = useLanguage()

  const versions = [
    {
      version: "2.5.0",
      date: "2025-03-15",
      features: [
        t("download.versions.v250.feature1"),
        t("download.versions.v250.feature2"),
        t("download.versions.v250.feature3"),
      ],
    },
    {
      version: "2.4.0",
      date: "2025-02-01",
      features: [t("download.versions.v240.feature1"), t("download.versions.v240.feature2")],
    },
    {
      version: "2.3.0",
      date: "2025-01-10",
      features: [
        t("download.versions.v230.feature1"),
        t("download.versions.v230.feature2"),
        t("download.versions.v230.feature3"),
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("download.title")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("download.subtitle")}</p>
      </div>

      <Tabs defaultValue="android" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="android" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span>Android</span>
          </TabsTrigger>
          <TabsTrigger value="ios" className="flex items-center gap-2">
            <Apple className="h-4 w-4" />
            <span>iOS</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>{t("download.history")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="android">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative p-8 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-700/10 backdrop-blur-sm border border-white/10 rounded-xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">CV Builder v{versions[0].version} - Android</h2>
                  <p className="text-muted-foreground mb-4">
                    {t("download.latestVersion")} | {versions[0].date}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {versions[0].features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  {t("download.downloadApk")}
                </Button>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="ios">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative p-8 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-700/10 backdrop-blur-sm border border-white/10 rounded-xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">CV Builder v{versions[0].version} - iOS</h2>
                  <p className="text-muted-foreground mb-4">
                    {t("download.latestVersion")} | {versions[0].date}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {versions[0].features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2">
                  <Apple className="h-5 w-5" />
                  {t("download.appStore")}
                </Button>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-6">
            {versions.map((version, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-700/10 backdrop-blur-sm border border-white/10 rounded-xl"></div>
                <div className="relative z-10">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <h3 className="text-xl font-semibold">v{version.version}</h3>
                    <p className="text-sm text-muted-foreground">{version.date}</p>
                  </div>
                  <ul className="space-y-2">
                    {version.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-teal-500 mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      {t("download.downloadVersion")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

