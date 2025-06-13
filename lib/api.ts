import type { Project } from "./types"

const API_BASE = "/api"

export class ProjectAPI {
  static async getProjects(): Promise<Project[]> {
    try {
      const response = await fetch(`${API_BASE}/projects`)
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Erro ao buscar projetos")
      }

      return data.projects || []
    } catch (error) {
      console.error("Erro ao buscar projetos:", error)
      return []
    }
  }

  static async createProject(projectData: Omit<Project, "id">): Promise<Project> {
    try {
      const response = await fetch(`${API_BASE}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Erro ao criar projeto")
      }

      return data.project
    } catch (error) {
      console.error("Erro ao criar projeto:", error)
      throw error
    }
  }

  static async updateProject(id: string, projectData: Partial<Project>): Promise<Project> {
    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Erro ao atualizar projeto")
      }

      return data.project
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error)
      throw error
    }
  }

  static async deleteProject(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Erro ao deletar projeto")
      }
    } catch (error) {
      console.error("Erro ao deletar projeto:", error)
      throw error
    }
  }
}
