"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface AuthContextType {
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (username: string, password: string) => {
    // Simulando autenticação - em produção, isso seria uma chamada de API
    const validUsers = [
      { username: "brenno.om", password: "Bre140903" },
      { username: "gabriel.an", password: "Gab123456" },
    ]

    const isValidUser = validUsers.some((user) => user.username === username && user.password === password)

    if (isValidUser) {
      setIsAuthenticated(true)
      localStorage.setItem("admin_auth", "true")
      localStorage.setItem("admin_user", username)
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_auth")
    router.push("/admin/login")
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
