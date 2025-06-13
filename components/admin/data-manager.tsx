"use client"

import { useState } from "react"
import { useProjects } from "@/lib/project-context"
import { Button } from "@/components/ui/button"
import { Save, RefreshCw, AlertTriangle, Database, HardDrive } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function DataManager() {
  const { resetProjects, usingSupabase } = useProjects()
  const [isResetting, setIsResetting] = useState(false)

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all projects? This action cannot be undone.")) {
      setIsResetting(true)
      try {
        resetProjects()
        toast({
          title: "Data reset",
          description: "Projects have been restored to their initial state.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not reset data.",
          variant: "destructive",
        })
      } finally {
        setIsResetting(false)
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-800 flex items-center">
            <Save className="h-4 w-4 mr-2" /> Data Management
          </h3>
        </div>

        <div className="text-xs text-gray-500 mb-3 flex items-center">
          {usingSupabase ? (
            <>
              <Database className="h-3 w-3 mr-1 text-green-500" />
              <span>Using Supabase database</span>
            </>
          ) : (
            <>
              <HardDrive className="h-3 w-3 mr-1 text-amber-500" />
              <span>Using browser localStorage</span>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-orange-200 text-orange-600 hover:bg-orange-50"
            onClick={handleReset}
            disabled={isResetting}
          >
            {isResetting ? <RefreshCw className="h-4 w-4 animate-spin" /> : <AlertTriangle className="h-4 w-4" />}
            Reset data
          </Button>
        </div>

        <div className="mt-2 text-xs text-gray-400">
          <p>{usingSupabase ? "Data is stored in Supabase database." : "Data is stored only in this browser."}</p>
        </div>
      </div>
    </div>
  )
}
