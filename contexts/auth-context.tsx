"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import type { User, Notification } from "@/types/database"

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  users: User[]
  addUser: (user: User) => void
  updateUser: (user: User) => void
  deleteUser: (id: string) => void
  notifications: Notification[]
  addNotification: (notification: Notification) => void
  updateNotification: (notification: Notification) => void
  deleteNotification: (id: string) => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [users, setUsers] = React.useState<User[]>([
    {
      id: "mock-user-123",
      username: "testuser",
      email: "teste@teste.com",
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notifications: [],
    },
  ])
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "notif-1",
      userId: "mock-user-123",
      type: "info",
      message: "Welcome to your dashboard!",
      isRead: false,
      createdAt: new Date().toISOString(),
    },
  ])
  const router = useRouter()

  React.useEffect(() => {
    // Simulate checking session on mount
    const storedUser = localStorage.getItem("mockUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = React.useCallback(
    async (email: string, password: string) => {
      // Simulate API call for login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundUser = users.find((u) => u.email === email)

      if (foundUser && password === "pass") {
        // For mock, we assume password is 'password' for all users
        setUser(foundUser)
        localStorage.setItem("mockUser", JSON.stringify(foundUser))
        return { success: true }
      } else {
        return { success: false, error: "Invalid credentials" }
      }
    },
    [users],
  )

  const logout = React.useCallback(async () => {
    // Simulate API call for logout
    await new Promise((resolve) => setTimeout(resolve, 500))
    setUser(null)
    localStorage.removeItem("mockUser")
    router.push("/login")
  }, [router])

  const register = React.useCallback(
    async (username: string, email: string, password: string) => {
      // Simulate API call for registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (users.some((u) => u.email === email)) {
        return { success: false, error: "Email already registered" }
      }

      const newUser: User = {
        id: uuidv4(),
        username,
        email,
        role: "user", // Default role for new registrations
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notifications: [],
      }
      setUsers((prev) => [...prev, newUser])
      setUser(newUser)
      localStorage.setItem("mockUser", JSON.stringify(newUser))
      return { success: true }
    },
    [users],
  )

  const addUser = React.useCallback((user: User) => {
    setUsers((prev) => [
      ...prev,
      { ...user, id: uuidv4(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ])
  }, [])

  const updateUser = React.useCallback((updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...updatedUser, updatedAt: new Date().toISOString() } : u)),
    )
  }, [])

  const deleteUser = React.useCallback((id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id))
  }, [])

  const addNotification = React.useCallback((notification: Notification) => {
    setNotifications((prev) => [...prev, { ...notification, id: uuidv4(), createdAt: new Date().toISOString() }])
  }, [])

  const updateNotification = React.useCallback((updatedNotification: Notification) => {
    setNotifications((prev) => prev.map((n) => (n.id === updatedNotification.id ? updatedNotification : n)))
  }, [])

  const deleteNotification = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      users,
      addUser,
      updateUser,
      deleteUser,
      notifications,
      addNotification,
      updateNotification,
      deleteNotification,
    }),
    [
      user,
      login,
      logout,
      register,
      users,
      addUser,
      updateUser,
      deleteUser,
      notifications,
      addNotification,
      updateNotification,
      deleteNotification,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
