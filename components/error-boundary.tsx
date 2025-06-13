"use client"

import { useState, useEffect } from "react"
import { AlertCircle, X } from "lucide-react"

export function ErrorLogger() {
  const [errors, setErrors] = useState<string[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const originalConsoleError = console.error
    const originalConsoleWarn = console.warn

    // Sobrescrever console.error
    console.error = (...args) => {
      originalConsoleError(...args)
      const errorMessage = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ")

      setErrors((prev) => [...prev, `[ERRO] ${errorMessage}`].slice(-10))
      setIsVisible(true)
    }

    // Sobrescrever console.warn
    console.warn = (...args) => {
      originalConsoleWarn(...args)
      const warnMessage = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ")

      setErrors((prev) => [...prev, `[AVISO] ${warnMessage}`].slice(-10))
      setIsVisible(true)
    }

    return () => {
      console.error = originalConsoleError
      console.warn = originalConsoleWarn
    }
  }, [])

  if (!isVisible || errors.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-red-800 font-medium flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Erros Detectados ({errors.length})
          </h3>
          <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {errors.map((error, index) => (
            <div key={index} className="text-xs text-red-700 border-b border-red-200 py-2 break-all">
              {error}
            </div>
          ))}
        </div>

        <div className="mt-2 text-xs text-red-600">Verifique o console do navegador para mais detalhes.</div>
      </div>
    </div>
  )
}
