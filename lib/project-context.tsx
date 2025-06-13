"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Project } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"
import {
  fetchProjects,
  createProject as createProjectInDb,
  updateProject as updateProjectInDb,
  deleteProjectById,
  initializeProjectsIfEmpty,
  isSupabaseAvailable,
} from "@/lib/supabase"

// Dados iniciais para quando não houver dados salvos
const initialProjects: Project[] = [
  {
    id: "1",
    title: "Sistema de Agendamento Médico",
    description:
      "Plataforma completa para agendamento de consultas médicas com calendário interativo, notificações automáticas e gestão de pacientes",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["TypeScript", "React", "TailwindCSS", "Node.js"],
    color: "from-emerald-500 to-teal-500",
    demo: "#",
    category: "Sistema Web",
    features: ["TypeScript para tipagem segura", "CSS responsivo", "JavaScript para interatividade", "API RESTful"],
    progress: 100,
  },
  {
    id: "2",
    title: "WaterGuardian - Monitor de Consumo de Água IoT",
    description:
      "Sistema completo de monitoramento em tempo real do consumo de água com sensores IoT, dashboard interativo, alertas de vazamento e relatórios de economia desenvolvido com TypeScript, CSS e JavaScript",
    image: "/images/waterguardian-screenshot.png",
    tech: ["TypeScript", "CSS Modules", "JavaScript", "WebSockets", "Chart.js"],
    color: "from-blue-500 to-cyan-500",
    demo: "https://waterguardian.vercel.app/",
    category: "IoT & Monitoramento",
    features: ["Dashboard em tempo real", "Sensores IoT integrados", "Alertas inteligentes", "Relatórios de economia"],
    progress: 100,
  },
  {
    id: "3",
    title: "Landing Page Loja de Móveis",
    description:
      "Landing page moderna e elegante para loja de móveis com catálogo interativo, visualizador 3D e sistema de orçamentos",
    image: "/images/carvalho-moveis.png",
    tech: ["TypeScript", "TailwindCSS", "Next.js", "Framer Motion"],
    color: "from-amber-500 to-orange-500",
    demo: "https://lading-page-moveis.vercel.app/",
    category: "E-commerce",
    features: [
      "TypeScript para componentes",
      "CSS com animações",
      "JavaScript para interatividade",
      "Renderização otimizada",
    ],
    progress: 100,
  },
]

interface ProjectContextType {
  projects: Project[]
  loading: boolean
  error: string | null
  addProject: (project: Omit<Project, "id">) => Promise<Project>
  updateProject: (project: Project) => Promise<Project>
  deleteProject: (id: string) => Promise<boolean>
  getProject: (id: string) => Project | undefined
  resetProjects: () => Promise<void>
  usingSupabase: boolean
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingSupabase, setUsingSupabase] = useState(false)

  // Load projects on initialization
  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true)

        // Check if Supabase is available
        const supabaseAvailable = isSupabaseAvailable()
        setUsingSupabase(supabaseAvailable)

        if (supabaseAvailable) {
          console.log("Using Supabase for data storage")
        } else {
          console.log("Using localStorage for data storage")
        }

        // Initialize projects if needed
        await initializeProjectsIfEmpty(initialProjects)

        // Fetch all projects
        const loadedProjects = await fetchProjects()
        setProjects(loadedProjects)
        setError(null)
      } catch (err) {
        console.error("Error loading projects:", err)
        setError("Failed to load projects")

        // If we have no projects yet, use initial projects
        if (projects.length === 0) {
          setProjects(initialProjects)
        }
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  const addProject = async (projectData: Omit<Project, "id">): Promise<Project> => {
    setLoading(true)
    try {
      // Create project in database
      const newProject = await createProjectInDb(projectData)

      // Update state
      setProjects((prev) => [newProject, ...prev])

      toast({
        title: "Success!",
        description: "Project added successfully.",
      })

      return newProject
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error adding project"
      setError(errorMessage)

      toast({
        title: "Error",
        description: "Failed to add project. Using local storage as fallback.",
        variant: "destructive",
      })

      // Fallback to direct state update
      const newProject = {
        ...projectData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setProjects((prev) => [newProject, ...prev])
      return newProject
    } finally {
      setLoading(false)
    }
  }

  const updateProject = async (project: Project): Promise<Project> => {
    setLoading(true)
    try {
      // Update project in database
      const updatedProject = await updateProjectInDb(project)

      // Update state
      setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)))

      toast({
        title: "Success!",
        description: "Project updated successfully.",
      })

      return updatedProject
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error updating project"
      setError(errorMessage)

      toast({
        title: "Error",
        description: "Failed to update project. Using local storage as fallback.",
        variant: "destructive",
      })

      // Fallback to direct state update
      const updatedProject = {
        ...project,
        updatedAt: new Date().toISOString(),
      }

      setProjects((prev) => prev.map((p) => (p.id === project.id ? updatedProject : p)))
      return updatedProject
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: string): Promise<boolean> => {
    setLoading(true)
    try {
      // Delete project from database
      await deleteProjectById(id)

      // Update state
      setProjects((prev) => prev.filter((p) => p.id !== id))

      toast({
        title: "Success!",
        description: "Project deleted successfully.",
      })

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error deleting project"
      setError(errorMessage)

      toast({
        title: "Error",
        description: "Failed to delete project. Using local storage as fallback.",
        variant: "destructive",
      })

      // Fallback to direct state update
      setProjects((prev) => prev.filter((p) => p.id !== id))
      return true
    } finally {
      setLoading(false)
    }
  }

  const getProject = (id: string): Project | undefined => {
    return projects.find((p) => p.id === id)
  }

  const resetProjects = async (): Promise<void> => {
    setLoading(true)
    try {
      // If using Supabase, delete all projects and add initial ones
      if (isSupabaseAvailable()) {
        // Delete all existing projects
        for (const project of projects) {
          try {
            await deleteProjectById(project.id)
          } catch (error) {
            console.error(`Error deleting project ${project.id}:`, error)
          }
        }

        // Add initial projects
        for (const project of initialProjects) {
          try {
            await createProjectInDb({
              title: project.title,
              description: project.description,
              image: project.image,
              tech: project.tech,
              color: project.color,
              demo: project.demo,
              category: project.category,
              features: project.features,
              progress: project.progress,
            })
          } catch (error) {
            console.error(`Error creating initial project ${project.title}:`, error)
          }
        }

        // Reload projects
        const refreshedProjects = await fetchProjects()
        setProjects(refreshedProjects)
      } else {
        // If using localStorage, just reset to initial projects
        const projectsWithTimestamps = initialProjects.map((project) => ({
          ...project,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }))
        setProjects(projectsWithTimestamps)
      }

      toast({
        title: "Success!",
        description: "Projects reset successfully.",
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error resetting projects"
      setError(errorMessage)

      toast({
        title: "Error",
        description: "Failed to reset projects.",
        variant: "destructive",
      })

      // Fallback to direct state update
      setProjects(initialProjects)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        getProject,
        resetProjects,
        usingSupabase,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}
