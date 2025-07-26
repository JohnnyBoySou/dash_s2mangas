"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const { login, register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isRegistering) {
      const { success, error } = await register(username, email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        alert(error)
      }
    } else {
      const { success, error } = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        alert(error)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{isRegistering ? "Register" : "Login"}</CardTitle>
          <CardDescription>
            {isRegistering
              ? "Create your account to get started."
              : "Enter your email and password to access your account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isRegistering ? "Register" : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <Button variant="link" onClick={() => setIsRegistering(false)} className="p-0 h-auto">
                  Login
                </Button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Button variant="link" onClick={() => setIsRegistering(true)} className="p-0 h-auto">
                  Register
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
