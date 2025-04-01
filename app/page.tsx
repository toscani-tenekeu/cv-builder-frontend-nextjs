"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, FileDown, Star } from 'lucide-react'

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-700">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-muted-foreground">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                {t("hero.createOnSite")} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link href="/download">
                <Button size="lg" variant="outline">
                  {t("hero.download")} <FileDown className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-teal-700/20 backdrop-blur-sm border border-white/10 rounded-xl z-10"></div>
              <Image
                src="/placeholder.svg?height=600&width=450"
                alt="CV Builder Preview"
                width={450}
                height={600}
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("features.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("features.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-700/10 backdrop-blur-sm border border-white/10 rounded-xl"></div>
              <div className="relative z-10">
                <div className="bg-teal-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(`features.feature${i}.title`)}</h3>
                <p className="text-muted-foreground">{t(`features.feature${i}.description`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative p-6 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-teal-700/10 backdrop-blur-sm border border-white/10 rounded-xl"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{t(`testimonials.testimonial${i}.initials`)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{t(`testimonials.testimonial${i}.name`)}</h4>
                    <p className="text-sm text-muted-foreground">{t(`testimonials.testimonial${i}.position`)}</p>
                  </div>
                </div>
                <p className="italic">{t(`testimonials.testimonial${i}.quote`)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative p-8 md:p-12 rounded-xl overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-teal-800/20 backdrop-blur-sm border border-white/10 rounded-xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{t("cta.subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                {t("cta.createOnSite")}
              </Button>
              <Link href="/pricing">
                <Button size="lg" variant="outline">
                  {t("cta.viewPricing")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
