"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    // Redirect to login if no user and not already on login page
    if (isClient && !user && !isLoginPage) {
      router.push("/login")
    }
  }, [isClient, isLoginPage, user, router])

  // Render children only if user is authenticated or on the login page
  
  useEffect(() => {
    setIsClient(true);
    setIsLoginPage(window.location.pathname === "/login");
  }, []);
  
  if (!isClient) {
    return null; // Initial server render, don't show anything
  }
  
  if (!user && !isLoginPage) {
    return null; // Or a loading spinner
  }

  return <>{children}</>
}
