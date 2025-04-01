"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function VerifyOTPPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [userInfo, setUserInfo] = useState<{ email?: string; phone?: string } | null>(null)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Check if user exists in localStorage
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    try {
      const userData = JSON.parse(user)
      setUserInfo(userData)
    } catch (e) {
      router.push("/login")
    }

    // Start countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return

    const newOtp = [...otp]

    // Handle paste event with multiple characters
    if (value.length > 1) {
      const pastedValues = value.split("").slice(0, 6 - index)

      for (let i = 0; i < pastedValues.length; i++) {
        if (index + i < 6) {
          newOtp[index + i] = pastedValues[i]
        }
      }

      setOtp(newOtp)

      // Focus on the next empty input or the last one
      const nextIndex = Math.min(index + pastedValues.length, 5)
      inputRefs.current[nextIndex]?.focus()

      return
    }

    // Handle single character input
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty and backspace is pressed, focus previous input
        const newOtp = [...otp]
        newOtp[index - 1] = ""
        setOtp(newOtp)
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handleResendOtp = () => {
    setCountdown(60)
    // Simulate OTP resend
    // In a real app, you would call your API here
  }

  const handleVerify = () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setError(t("auth.verify.errorComplete"))
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate OTP verification
    setTimeout(() => {
      // For demo purposes, any OTP is valid
      if (otpValue === "123456") {
        // Mark user as verified
        if (userInfo) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userInfo,
              verified: true,
            }),
          )
        }
        router.push("/")
      } else {
        setError(t("auth.verify.error"))
        setIsLoading(false)
      }
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-md mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">{t("auth.verify.title")}</CardTitle>
              <CardDescription className="text-center">
                {t("auth.verify.subtitle")} {userInfo?.email ? t("auth.verify.email") : t("auth.verify.phone")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-center text-sm text-muted-foreground mb-2">
                  {userInfo?.email && `Email: ${userInfo.email}`}
                  {userInfo?.phone && `${t("auth.register.phone")}: ${userInfo.phone}`}
                </p>
              </div>

              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg"
                  />
                ))}
              </div>

              {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

              <Button onClick={handleVerify} className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                {isLoading ? t("auth.verify.loading") : t("auth.verify.button")}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="text-center text-sm">
                {countdown > 0 ? (
                  <p className="text-muted-foreground">
                    {t("auth.verify.resend")} <span className="font-semibold">{countdown}s</span>
                  </p>
                ) : (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-teal-600 hover:text-teal-700"
                    onClick={handleResendOtp}
                  >
                    {t("auth.verify.resendButton")}
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

