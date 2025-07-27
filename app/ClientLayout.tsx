"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/toaster"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    // Só redireciona se não estiver carregando, não for a página de login e não tiver usuário
    if (isClient && !isLoading && !user && !isLoginPage) {
      router.push("/auth")
    }
  }, [isClient, isLoading, isLoginPage, user, router])

  
  useEffect(() => {
    setIsClient(true);
    setIsLoginPage(window.location.pathname === "/auth");
  }, []);
  
  if (!isClient) {
    return null; // Initial server render, don't show anything
  }
  
  // Mostra loading enquanto está verificando a autenticação
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  // Se não tem usuário e não é a página de login, não mostra nada (vai redirecionar)
  if (!user && !isLoginPage) {
    return null;
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  )
}
