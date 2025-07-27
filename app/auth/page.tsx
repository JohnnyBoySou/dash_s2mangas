"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { Github, Mail, Lock, User } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("dev.joaosousa@gmail.com")
  const [password, setPassword] = useState("123456")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo de volta!",
          variant: "success",
        })
        // Redireciona para o dashboard após login bem-sucedido
        router.push("/dashboard")
      } else {
        await register(name, email, password)
        toast({
          title: "Conta criada com sucesso!",
          description: "Verifique seu email para ativar sua conta.",
          variant: "success",
        })
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gray-800 rounded-lg rotate-12 opacity-30"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-gray-700 rounded-lg -rotate-12 opacity-20"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 border border-gray-800 rounded-lg rotate-45 opacity-25"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-gray-700 rounded-lg -rotate-45 opacity-30"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 border border-gray-800 rounded-lg rotate-12 opacity-20"></div>
        <div className="absolute top-1/3 right-10 w-36 h-36 border border-gray-700 rounded-lg -rotate-12 opacity-15"></div>
      </div>

      <Card className="w-full max-w-md bg-gray-900/80 border-gray-800 backdrop-blur-sm relative z-10">
        <CardHeader className="space-y-6 text-center pb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              {isLogin ? "Bem-vindo de Volta" : "Criar Conta"}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin)
                }}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {isLogin ? "Criar conta" : "Fazer login"}
              </button>
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pl-10 h-12 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="Endereço de email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pl-10 h-12 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 pl-10 h-12 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Carregando..." : (isLogin ? "Entrar" : "Criar Conta")}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-400">OU</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="h-12 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
              disabled
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="h-12 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
              disabled
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              className="h-12 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
              disabled
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

