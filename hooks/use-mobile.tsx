"use client"

import { useState, useEffect } from "react"

export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if window width is less than breakpoint
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Check on initial load
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Clean up event listener
    return () => window.removeEventListener("resize", checkMobile)
  }, [breakpoint])

  return isMobile
}

