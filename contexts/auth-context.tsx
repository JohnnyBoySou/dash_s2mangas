'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthService } from '@/services/auth-service'

interface User {
  id: string
  name: string
  email: string
  username: string
  bio?: string
  avatar?: string
  cover?: string
  createdAt: string
  birthdate?: string
  categories?: Array<{ id: string; name: string }>
  languages?: Array<{ id: string; name: string }>
  coins?: number
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      setToken(storedToken)
      // Chama loadUserProfile diretamente aqui
      loadUserProfile(storedToken)
    } else {
      setIsLoading(false)
    }
  }, [])

  const loadUserProfile = async (tokenToUse?: string) => {
    try {
      const profile = await AuthService.getProfile()
      setUser(profile)
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
      // Token inválido, remove do localStorage
      localStorage.removeItem('auth_token')
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const response = await AuthService.login({ email, password })
      
      if (response) {
        setToken(response.token)
        setUser(response.user)
        localStorage.setItem('auth_token', response.token)
      }
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      await AuthService.register({ name, email, password })
      // Após o registro, o usuário precisa verificar o email
      // Não fazemos login automático
    } catch (error) {
      console.error('Erro no registro:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!token) {
      throw new Error('Usuário não autenticado')
    }

    try {
      setIsLoading(true)
      const updatedUser = await AuthService.updateProfile(data)
      if (updatedUser) {
        setUser(updatedUser)
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAccount = async () => {
    if (!token) {
      throw new Error('Usuário não autenticado')
    }

    try {
      setIsLoading(true)
      await AuthService.deleteAccount()
      logout()
    } catch (error) {
      console.error('Erro ao deletar conta:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    deleteAccount,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
