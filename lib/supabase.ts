import { createClient } from "@supabase/supabase-js"
import type { Project } from "./types"

// Suas credenciais do Supabase
const supabaseUrl = "https://esqrvocnwotmhcofxhjs.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzcXJ2b2Nud290bWhjb2Z4aGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Mzc3NTEsImV4cCI6MjA2NTQxMzc1MX0.5VOaB-58GypgMjbdoVrmU-jitx3udH8rJceyGVUtPh0"

// Check if we have valid Supabase credentials
const hasValidSupabaseCredentials = !!(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith("http"))

// Create a Supabase client
export const supabase = hasValidSupabaseCredentials ? createClient(supabaseUrl, supabaseAnonKey) : null

// Helper function to check if Supabase is available
export const isSupabaseAvailable = () => !!supabase

// Fallback to localStorage when Supabase is not available
const STORAGE_KEY = "devduo-projects"

// Functions for localStorage operations
export function getLocalProjects(): Project[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    return []
  } catch (error) {
    console.error("Error accessing localStorage:", error)
    return []
  }
}

export function saveLocalProjects(projects: Project[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

// Database functions with fallback to localStorage
export async function fetchProjects(): Promise<Project[]> {
  // If Supabase is not available, use localStorage
  if (!isSupabaseAvailable()) {
    console.log("Supabase not available, using localStorage")
    return getLocalProjects()
  }

  try {
    // First, let's try to fetch without ordering to see what columns exist
    const { data, error } = await supabase!.from("projects").select("*")

    if (error) {
      console.error("Error fetching projects from Supabase:", error)
      // Fallback to localStorage
      return getLocalProjects()
    }

    // Sort by id in descending order as fallback (most recent first)
    const sortedData = (data || []).sort((a, b) => {
      // Try to sort by created_at first, then createdAt, then id
      if (a.created_at && b.created_at) {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      // Fallback to id sorting
      return Number.parseInt(b.id) - Number.parseInt(a.id)
    })

    return sortedData
  } catch (error) {
    console.error("Error fetching projects:", error)
    // Fallback to localStorage
    return getLocalProjects()
  }
}

export async function createProject(project: Omit<Project, "id">): Promise<Project> {
  // If Supabase is not available, use localStorage
  if (!isSupabaseAvailable()) {
    const localProjects = getLocalProjects()
    const newProject = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedProjects = [newProject, ...localProjects]
    saveLocalProjects(updatedProjects)
    return newProject
  }

  try {
    // Prepare project data without timestamp fields initially
    const projectData = {
      title: project.title,
      description: project.description,
      image: project.image,
      tech: project.tech,
      color: project.color,
      demo: project.demo,
      category: project.category,
      features: project.features,
      progress: project.progress,
    }

    const { data, error } = await supabase!.from("projects").insert([projectData]).select().single()

    if (error) {
      console.error("Error creating project in Supabase:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error creating project:", error)
    throw error
  }
}

export async function updateProject(project: Project): Promise<Project> {
  // If Supabase is not available, use localStorage
  if (!isSupabaseAvailable()) {
    const localProjects = getLocalProjects()
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString(),
    }

    const updatedProjects = localProjects.map((p) => (p.id === project.id ? updatedProject : p))
    saveLocalProjects(updatedProjects)
    return updatedProject
  }

  try {
    // Prepare update data without timestamp fields
    const updateData = {
      title: project.title,
      description: project.description,
      image: project.image,
      tech: project.tech,
      color: project.color,
      demo: project.demo,
      category: project.category,
      features: project.features,
      progress: project.progress,
    }

    const { data, error } = await supabase!.from("projects").update(updateData).eq("id", project.id).select().single()

    if (error) {
      console.error("Error updating project in Supabase:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error updating project:", error)
    throw error
  }
}

export async function deleteProjectById(id: string): Promise<void> {
  // If Supabase is not available, use localStorage
  if (!isSupabaseAvailable()) {
    const localProjects = getLocalProjects()
    const updatedProjects = localProjects.filter((p) => p.id !== id)
    saveLocalProjects(updatedProjects)
    return
  }

  try {
    const { error } = await supabase!.from("projects").delete().eq("id", id)

    if (error) {
      console.error("Error deleting project from Supabase:", error)
      throw error
    }
  } catch (error) {
    console.error("Error deleting project:", error)
    throw error
  }
}

// Function to initialize the database with projects if empty
export async function initializeProjectsIfEmpty(initialProjects: Project[]): Promise<void> {
  // If Supabase is not available, use localStorage
  if (!isSupabaseAvailable()) {
    const localProjects = getLocalProjects()
    if (localProjects.length === 0) {
      const projectsWithTimestamps = initialProjects.map((project) => ({
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }))
      saveLocalProjects(projectsWithTimestamps)
    }
    return
  }

  try {
    // Check if projects already exist
    const { count, error } = await supabase!.from("projects").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error checking projects in Supabase:", error)
      return
    }

    // If no projects exist, add initial ones
    if (count === 0) {
      const projectsToInsert = initialProjects.map((project) => ({
        title: project.title,
        description: project.description,
        image: project.image,
        tech: project.tech,
        color: project.color,
        demo: project.demo,
        category: project.category,
        features: project.features,
        progress: project.progress,
      }))

      const { error: insertError } = await supabase!.from("projects").insert(projectsToInsert)

      if (insertError) {
        console.error("Error initializing projects in Supabase:", insertError)
      } else {
        console.log("Initial projects added to Supabase successfully")
      }
    }
  } catch (error) {
    console.error("Error initializing projects:", error)
  }
}
