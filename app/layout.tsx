import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CV Builder - Créez votre CV professionnel",
  description: "Créez facilement un CV professionnel avec CV Builder",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <div className="relative min-h-screen flex flex-col">
              <AnimatedBackground />
              <Navbar />
              <main className="flex-grow z-10">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import "./globals.css"

import "./globals.css"



import './globals.css'