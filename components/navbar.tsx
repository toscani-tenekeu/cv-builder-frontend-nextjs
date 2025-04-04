"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Moon, Sun, Globe, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setIsLoggedIn(true)
      } catch (e) {
        console.error("Error parsing user data", e)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    router.push("/")
  }

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.features"), href: "/#features" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.download"), href: "/download" },
  ]

  const getUserInitials = () => {
    if (!user?.name) return "U"

    const nameParts = user.name.split(" ")
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase()

    return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase()
  }

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-6">
            <Image src="/logo.png" alt="CV Builder Logo" width={40} height={40} className="mr-2" />
            <span className="font-bold text-xl">CV Builder</span>
          </Link>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("fr")}>Français {language === "fr" && "✓"}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>English {language === "en" && "✓"}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {!isMobile && (
            <>
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-teal-600 text-white">{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push("/profile")}>{t("user.profile")}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/my-cvs")}>{t("user.cvs")}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>{t("user.settings")}</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("user.logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">{t("nav.login")}</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-teal-600 hover:bg-teal-700">{t("nav.signup")}</Button>
                  </Link>
                </>
              )}
            </>
          )}

          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col h-full">
                  <div className="flex-1 py-6">
                    <nav className="flex flex-col space-y-6">
                      {navItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="text-foreground hover:text-muted-foreground transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="border-t border-border pt-6 flex flex-col space-y-4">
                    {isLoggedIn ? (
                      <>
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-teal-600 text-white">{getUserInitials()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user?.name || user?.email}</p>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Link href="/profile">
                            <Button variant="outline" className="w-full">
                              {t("user.profile")}
                            </Button>
                          </Link>
                          <Link href="/my-cvs">
                            <Button variant="outline" className="w-full">
                              {t("user.cvs")}
                            </Button>
                          </Link>
                          <Link href="/settings">
                            <Button variant="outline" className="w-full">
                              {t("user.settings")}
                            </Button>
                          </Link>
                        </div>
                        <Button className="w-full text-red-500" variant="outline" onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>{t("user.logout")}</span>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button variant="outline" className="w-full">
                            {t("nav.login")}
                          </Button>
                        </Link>
                        <Link href="/register">
                          <Button className="w-full bg-teal-600 hover:bg-teal-700">{t("nav.signup")}</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}

