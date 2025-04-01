"use client"

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const { t } = useLanguage()

  const footerLinks = [
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.about"), href: "/about" },
        { label: t("footer.faq"), href: "/faq" },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: t("footer.privacy"), href: "/privacy" },
        { label: t("footer.terms"), href: "/terms" },
        { label: t("footer.cookies"), href: "/cookies" },
      ],
    },
  ]

  return (
    <footer className="bg-background/80 backdrop-blur-lg border-t border-border z-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image src="/logo.png" alt="CV Builder Logo" width={40} height={40} className="mr-2" />
              <span className="font-bold text-xl">CV Builder</span>
            </Link>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <span>toscanisoft@gmail.com</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span>+237 694 19 34 93</span>
                  <span>+237 674 69 05 95</span>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 shrink-0 mt-0.5" />
                <span>Yaoundé, Cameroon</span>
              </div>
            </div>
          </div>

          {footerLinks.map((section, i) => (
            <div key={i} className="md:col-span-1">
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">{t("footer.contact")}</h3>
            <p className="text-muted-foreground mb-4">{t("footer.contactText")}</p>
            <Link href="/contact">
              <span className="text-teal-600 hover:text-teal-700 font-medium">{t("footer.contactUs")} →</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CV Builder. {t("footer.rights")}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

