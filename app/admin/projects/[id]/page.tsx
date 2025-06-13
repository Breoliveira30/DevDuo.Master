"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { AuthGuard } from "@/components/admin/auth-guard"
import { ProjectForm } from "@/components/admin/project-form"
import { useProjects } from "@/lib/project-context"
import type { Project } from "@/lib/types"
import { ArrowLeft } from "lucide-react"

export default function EditProject() {
  const { id } = useParams()
  const router = useRouter()
  const { getProject } = useProjects()
  const [project, setProject] = useState<Project | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof id === "string") {
      const projectData = getProject(id)
      if (projectData) {
        setProject(projectData)
      } else {
        // Projeto não encontrado, redirecionar
        router.push("/admin/projects")
      }
    }
    setLoading(false)
  }, [id, getProject, router])

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">Carregando...</div>
        </div>
      </AuthGuard>
    )
  }

  if (!project) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">Projeto não encontrado</div>
        </div>
      </AuthGuard>
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
            <Link href="/admin/projects" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Editar Projeto</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <ProjectForm project={project} isEditing={true} />
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
