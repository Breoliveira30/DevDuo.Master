"use client"

import { useState, useEffect } from "react"
import { Save } from "lucide-react"

export function StorageStatus() {
  const [storageUsed, setStorageUsed] = useState<string>("0 KB")

  useEffect(() => {
    // Calcular o uso de armazenamento
    const calculateStorage = () => {
      try {
        let total = 0
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key) {
            const value = localStorage.getItem(key)
            if (value) {
              total += value.length * 2 // Aproximadamente 2 bytes por caractere
            }
          }
        }

        // Converter para KB ou MB
        if (total > 1024 * 1024) {
          setStorageUsed(`${(total / (1024 * 1024)).toFixed(2)} MB`)
        } else {
          setStorageUsed(`${(total / 1024).toFixed(2)} KB`)
        }
      } catch (error) {
        console.error("Erro ao calcular armazenamento:", error)
        setStorageUsed("N/A")
      }
    }

    calculateStorage()

    // Recalcular quando o localStorage mudar
    const handleStorageChange = () => {
      calculateStorage()
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-3 border border-gray-200 text-xs flex items-center gap-2">
      <Save className="h-3 w-3 text-green-500" />
      <span>Armazenamento: {storageUsed}</span>
    </div>
  )
}
